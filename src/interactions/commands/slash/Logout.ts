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
import { ActionRowBuilder, ChatInputCommandInteraction, MessageActionRowComponentBuilder, MessageFlags, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { SlashCommand } from "../../../classes/structures/SlashCommand";

export default class LogoutCommand extends SlashCommand {
    constructor() {
        const data = new SlashCommandBuilder().setName("logout").setDescription("Disconnect connected platform account(s)");
        super(data);
    }

    public async execute(interaction: ChatInputCommandInteraction): Promise<unknown> {
        const discogs = new StringSelectMenuOptionBuilder().setLabel("Discogs").setValue("discogs").setDescription("Login with Discogs").setEmoji(this.bot.DiscogsEmoji);
        const lastfm = new StringSelectMenuOptionBuilder().setLabel("Last.fm").setValue("lastfm").setDescription("Login with Last.fm").setEmoji(this.bot.LastfmEmoji);

        const selectionMenu = new StringSelectMenuBuilder().setCustomId("logout-option").setPlaceholder("Pick a platform to logout from").addOptions(discogs, lastfm).setMinValues(1).setMaxValues(1);
        const selectionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(selectionMenu);
        const response = await interaction.reply({ components: [selectionRow], flags: MessageFlags.Ephemeral });
        const collectionFilter = (i: { user: { id: string; }; }) => i.user.id == interaction.user.id;
        let selection;
        try {
            selection = await response.awaitMessageComponent({ filter: collectionFilter, time: 60_000 });
        } catch {
            return await interaction.editReply({ content: "Action timed out!", components: [] });
        }

        if (!selection || !selection.isStringSelectMenu()) return;
        const option = selection.values[0];
        if (option == "lastfm") {
            await this.bot.DatabaseManager.DeleteAuthData(interaction.user.id);
            return await interaction.editReply({ content: "You've logged out successfully", components: [] });
        } // other options
    }
}