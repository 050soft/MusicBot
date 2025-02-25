import { Events } from "discord.js";
import Bot from "../bot/Bot";

export default interface IEvent {
    name: Events | string;
    once?: boolean;

    execute(bot: Bot, ...args: any): Promise<unknown> | void;
}