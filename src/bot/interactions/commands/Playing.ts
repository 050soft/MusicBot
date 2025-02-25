import { SlashCommandBuilder } from "discord.js";
import ISlashCommand from "../../../interfaces/ISlashCommand";

export default <ISlashCommand> {
    data: new SlashCommandBuilder().setName("playing").setDescription("Shows what you are currently playing on Last.fm, if logged in"),
    async execute(interaction) {
        await interaction.deferReply();
        const authData = await interaction.Bot.LastFMAuthManager.GetAuthData(interaction.user.id);
        if (!authData) return await interaction.editReply({ content: "Please login with Last.fm to use this command" });

        const nowPlaying = await interaction.Bot.LastFMAuthManager.GetNowPlaying(authData.sk, authData.user); 
        if (!nowPlaying) return await interaction.editReply({ content: "I was unable to find what you are listening to" });
        return await interaction.editReply({ content: `You are currently listening to **${nowPlaying.track[0].name}** by **${nowPlaying.track[0].artist.name}**!\n-# This information was retrieved from your connected Last.fm account (${authData.user})`});    
    },
}