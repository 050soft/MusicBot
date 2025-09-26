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