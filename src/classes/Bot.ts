import { Client, ClientOptions } from "discord.js";
import Logger from "./Logger";
import LogLevel from "../enums/LogLevel";

class Bot extends Client {
    public Logger = new Logger(LogLevel.VERBOSE);

    constructor(clientOptions: ClientOptions) {
        super(clientOptions);

        this.Logger = new Logger(LogLevel.VERBOSE);
    }

}

export default Bot;