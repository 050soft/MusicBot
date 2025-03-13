import { Collection, Events, Interaction } from "discord.js";
import IEvent from "../../interfaces/IEvent";
import { MongoError } from "mongodb";
import BotError from "../errors/BotError";

export default <IEvent> {
    name: Events.InteractionCreate,

    async execute(bot, interaction: Interaction) {
        if (interaction.isChatInputCommand()) {
            const command = bot.SlashCommands.get(interaction.commandName)
            if (!command) return;

            const cooldowns = bot.CommandCooldowns
            if (!cooldowns.has(command.data.name)) {
                cooldowns.set(command.data.name, new Collection<string, number>());
            }

            const now = Date.now();
            const commandCooldowns = cooldowns.get(command.data.name)
            if (!commandCooldowns) return;
            const defaultCooldown = 1;
            const cooldownAmount = (command.cooldown ?? defaultCooldown) * 1000;

            const userCooldown = commandCooldowns.get(interaction.user.id)
            if (userCooldown) {
                const expirationTime = userCooldown + cooldownAmount;

                if (now < expirationTime) {
                    const expiredTimestamp = Math.round(expirationTime / 1000);
                    // TODO -> implement!
                    //return bot.CooldownEmbed(interaction, expiredTimestamp)
                }
            }

            commandCooldowns.set(interaction.user.id, now);
            setTimeout(() => commandCooldowns.delete(interaction.user.id), cooldownAmount);

            interaction.Bot = bot;

            try {
                await command.execute(interaction)
            } catch (error) {
                bot.Log(error as string, "error");

                if (error instanceof MongoError) {
                    if (interaction.replied || interaction.deferred) {
                        return await interaction.editReply({ content: "A database error occurred", embeds: [], components: [] });
                    } else {
                        return await interaction.reply({ content: "A database error occurred", embeds: [], components: [] });
                    }
                } else if (error instanceof BotError) {
                    return await interaction.Bot.ErrorEmbed(interaction, `${error.message}`);
                } 

                if (interaction.replied || interaction.deferred) {
                    return await interaction.editReply({ content: `${error}\n-# Version: ${bot.BotVersion}`, embeds: [], components: [] });
                } else {
                    return await interaction.reply({ content: `${error}\n-# Version: ${bot.BotVersion}`, embeds: [], components: [] });
                }
            }
        }
    }
}