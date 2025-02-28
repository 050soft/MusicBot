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
            if (!commandCooldowns) return; // ^^ already adding above so if it doesn't exist now...
            const defaultCooldown = 1;
            const cooldownAmount = (command.cooldown ?? defaultCooldown) * 1000;

            const userCooldown = commandCooldowns.get(interaction.user.id)
            if (userCooldown) {
                const expirationTime = userCooldown + cooldownAmount;

                if (now < expirationTime) {
                    const expiredTimestamp = Math.round(expirationTime / 1000);
                    //return bot.CooldownEmbed(interaction, expiredTimestamp)
                }
            }

            commandCooldowns.set(interaction.user.id, now);
            setTimeout(() => commandCooldowns.delete(interaction.user.id), cooldownAmount);

            interaction.Bot = bot

            try {
                await command.execute(interaction)
            } catch (error) {
                if (error instanceof MongoError) {

                } else if (error instanceof BotError) {
                    // TODO -> Move to file
                    if (interaction.replied) {
                        await interaction.editReply({ content: error.message, embeds: [], components: [] });
                    } else {
                        await interaction.reply({ content: error.message, embeds: [], components: [] });
                    }

                    return;
                } 

                // if (error instanceof MongoError) {
                //     bot.Logger.Error(`${error.message} - ${error.stack}`);
                //     if (error.message.endsWith("10000ms")) {
                //         return await bot.ErrorEmbed(interaction, "The database has timed out after 10 seconds - There could be a database outage");
                //     } else {
                //         await bot.ErrorEmbed(interaction, "A database error has occured - Please try again!");
                //     }
                // } else if (error instanceof BotError) {
                //     // custom log here if needed for some - don't log all in console as some don't need logging (low severity / users fault most of the time)
                //     return await bot.ErrorEmbed(interaction, error.message);
                // }

                bot.Log(error as string, "error");
                //return await bot.ErrorEmbed(interaction, "An unknown error occured");
            }
        }
    }
}