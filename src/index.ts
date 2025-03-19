import "dotenv/config";
import { ActivityType, GatewayIntentBits } from "discord.js";
import Bot from "./classes/Bot";

let weekDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

const bot = new Bot({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessagePolls
    ]
});
export default bot;

bot.login(process.env.TOKEN);

bot.once('ready', () => {
    bot.user!.setActivity('🔥 METAL ' + weekDays[new Date().getDay()] + '? METAL EVERYDAY!', { type: ActivityType.Custom });
});

//bot.Start();

// process.on ...