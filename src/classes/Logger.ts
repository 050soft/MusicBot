import LogLevel from "../enums/LogLevel";

class Logger {
    private readonly level: LogLevel;
    private readonly configuration = {
        [LogLevel.VERBOSE]: {
            name: "VERBOSE",
            color: "\x1b[36m",
        },
        [LogLevel.DEBUG]: {
            name: "DEBUG",
            color: "\x1b[32m",
        },
        [LogLevel.INFO]: {
            name: "INFO",
            color: "\x1b[34m",
        },
        [LogLevel.WARN]: {
            name: "WARN",
            color: "\x1b[33m",
        },
        [LogLevel.ERROR]: {
            name: "ERROR",
            color: "\x1b[31m",
        },
    }

    constructor(level: LogLevel) {
        this.level = level;
    }

    private log(level: LogLevel, message: string, category?: string) {
        // write to a log file?
        if (this.level > level) return;

        const dateString = new Date().toLocaleString();
        console.log(
            `${this.configuration[level].color}${dateString} [${this.configuration[level].name} - ${category ?? "General"}] ${message}\x1b[0m`,
        );
    }

    public verbose(message: string, category?: string) {
        this.log(LogLevel.VERBOSE, message, category);
    }

    public debug(message: string, category?: string) {
        this.log(LogLevel.DEBUG, message, category);
    }

    public info(message: string, category?: string) {
        this.log(LogLevel.INFO, message, category);
    }

    public warn(message: string, category?: string) {
        this.log(LogLevel.WARN, message, category);
    }

    public error(message: string, category?: string) {
        this.log(LogLevel.ERROR, message, category);
    }
}

export default Logger;