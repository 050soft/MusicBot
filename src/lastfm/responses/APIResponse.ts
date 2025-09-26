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
import { ErrorResponse } from "./ErrorResponse";
import { Responses } from "./Responses";

export class Response<RType extends keyof Responses> {
    public readonly data: Responses[RType];

    constructor(data: Responses[RType]) {
        this.data = data;
    }

    public IsError(): this is ErrorResponse {
        return this instanceof ErrorResponse;
        // if (
        //     "message" in this.data && 
        //     typeof(this.data.message) === "string" && 
        //     "error" in this.data && 
        //     typeof(this.data.error) === "number"
        // ) return true; 

        // return false;
    }
}
