import { CacheType, Events, Interaction } from "discord.js";
import Event from "../classes/structures/Event";
import BotError from "../classes/BotError";
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