import { SlashCommandBuilder } from "discord.js";
import ISlashCommand from "../../../interfaces/ISlashCommand";

export default <ISlashCommand> {
    data: new SlashCommandBuilder().setName("featured").setDescription("Gives some information about the currently featured track"),
    async execute(interaction) {
        const track = interaction.Bot.FeaturedTrack;
        if (track) {
            return await interaction.Bot.ReplyEmbed(interaction, { 
                title: "Featured", 
                description: `Currently featured is: [${track.name}](${track.url}) by [${track.artist.name}](${track.artist.url})`,
                thumbnail: track.image[4]["#text"],
             });

            //return await interaction.reply({ content: `Currently featured is: [${track.name}](${track.url}) by [${track.artist.name}](${track.artist.url})` });
        } else {
            return await interaction.reply({ content: "There is currently no featured track" });
        }
    },
}