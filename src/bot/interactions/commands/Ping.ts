import { SlashCommandBuilder } from "discord.js";
import ISlashCommand from "../../../interfaces/ISlashCommand";
import Category from "../../../enums/Category";

export default <ISlashCommand> {
    data: new SlashCommandBuilder().setName("ping").setDescription("Shows the bot's ping"),
    cooldown: 10,
    category: Category.Information,
    async execute(interaction) {
        interaction.reply({ content: `${interaction.Bot.ws.ping}ms` })
    },
}