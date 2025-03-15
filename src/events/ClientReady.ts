import { Client, Events } from "discord.js";
import Event from "../classes/structures/Event";

export default class ClientReady extends Event<Events.ClientReady> {
    constructor() {
        super(Events.ClientReady, true);
    }

    public async execute() {
        this.bot.Logger.info(`Logged in as: ${this.bot.user?.tag}!`, "Client");
        this.bot.Logger.info(`Total Guilds: ${await this.bot.GetGuildCount()}`, "Stats");

        this.bot.Logger.error("hi");
        this.bot.Logger.warn("hi");
    }
}