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
import SlashCommand from "../../../classes/structures/SlashCommand";

export default class FeaturedCommand extends SlashCommand {
    constructor() {
        const data = new SlashCommandBuilder().setName("featured")
            .setDescription("Gives some information about the currently featured track");
        super(data);
    }

    public async execute(interaction: ChatInputCommandInteraction): Promise<unknown> {
        const track = this.bot.FeaturedTrack;
        if (track) {
            return await this.Reply(interaction, {
                description: `## Currently featured\n[${track.name}](${track.url}) by [${track.artist.name}](${track.artist.url}) from album **${track.album["#text"]}**`,
                thumbnail: track.image[3]["#text"],
             });
        } else {
            return await this.Reply(interaction, { description: "There seems to be no featured track." });
        }
    }
}