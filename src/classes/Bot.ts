import { ActionRowBuilder, APIEmbedField, Client, ClientOptions, ColorResolvable, EmbedBuilder, Interaction, MessageActionRowComponentBuilder, MessageFlags } from "discord.js";
import Logger from "./Logger";
import LogLevel from "../enums/LogLevel";
import config from "../config.json";

import { version } from "../../package.json";
import EventHandler from "./EventHandler";
import InteractionHandler from "./InteractionHandler";
import DatabaseManager from "./DatabaseManager";
import { Track } from "../lastfm/responses/user/GetRecentTracks";
import Lastfm from "../lastfm/Lastfm";

class Bot extends Client {
    public readonly InformativeLogging: boolean;
    public readonly DeveloperMode: boolean;
    public readonly ApplicationID: string;
    public readonly ServerID: string;

    public readonly SuccessEmbedColor: ColorResolvable;
    public readonly ErrorEmbedColor: ColorResolvable;
    public readonly NormalEmbedColor: ColorResolvable;
    public readonly DiscogsEmoji: string;
    public readonly LastfmEmoji: string;

    public EventHandler: EventHandler;
    public InteractionHandler: InteractionHandler;
    public LastfmManager: Lastfm;
    public DatabaseManager: DatabaseManager;
    
    public Logger: Logger;

    public FeaturedTrack: Track | undefined;

    constructor(clientOptions: ClientOptions) {
        super(clientOptions);

        this.InformativeLogging = config.APPLICATION.INFORMATIVE_LOGGING;
        this.DeveloperMode = config.DEVELOPMENT.DEVMODE;
        if (this.DeveloperMode) {
            this.ApplicationID = config.DEVELOPMENT.APP_ID;
        } else {
            this.ApplicationID = config.APPLICATION.ID
        }
        this.ServerID = config.DEVELOPMENT.SERVER;

        this.SuccessEmbedColor = config.EMBEDS.SUCCESS as ColorResolvable;
        this.ErrorEmbedColor = config.EMBEDS.ERROR as ColorResolvable;
        this.NormalEmbedColor = config.EMBEDS.NORMAL as ColorResolvable;
        this.DiscogsEmoji = config.EMBEDS.DISCOGS_EMOJI;
        this.LastfmEmoji = config.EMBEDS.LASTFM_EMOJI

        this.EventHandler = new EventHandler(this);
        this.InteractionHandler = new InteractionHandler(this);
        this.LastfmManager = new Lastfm();
        this.DatabaseManager = new DatabaseManager(this);
        this.Logger = new Logger(LogLevel.VERBOSE);

        this.Logger.info(`Development mode is set to ${this.DeveloperMode}`);

        this.EventHandler.HandleAndLoadEvents();
        this.InteractionHandler.LoadInteractions();
        this.DatabaseManager.Connect();
    }

    public get BotVersion(): string {
        if (this.DeveloperMode) {
            return `${version}-dev`;
        }
        return `${version}`;
    }

    public async GetGuildCount(): Promise<number> {
        // !! when starting to use shards use the shard-wide counting method
        return this.guilds.cache.size;
    }

    public async ReplyEmbed(interaction: Interaction, data: { content?: string, title?: string, url?: string, description: string, fields?: APIEmbedField[], components?: ActionRowBuilder<MessageActionRowComponentBuilder>[], thumbnail?: string, author?: { name: string, iconURL?: string, url?: string }, ephemeral?: boolean }) {
        if (!interaction.isRepliable()) {
            return;
            //throw new BotError(ErrorCodes.cannotReplyToInteraction, interaction.type);
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

        const flags: MessageFlags.Ephemeral[] = [];
        if (ephemeral) {
            flags.push(MessageFlags.Ephemeral);
        }

        return await interaction.reply({ content: content, embeds: [embed], components: components, flags: flags });
    }
}

export default Bot;