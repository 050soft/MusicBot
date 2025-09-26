/*
MusicBot - A Discord music bot by 050soft
Copyright (C) 2025  050soft

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
import { Bot } from "./Bot";
import path from "path";
import { readdirSync } from "fs";
import { Event } from "./structures/Event";
export class EventHandler {
    private readonly bot: Bot;
    private readonly EventsPath = path.join(__dirname, "..", "events");

    constructor(bot: Bot) {
        this.bot = bot;
    }

    public async HandleAndLoadEvents() {
        const files = readdirSync(this.EventsPath).filter(file => file.endsWith(".js"));
        for (const file of files) {
            const e = await import(`${path.join(this.EventsPath, file)}`);
            const event = e.default;
            if (!(event.prototype instanceof Event)) continue;

            const constructedEvent: Event<any> = new event();
            if (constructedEvent.once) {
                this.bot.once(constructedEvent.name, (...args) => constructedEvent.execute(...args));
            } else {
                this.bot.on(constructedEvent.name, (...args) => constructedEvent.execute(...args));
            }

            this.bot.Logger.verbose(`Event found ${file}`, "EventHandler");
        }

        this.bot.Logger.info(`Loaded ${files.length} Events`, "EventHandler");
    }
}