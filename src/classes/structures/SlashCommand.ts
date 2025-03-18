import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Bot from "../../index";

export default abstract class SlashCommand {
    protected readonly bot = Bot;

    public readonly data: ReturnType<SlashCommandBuilder["toJSON"]>;
    // -> category?
    public readonly cooldown?: number;
    public abstract execute(interaction: ChatInputCommandInteraction): Promise<unknown>;

    constructor(data: SlashCommandBuilder) {
        this.data = data.toJSON();
    }
}