import { ClientEvents } from "discord.js";
import Bot from "../../index";

export default abstract class Event<Event extends keyof ClientEvents> {
    protected readonly bot = Bot;

    public readonly name: Event;
    public readonly once?: boolean;
    public abstract execute(...args: ClientEvents[Event]): any;

    constructor(event: Event, once?: boolean) {
        this.name = event;
        this.once = once;
    }
}
