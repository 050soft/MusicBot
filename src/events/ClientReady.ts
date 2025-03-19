import { ActivityType, Events } from "discord.js";
import Event from "../classes/structures/Event";

let weekDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

export default class ClientReady extends Event<Events.ClientReady> {
    constructor() {
        super(Events.ClientReady, true);
    }

    public async execute() {
        this.bot.Logger.info(`Logged in as: ${this.bot.user?.tag}!`, "Client");
        this.bot.Logger.info(`Total Guilds: ${await this.bot.GetGuildCount()}`, "Stats");

        const updateStatus = () => {
            this.bot.user!.setActivity('🔥 METAL ' + weekDays[new Date().getDay()] + '? METAL EVERYDAY!', { type: ActivityType.Custom });
        };

        updateStatus();
        
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0).getTime();
        const diff = midnight - now.getTime();

        setTimeout(() => {
            updateStatus();
            setInterval(updateStatus, 24 * 60 * 60 * 1000);
        }, diff);
    }
}