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
import { ErrorCodes } from "../enums/ErrorCodes";
import { ErrorMessages } from "../enums/ErrorMessages";

function ErrorMessage(code: ErrorCodes, args?: any) {
    if (!(code in ErrorCodes)) throw new BotError(ErrorCodes.invalidErrorCode);
    const message = ErrorMessages[code];
    if (!message) return "a Generic error occurred";
    if (typeof message === "function") return message([...args] as any);
    return message;
}

export class BotError extends Error {
    public readonly code: ErrorCodes;

    constructor(code: ErrorCodes, ...args: any) {
        super(ErrorMessage(code, args));
        this.code = code;
        Error.captureStackTrace(this, BotError);
    } 

    public get name(): string {
        // eg; "BotError [1]"
        return `${super.name} [${this.code}]`;
    } 
}

