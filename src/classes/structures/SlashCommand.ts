import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default abstract class SlashCommand {
    public readonly data: SlashCommandBuilder;
    // -> category?
    public readonly cooldown?: number;
    public abstract execute(interaction: ChatInputCommandInteraction): Promise<unknown>;

    constructor(data: SlashCommandBuilder) {
        this.data = data;
    }
}