import { ActionRowBuilder, MessageActionRowComponentBuilder, MessageFlags, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder } from "discord.js";
import ISlashCommand from "../../../interfaces/ISlashCommand";

export default <ISlashCommand> {
    data: new SlashCommandBuilder().setName("login").setDescription("Login with one of the supported platforms"),
    async execute(interaction) {
        const discogs = new StringSelectMenuOptionBuilder().setLabel("Discogs").setValue("discogs").setDescription("Login with Discogs").setEmoji(interaction.Bot.DiscogsEmoji);
        const lastfm = new StringSelectMenuOptionBuilder().setLabel("Last.fm").setValue("lastfm").setDescription("Login with Last.fm").setEmoji(interaction.Bot.LastfmEmoji);

        const selectionMenu = new StringSelectMenuBuilder().setCustomId("login-option").setPlaceholder("Pick a platform to login with").addOptions(discogs, lastfm).setMinValues(1).setMaxValues(1);
        const selectionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(selectionMenu);
        const response = await interaction.reply({ components: [selectionRow], flags: MessageFlags.Ephemeral });
        const collectionFilter = (i: { user: { id: string; }; }) => i.user.id == interaction.user.id;

        try {
            const selection = await response.awaitMessageComponent({ filter: collectionFilter, time: 60_000 });
            if (selection && selection.isStringSelectMenu()) {
                if (selection.values[0] == "discogs") {
                    return await interaction.editReply({ content: "Logging in with Discogs is not supported yet!", components: [] });
                } else if (selection.values[0] == "lastfm") {
                    // lastfm
                    const token = await interaction.Bot.LastFMAuthManager.GetToken();
                    if (!token) return;
                    const url = await interaction.Bot.LastFMAuthManager.GetUrl(interaction.user, token);
                    return await interaction.editReply({ content: `Click [here](${url}) to login with Last.fm!`, components: [] });
                } else {
                    return
                }
            }
        } catch {
            return await interaction.editReply({ content: "Action timed out!", components: [] });
        }
    },
}