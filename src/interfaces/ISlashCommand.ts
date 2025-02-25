import { AutoCompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Category from "../enums/Category";

export default interface ISlashCommand {
    data: SlashCommandBuilder;
    cooldown?: number;
    category?: Category;

    execute(interaction: ChatInputCommandInteraction): Promise<unknown>;
    autocomplete?(interaction: AutoCompleteInteraction): Promise<unknown>;
}