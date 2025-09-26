/*
MusicBot - A Discord music bot by 050soft
Copyright (C) 2025 050soft

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
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

process.on("uncaughtException", err => {
    bot.Logger.error(err.message);
    bot.Logger.debug(err.stack ?? "");
});

process.on("unhandledRejection", (err: Error) => {
    bot.Logger.error(err.message);
    bot.Logger.debug(err.stack ?? "");
})