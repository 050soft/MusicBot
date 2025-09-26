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
import { MongooseError, connect } from "mongoose";
import Bot from "./Bot";
import UserDB from "../models/UserDB";

export default class DatabaseManager {
    private readonly URL = `mongodb+srv://${process.env.MONGODB_DATABASE_USER}:${process.env.MONGODB_DATABASE_PASSWORD}@${process.env.MONGODB_DATABASE_URL}/?retryWrites=true&w=majority&appName=Cluster0`;
    private readonly bot
    
    constructor(bot: Bot) {
        this.bot = bot;
    }

    public async Connect() {
        try {
            if (this.bot.DeveloperMode) {
                await connect(this.URL, { dbName: "dev" });
            } else {
                await connect(this.URL);
            }

            this.bot.Logger.info("Connected to the database", "Database");
        } catch (err) {
            if (err instanceof MongooseError || err instanceof Error) {
                this.bot.Logger.error(err.message, "Database");
                this.bot.Logger.debug(err.stack ?? "");
            }
        }
    }

    public async GetAuthData(userID: string): Promise<undefined | { user: string, sk: string }> {
        const userData = await UserDB.findOne({ DiscordId: userID });
        if (!userData || !userData.LastfmUser || !userData.LastfmSK) return;

        return { user: userData.LastfmUser, sk: userData.LastfmSK };
    }

    public async SetAuthData(userID: string, authData: { user: string, sk: string }) {
        let userData = await UserDB.findOne({ DiscordId: userID });
        if (!userData) {
            userData = new UserDB({
                DiscordId: userID,
                LastfmUser: authData.user,
                LastfmSK: authData.sk,
            });
        } else {
            userData.LastfmUser = authData.user;
            userData.LastfmSK = authData.sk;
        }

        await userData.save();
        return userData;
    }
    public async DeleteAuthData(userID: string) {
        const data = await UserDB.findOne({ DiscordId: userID });
        if (!data) return;

        data.LastfmUser = null;
        data.LastfmSK = null;
        await data.save();
        return;
    }
}