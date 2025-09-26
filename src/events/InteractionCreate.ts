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
import { CacheType, Events, Interaction } from "discord.js";
import { Event } from "../classes/structures/Event";
import { BotError } from "../classes/BotError";
import { MongooseError } from "mongoose";

export default class InteractionCreate extends Event<Events.InteractionCreate> {
     constructor() {
         super(Events.InteractionCreate) 
    }

    async execute(interaction: Interaction<CacheType>) {
        try {
            await this.bot.InteractionHandler.HandleInteraction(interaction);
        } catch (err) {
            if (err instanceof BotError || err instanceof Error || err instanceof MongooseError) {
                this.bot.Logger.error(err.message);
                this.bot.Logger.debug(err.stack ?? "");

                if (!interaction.isRepliable()) return;

                if (interaction.replied || interaction.deferred) {
                    return await interaction.editReply({ content: `${err.message}\n-# Version: ${this.bot.BotVersion}`, embeds: [], components: [] });
                } else {
                    return await interaction.reply({ content: `${err.message}\n-# Version: ${this.bot.BotVersion}`, embeds: [], components: [] });
                }
            }
        }
    }
}