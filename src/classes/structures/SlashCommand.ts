import { ActionRowBuilder, APIEmbedField, AutocompleteInteraction, ChatInputCommandInteraction, Interaction, MessageActionRowComponentBuilder, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
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

    public async Reply(interaction: Interaction, data: { content?: string, title?: string, url?: string, description: string, fields?: APIEmbedField[], components?: ActionRowBuilder<MessageActionRowComponentBuilder>[], thumbnail?: string, author?: { name: string, iconURL?: string, url?: string }, unixTime?: string, ephemeral?: boolean }) {
        return this.bot.ReplyEmbed(interaction, data);
    }
}