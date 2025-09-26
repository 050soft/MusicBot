/*
MusicBot - A Discord music bot by 050soft
Copyright (C) 2025  050soft

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
import { ActionRowBuilder, APIEmbedField, AutocompleteInteraction, ChatInputCommandInteraction, Interaction, MessageActionRowComponentBuilder, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { Bot } from "../../index";

export abstract class SlashCommand {
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