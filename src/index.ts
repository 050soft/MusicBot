import "dotenv/config";
import { GatewayIntentBits } from "discord.js";
import Bot from "./classes/Bot";
import LogLevel from "./enums/LogLevel";

const bot = new Bot({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessagePolls
    ]
});
export default bot;

bot.login(process.env.TOKEN);
//bot.Start();

// process.on ...