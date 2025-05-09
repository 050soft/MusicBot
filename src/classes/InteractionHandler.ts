import { readdirSync } from "fs";
import { join } from "path";
import Bot from "./Bot"
import { CacheType, Interaction, Collection, ChatInputCommandInteraction, REST, Routes, AutocompleteInteraction } from "discord.js";
import SlashCommand from "./structures/SlashCommand";

export default class InteractionHandler {
    private readonly bot: Bot;
    private rest = new REST({ version: "10"}).setToken(process.env.TOKEN as string);
    
    private readonly InteractionsPath = join(__dirname, "..", "interactions");
    private readonly CommandsPath = join(this.InteractionsPath, "commands");
    private readonly SlashCommandsPath = join(this.CommandsPath, "slash");
    private readonly MessageCommandsPath = join(this.CommandsPath, "message");

    public SlashCommands = new Collection<string, SlashCommand>

    constructor(bot: Bot) {
        this.bot = bot;
    }

    private async ReadDirectory(directory: string, onlyJS: boolean = true): Promise<string[]> {
        let files: string[] = [];

        try {
            if (onlyJS) {
                files = readdirSync(directory).filter(file => file.endsWith(".js"));
            } else {
                files = readdirSync(directory);
            }
        } catch {}

        return files;
    }

    private async LoadSlashCommands() {
        const commandFiles = await this.ReadDirectory(this.SlashCommandsPath);

        for (const file of commandFiles) {
            const cmd = (await import(`${this.SlashCommandsPath}/${file}`)).default;
            if (!(cmd.prototype instanceof SlashCommand)) continue;

            const command = new cmd() as SlashCommand;
            this.SlashCommands.set(command.data.name, command);
            this.bot.Logger.verbose(`(/) command found ${file}`, "InteractionHandler");
        }
        
        const commands = this.SlashCommands.mapValues(v => v.data);

        try {
            if (this.bot.DeveloperMode) {
                await this.rest.put(Routes.applicationGuildCommands(this.bot.ApplicationID, this.bot.ServerID), { body: commands });
            } else {
                await this.rest.put(Routes.applicationCommands(this.bot.ApplicationID), { body: commands });
            }

            this.bot.Logger.info(`Successfully reloaded ${this.SlashCommands.size} application (/) commands`);
        } catch (err) {
            if (!(err instanceof Error)) return; 
            
            this.bot.Logger.error(err.message, "InteractionHandler");
            this.bot.Logger.debug(err.stack ?? "")
        }
    }

    private async HandleChatInputCommand(interaction: ChatInputCommandInteraction) {
        const command = this.SlashCommands.get(interaction.commandName);
        if (!command) return;

        // Implement cooldowns

        await command.execute(interaction);
    }

    private async HandleAutocomplete(interaction: AutocompleteInteraction) {
        const command = this.SlashCommands.get(interaction.commandName);
        if (!command) return;
        if (!command.autocomplete) return;
        
        await command.autocomplete(interaction);
    }

    public async LoadInteractions() {
        await this.LoadSlashCommands();
        this.bot.Logger.info(`Found ${this.SlashCommands.size} (/) commands`, "InteractionHandler");
    }

    public async HandleInteraction(interaction: Interaction<CacheType>) {
        if (interaction.isChatInputCommand()) {
            await this.HandleChatInputCommand(interaction);
        } else if (interaction.isAutocomplete()) {
            await this.HandleAutocomplete(interaction)
        }
    }

}
