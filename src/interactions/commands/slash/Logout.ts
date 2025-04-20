import { ActionRowBuilder, ChatInputCommandInteraction, MessageActionRowComponentBuilder, MessageFlags, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import SlashCommand from "../../../classes/structures/SlashCommand";

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