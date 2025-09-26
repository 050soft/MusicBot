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
import md5 from "md5";
import fetch from "node-fetch";
import { APIError, ErrorResponse } from "../responses/ErrorResponse";
import { Response } from "../responses/APIResponse";
import { Responses } from "../responses/Responses";

/**
 * The base for each manager, contains some basic functions needed across the board.
 */
export class Manager {
    public readonly API_KEY = process.env.LASTFM_API_KEY as string;
    public readonly SHARED_SECRET = process.env.LASTFM_SHARED_SECRET as string;

    public readonly BaseURL = "http://ws.audioscrobbler.com/2.0";
    public readonly Format = "json";

    private GenerateSignature(params: { [key: string]: any }) {
        const paramStr = Object.keys(params)
            .sort()
            .filter(key => key != "format" && key != "callback")
            .map(key => key + params[key as any])
            .join('')
            .concat(this.SHARED_SECRET);
        return md5(paramStr, { encoding: "UTF-8" });
    }

    private IsError(data: any): data is APIError {
        return (
            typeof data.message === "string" && typeof data.error == "number"
        );
    }

    /**
     * 
     * @param params Array of keys with a value
     * @returns The URL with a valid signature and all parameters applied
     */
    public GetUrl(params: { [key: string]: any }) {
        const requestParams: { [key: string]: any } = { ...params, api_key: this.API_KEY };
        const signature = this.GenerateSignature(requestParams);
        requestParams["api_sig"] = signature;
        requestParams["format"] = this.Format;
        const query = new URLSearchParams(requestParams).toString();
        return `${this.BaseURL}?${query}`;
    }

    public async Request<T extends keyof Responses>(url: string) {
        const response = await fetch(url);
        const body = await response.json();
        if (this.IsError(body)) {
            return new ErrorResponse(body);
        }

        return new Response<T>(body);
    }
}