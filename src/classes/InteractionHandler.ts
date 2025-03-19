import { readdirSync } from "fs";
import { join } from "path";
import Bot from "./Bot"
import { CacheType, Interaction } from "discord.js";

export default class InteractionHandler {
    private readonly bot: Bot;
    
    private readonly InteractionsPath = join(__dirname, "..", "interactions");
    private readonly CommandsPath = join(this.InteractionsPath, "commands");
    // private readonly WhateverPath = join(this.InteractionsPath, "commands");

    constructor(bot: Bot) {
        this.bot = bot;
    }

    public async ReadDirectory(directory: string, onlyJS: boolean = true): Promise<string[]> {
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

    public async LoadInteractions() {}
    public async HandleInteraction(interaction: Interaction<CacheType>) {}

}
