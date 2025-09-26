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
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../../classes/structures/SlashCommand";
import { Track } from "../../../lastfm/responses/user/GetRecentTracks";

export default class PlayingCommand extends SlashCommand {
    constructor() {
        const data = new SlashCommandBuilder().setName("playing").setDescription("Shows what you are currently playing on Last.fm, if logged in");
        super(data);
    }

    public async execute(interaction: ChatInputCommandInteraction): Promise<unknown> {
        await interaction.deferReply();
        const authData = await this.bot.DatabaseManager.GetAuthData(interaction.user.id);
        if (!authData) return await this.Reply(interaction, { description: "Please login with Last.fm to use this command" });

        const nowPlaying = await this.bot.LastfmManager.User.GetNowPlaying(authData); 
        if (nowPlaying.IsError()) return await this.Reply(interaction, { description: "I was unable to find what you are listening to" });
        const np = nowPlaying.data.recenttracks;
        const track: Track = np.track[0];
        if (!track) {
            return await this.Reply(interaction, { description: "I was unable to find what you are listening to" });
        }

        if (track["@attr"]?.nowplaying) {
            return await this.Reply(interaction, {
                title: "Now Playing",
                description: `**${track.name}** - **${track.artist.name}** on **${track.album["#text"]}**\n\n-# ${np["@attr"].user} has ${np["@attr"].total} plays in total`,
                thumbnail: track.image[3]["#text"],
            }); 
        }

        return await this.Reply(interaction, {
            title: "Most Recently played",
            description: `**${track.name}** - **${track.artist.name}** on **${track.album["#text"]}**\n\n-# ${np["@attr"].user} has ${np["@attr"].total} plays in total`,
            thumbnail: track.image[3]["#text"],
            unixTime: track.date?.["#text"]
        });
    }
}