import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import Bot from "../../index";

export default abstract class SlashCommand {
    protected readonly bot = Bot;

    public readonly data: ReturnType<SlashCommandBuilder["toJSON"]>;
    // -> category?
    public readonly cooldown?: number;
    public abstract execute(interaction: ChatInputCommandInteraction): Promise<unknown>;
    public autocomplete?(interaction: AutocompleteInteraction): Promise<unknown>;

    constructor(data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | SlashCommandOptionsOnlyBuilder) {
        this.data = data.toJSON();
    }
}