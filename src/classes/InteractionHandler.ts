import { readdirSync } from "fs";
import { join } from "path";
import Bot from "./Bot"
import { CacheType, Interaction, Collection } from "discord.js";
import SlashCommand from "./structures/SlashCommand";

export default class InteractionHandler {
    private readonly bot: Bot;
    
    private readonly InteractionsPath = join(__dirname, "..", "interactions");
    private readonly CommandsPath = join(this.InteractionsPath, "commands");
    private readonly SlashCommandsPath = join(this.CommandsPath, "slash");
    private readonly MessageCommandsPath = join(this.CommandsPath, "message");
    // private readonly WhateverPath = join(this.InteractionsPath, "commands");

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
    }

    public async LoadInteractions() {
        await this.LoadSlashCommands();
        this.bot.Logger.info(`Found ${this.SlashCommands.size} (/) commands`, "InteractionHandler")
    }
    public async HandleInteraction(interaction: Interaction<CacheType>) {}

}
