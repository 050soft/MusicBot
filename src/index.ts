import { GatewayIntentBits } from "discord.js";
import Bot from "./classes/Bot";
import LogLevel from "./enums/LogLevel";

console.log("\n");

const bot = new Bot({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessagePolls
    ]
});
export default bot;

bot.Logger.log(LogLevel.VERBOSE, "test");
bot.Logger.log(LogLevel.DEBUG, "test");
bot.Logger.log(LogLevel.INFO, "test");
bot.Logger.log(LogLevel.WARN, "test");
bot.Logger.log(LogLevel.ERROR, "test");


//bot.login();
//bot.Start();

// process.on ...