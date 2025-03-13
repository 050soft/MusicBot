import {
    ActionRowBuilder,
    APIEmbedField,
    Client,
    ClientOptions,
    Collection,
    ColorResolvable,
    EmbedBuilder,
    Interaction,
    MessageActionRowComponentBuilder,
    MessageFlags,
    REST,
    Routes
} from "discord.js";
import ISlashCommand from "../interfaces/ISlashCommand";
import { readdirSync } from "fs"
import { join } from "path";
import IEvent from "../interfaces/IEvent";
import config from "../config.json";
import LastfmAuthManager from "../lastfm/AuthManager";
import DatabaseManager from "../database/DatabaseManager";
import { Track } from "../lastfm/responses/user/GetRecentTracks";
import BotError from "./errors/BotError";
import ErrorCodes from "./errors/ErrorCodes";

// Version
import { version } from "../../package.json";
const currentYear = new Date().getFullYear();

class Bot extends Client {
    public SlashCommands: Collection<string, ISlashCommand>;
    public CommandCooldowns: Collection<string, Collection<string, number>>;

    public readonly InformativeLogging: boolean;
    public readonly DeveloperMode: boolean;
    public readonly ApplicationID: string;
    public readonly ServerID: string;

    public readonly SuccessEmbedColor: ColorResolvable;
    public readonly ErrorEmbedColor: ColorResolvable;
    public readonly NormalEmbedColor: ColorResolvable;
    public readonly DiscogsEmoji: string;
    public readonly LastfmEmoji: string;

    public LastFMAuthManager: LastfmAuthManager;
    public DatabaseManager: DatabaseManager;

    public FeaturedTrack: Track | undefined;

    constructor(clientOptions: ClientOptions) {
        super(clientOptions);

        this.InformativeLogging = config.APPLICATION.INFORMATIVE_LOGGING;
        this.DeveloperMode = config.DEVELOPMENT.DEVMODE;
        this.ApplicationID = config.APPLICATION.ID;
        this.ServerID = config.DEVELOPMENT.SERVER;

        this.SuccessEmbedColor = config.EMBEDS.SUCCESS as ColorResolvable;
        this.ErrorEmbedColor = config.EMBEDS.ERROR as ColorResolvable;
        this.NormalEmbedColor = config.EMBEDS.NORMAL as ColorResolvable;
        this.DiscogsEmoji = config.EMBEDS.DISCOGS_EMOJI;
        this.LastfmEmoji = config.EMBEDS.LASTFM_EMOJI

        this.LastFMAuthManager = new LastfmAuthManager();
        this.DatabaseManager = new DatabaseManager();

        this.Log(`Development mode is set to ${this.DeveloperMode}`);

        this.SlashCommands = new Collection();
        this.CommandCooldowns = new Collection();

        this.Start();
    }

    public Log(message: string, type?: string, ) {
        if (!this.InformativeLogging && (!type || type == "information") ) return;
        
        const dateString = new Date().toLocaleString();
        console.log(`${dateString} | ${type?.toUpperCase() || "INFORMATION"} - ${message}`);
    }

    // Maybe convert the data argument to an interface instead of this
    public async ReplyEmbed(interaction: Interaction, data: { content?: string, title?: string, url?: string, description: string, fields?: APIEmbedField[], components?: ActionRowBuilder<MessageActionRowComponentBuilder>[], thumbnail?: string, author?: { name: string, iconURL?: string, url?: string }, ephemeral?: boolean }) {
        if (!interaction.isRepliable()) {
            throw new BotError(ErrorCodes.cannotReplyToInteraction, interaction.type);
        }

        const { content, title, url, description, fields, components, thumbnail, author, ephemeral } = data;
        // if (!message) {}

        const embed = new EmbedBuilder();
        embed.setColor(this.NormalEmbedColor as ColorResolvable);
        embed.setFooter({ text: `version: ${this.BotVersion}` });
        embed.setTimestamp(new Date());

        if (title) {
            embed.setTitle(title);

            // Nesting this here since url cannot be set without a title
            if (url) {
                embed.setURL(url);
            }
        }       
        embed.setDescription(description);
        if (fields) {
            embed.addFields(fields);
        }
        if (thumbnail) {
            embed.setThumbnail(thumbnail);
        }
        if (author) {
            embed.setAuthor(author);
        }

        if (interaction.deferred || interaction.replied) {
            return await interaction.editReply({ content: content, embeds: [embed], components: components });
        }

        return await interaction.reply({ content: content, embeds: [embed], components: components, ephemeral: ephemeral });
    }

    public async ErrorEmbed(interaction: Interaction, errormessage: string, ephemeral?: boolean) {
        if (!interaction.isRepliable()) return false;

        const embed = new EmbedBuilder();
        embed.setTitle("Oops - An error occurred!");
        embed.setDescription(errormessage);
        embed.setColor(this.ErrorEmbedColor);
        embed.setFooter({ text: `version: ${this.BotVersion}` });
        embed.setTimestamp();

        if (interaction.deferred || interaction.replied) {
            return await interaction.editReply({ content: "", embeds: [embed], components: [] });
        }

        if (ephemeral) {
            return await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        }

        return await interaction.reply({ embeds: [embed] });
    }

    public get BotVersion(): string {
        return `${currentYear}.${version}`; 
    }

    public async GetGuildCount (): Promise<number> {
        return this.guilds.cache.size;
    }

    private async Start() {
        await this.DatabaseManager.Start();
        await this.HandleAndRegisterEvents();
        await this.RegisterSlashCommands();

        await this.login(process.env.TOKEN);
    }

    private async HandleAndRegisterEvents() {
        const eventsPath = join(__dirname, 'events');
        const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        for (let file of eventFiles) {
            const event = await import(`${eventsPath}/${file}`);
            const eventData: IEvent = event.default;

            this.Log(`Event Found: ${file}`);

            if (eventData.once) {
                this.once(eventData.name, (...args) => eventData.execute(this, ...args));
            } else {
                this.on(eventData.name, (...args) => eventData.execute(this, ...args));
            }
        }

        this.Log(`Loaded ${eventFiles.length} Events`);
    }
    
    private async RegisterSlashCommands() {
        const rest = new REST({ version: "10" }).setToken(process.env.TOKEN as string);

        const commands = [];
        const commandsPath = join(__dirname, 'interactions/commands');
        const commandFiles = readdirSync(commandsPath);

        this.Log("Started refreshing application (/) commands.");

        for (const file of commandFiles) {
            const command = await import(`${commandsPath}/${file}`);
  
            const commandData: ISlashCommand = command.default;

            if ('data' in command.default && 'execute' in command.default) {
                commands.push(commandData.data.toJSON());
                this.SlashCommands.set(commandData.data.name, command.default);

                this.Log(`Command Found: ${file}`);
            } else {
                this.Log(`Command: ${file} is missing (multiple) required properties!`);
            }
        }

        try {
            if (this.DeveloperMode) {
                await rest.put(Routes.applicationGuildCommands(this.ApplicationID, this.ServerID), { body: commands });
            } else {
                await rest.put(Routes.applicationCommands(this.ApplicationID), { body: commands });
            }

            this.Log(`Successfully reloaded ${commands.length} application (/) commands.`);
        } catch (error: any) {
            this.Log(`Error Occurred: \n ${error.stack}`, "error");
        }
    }
}

export default Bot;