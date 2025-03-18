import { Events } from "discord.js";
import Event from "../classes/structures/Event";

export default class Debug extends Event<Events.Debug> {
    constructor() {
        super(Events.Debug);
    }

    async execute(message: string) {
        //this.bot.Logger.verbose(message, "Gateway");
    }
}