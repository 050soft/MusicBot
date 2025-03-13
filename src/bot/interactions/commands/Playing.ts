import { SlashCommandBuilder } from "discord.js";
import ISlashCommand from "../../../interfaces/ISlashCommand";
import { Track } from "../../../lastfm/responses/user/GetRecentTracks";

export default <ISlashCommand> {
    data: new SlashCommandBuilder().setName("playing").setDescription("Shows what you are currently playing on Last.fm, if logged in"),
    async execute(interaction) {
        await interaction.deferReply();
        const authData = await interaction.Bot.LastFMAuthManager.GetAuthData(interaction.user.id);
        if (!authData) return await interaction.Bot.ReplyEmbed(interaction, { description: "Please login with Last.fm to use this command" });

        const nowPlaying = await interaction.Bot.LastFMAuthManager.GetNowPlaying(authData.sk, authData.user); 
        if (!nowPlaying) return await interaction.Bot.ReplyEmbed(interaction, { description: "I was unable to find what you are listening to" });

        const track: Track = nowPlaying.track[0];
        return await interaction.Bot.ReplyEmbed(interaction, {
            title: "Now Playing",
            description: `**${track.name}** - **${track.artist.name}** on **${track.album["#text"]}**\n\n-# ${nowPlaying["@attr"].user} has ${nowPlaying["@attr"].total} plays in total`,
            thumbnail: track.image[3]["#text"],
        });

        //return await interaction.editReply({ content: `You are currently listening to **${nowPlaying.track[0].name}** by **${nowPlaying.track[0].artist.name}**!\n-# This information was retrieved from your connected Last.fm account (${authData.user})`});
    },
}