import "dotenv/config";
import { GatewayIntentBits } from "discord.js";
import Bot from "./classes/Bot";

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
process.on("uncaughtException", err => {
    bot.Logger.error(err.message);
    bot.Logger.debug(err.stack ?? "");
});

process.on("unhandledRejection", (err: Error) => {
    bot.Logger.error(err.message);
    bot.Logger.debug(err.stack ?? "");
})