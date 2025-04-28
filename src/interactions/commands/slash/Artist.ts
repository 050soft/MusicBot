import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption, SlashCommandSubcommandBuilder } from "discord.js"
import SlashCommand from "../../../classes/structures/SlashCommand"

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

    public async execute(interaction: ChatInputCommandInteraction): Promise<unknown> {
        return await interaction.reply({ content: `sc: ${interaction.options.getSubcommand(true)}`})
    }
}