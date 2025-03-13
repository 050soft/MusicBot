import { SlashCommandBuilder } from "discord.js";
import ISlashCommand from "../../../interfaces/ISlashCommand";

export default <ISlashCommand> {
    data: new SlashCommandBuilder().setName("featured").setDescription("Gives some information about the currently featured track"),
    async execute(interaction) {
        const track = interaction.Bot.FeaturedTrack;
        if (track) {
            return await interaction.Bot.ReplyEmbed(interaction, {
                description: `## Currently featured\n[${track.name}](${track.url}) by [${track.artist.name}](${track.artist.url}) from album **${track.album["#text"]}**`,
                thumbnail: track.image[3]["#text"],
             });
        } else {
            return await interaction.Bot.ReplyEmbed(interaction, { description: "There seems to be no featured track." });
        }
    },
}