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
import { ClientEvents } from "discord.js";
import { Bot } from "../../index";

export abstract class Event<Event extends keyof ClientEvents> {
    protected readonly bot = Bot;

    public readonly name: Event;
    public readonly once?: boolean;
    public abstract execute(...args: ClientEvents[Event]): any;

    constructor(event: Event, once?: boolean) {
        this.name = event;
        this.once = once;
    }
}
