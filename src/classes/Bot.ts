import { Client, ClientOptions } from "discord.js";
import Logger from "./Logger";
import LogLevel from "../enums/LogLevel";

import { version } from "../../package.json";
const currentYear = new Date().getFullYear();

class Bot extends Client {
    public Logger = new Logger(LogLevel.VERBOSE);

    constructor(clientOptions: ClientOptions) {
        super(clientOptions);

        this.Logger = new Logger(LogLevel.VERBOSE);
    }

    public get BotVersion(): string {
        return `${currentYear}.${version}`;
    }

    public async GetGuildCount(): Promise<number> {
        // !! when starting to use shards use the shard-wide counting method
        return this.guilds.cache.size;
    }
}

export default Bot;