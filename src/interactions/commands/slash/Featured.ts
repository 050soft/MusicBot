import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import SlashCommand from "../../../classes/structures/SlashCommand";

export default class FeaturedCommand extends SlashCommand {
    constructor() {
        const data = new SlashCommandBuilder().setName("featured")
            .setDescription("Gives some information about the currently featured track");
        super(data);
    }

    public async execute(interaction: ChatInputCommandInteraction): Promise<unknown> {
        return interaction.reply({ content: "test" });
        // const track = this.Bot.FeaturedTrack;
        // if (track) {
        //     return await this.Bot.ReplyEmbed(interaction, {
        //         description: `## Currently featured\n[${track.name}](${track.url}) by [${track.artist.name}](${track.artist.url}) from album **${track.album["#text"]}**`,
        //         thumbnail: track.image[3]["#text"],
        //      });
        // } else {
        //     return await this.Bot.ReplyEmbed(interaction, { description: "There seems to be no featured track." });
        // }
    }
}