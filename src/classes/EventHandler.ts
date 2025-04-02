import Bot from "./Bot";
import path from "path";
import { readdirSync } from "fs";
import Event from "./structures/Event";

export default class EventHandler {
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