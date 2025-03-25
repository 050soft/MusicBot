import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import SlashCommand from "../../../classes/structures/SlashCommand";
import { Track } from "../../../lastfm/responses/user/GetRecentTracks";

export default class PlayingCommand extends SlashCommand {
    constructor() {
        const data = new SlashCommandBuilder().setName("playing").setDescription("Shows what you are currently playing on Last.fm, if logged in");
        super(data);
    }

    public async execute(interaction: ChatInputCommandInteraction): Promise<unknown> {
        await interaction.deferReply();
        const authData = await this.bot.DatabaseManager.GetAuthData(interaction.user.id);
        if (!authData) return await this.bot.ReplyEmbed(interaction, { description: "Please login with Last.fm to use this command" });

        const nowPlaying = await this.bot.LastfmManager.User.GetNowPlaying(authData); 
        if (nowPlaying.IsError()) return await this.bot.ReplyEmbed(interaction, { description: "I was unable to find what you are listening to" });
        const np = nowPlaying.data.recenttracks;

        const track: Track = np.track[0];
        return await this.bot.ReplyEmbed(interaction, {
            title: "Now Playing",
            description: `**${track.name}** - **${track.artist.name}** on **${track.album["#text"]}**\n\n-# ${np["@attr"].user} has ${np["@attr"].total} plays in total`,
            thumbnail: track.image[3]["#text"],
        });
    }
}