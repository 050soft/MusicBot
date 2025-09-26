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
import { Methods } from "../responses/Methods";
import { Manager } from "./Manager";

export class AuthManager extends Manager {
    public readonly methodDir = "auth";
    public readonly AuthURL = `http://www.last.fm/api/auth/?api_key=${this.API_KEY}`;

    constructor() {
        super();
    }

    public async GetToken() {
        const method = Methods.AuthGetToken;

        const params = {
            "method": method,
        };
    
        return await this.Request<typeof method>(this.GetUrl(params));
    }

    public async GetSession(token: string) {
        const method = Methods.AuthGetSession;

        const params = {
            "method": method,
            "token": token
        };

        const url = this.GetUrl(params);
        return await this.Request<typeof method>(url);
    }

    public async GetAuthUrl() {
        const token = await this.GetToken();
        if (!token || token.IsError()) return console.error(token.data);
        return { url: `${this.AuthURL}&token=${token.data.token}`, token: token.data.token };
    }
}