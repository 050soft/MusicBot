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
import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption, SlashCommandSubcommandBuilder } from "discord.js"
import { SlashCommand } from "../../../classes/structures/SlashCommand"

export default class ArtistCommand extends SlashCommand {
    constructor() {
        const artistOption = new SlashCommandStringOption()
            .setName("artist")
            .setDescription("The name of the artist, defaults to currently playing artist")
            .setRequired(false)
            .setAutocomplete(false) // should be set to true later

        const infoCommand = new SlashCommandSubcommandBuilder()
            .setName("info")
            .setDescription("Get information about an artist")
            .addStringOption(artistOption);

        const playsCommand = new SlashCommandSubcommandBuilder()
            .setName("plays")
            .setDescription("Shows the amount of plays you have for an artist")
            .addStringOption(artistOption);

        const data = new SlashCommandBuilder()
            .setName("artist")
            .setDescription("Various artist commands")
            .addSubcommand(infoCommand)
            .addSubcommand(playsCommand);

        super(data);
    }

    public async InfoCommand(interaction: ChatInputCommandInteraction) {
        return this.Reply(interaction, { description: "Not implemented" });
    }
    public async PlaysCommand(interaction: ChatInputCommandInteraction) {
        return this.Reply(interaction, { description: "Not implemented" });
    }

    public async execute(interaction: ChatInputCommandInteraction): Promise<unknown> {
        const subcommand = interaction.options.getSubcommand(true);
        if (subcommand == "info") {
            return this.InfoCommand(interaction);
        } else if (subcommand == "plays") {
            return this.PlaysCommand(interaction);
        }
    }
}