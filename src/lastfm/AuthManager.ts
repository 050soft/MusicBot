import fetch from "node-fetch";
import md5 from "md5";
import GetRecentTracks, { RecentTracks } from "./responses/user/GetRecentTracks";
import ErrorResponse from "./responses/ErrorResponse";
import { Collection, User } from "discord.js";
import UserDB from "../database/models/UserDB";

class LastfmAuthManager {
    public readonly API_KEY = process.env.LASTFM_API_KEY as string;
    public readonly SHARED_SECRET = process.env.LASTFM_SHARED_SECRET as string;

    public readonly BaseURL = "http://ws.audioscrobbler.com/2.0";
    public readonly AuthURL = `http://www.last.fm/api/auth/?api_key=${this.API_KEY}`;
    public readonly Format = "json";

    private CurrentlyAuthenticating: Collection<User, string>;

    constructor() {
        this.CurrentlyAuthenticating = new Collection();
        
        setInterval(() => {
            this.CheckCurrentlyAuthenticating();
        }, 15_000);
    }

    /**
     * Checks everyone that is currently authenticating and sees if they logged in successfully yet 
     */
    private async CheckCurrentlyAuthenticating() {
        const allUsers = this.CurrentlyAuthenticating.entries();
        for (const [user, authToken] of allUsers) {
            const session = await this.GetSession(user.id, authToken);
            if (session) {
                try {
                    await user.send({ content: `You've succesfully logged in with Last.fm as **${session.LastfmUser}**`});
                } catch {}
                
                this.CurrentlyAuthenticating.delete(user);
            }
        }
    }

    private GetSig(params: any): string {
        const paramStr = Object.keys(params)
            .sort()
            .filter(key => key != "format" && key != "callback")
            .map(key => key + params[key])
            .join('')
            .concat(this.SHARED_SECRET);
        return md5(paramStr, { encoding: "UTF-8" });
    }

    private async GetSession(userID: string, token: string) {
        const path = "?method=auth.getSession";

        const params = {
            "api_key": this.API_KEY,
            "token": token,
            "method": "auth.getSession"
        }
        const md5sig = this.GetSig(params);
        
        const fullUrl = `${this.BaseURL}${path}&api_key=${this.API_KEY}&token=${token}&format=${this.Format}&api_sig=${md5sig}`;
        const response = await fetch(fullUrl);
        const body = await response.json();
        if (body.message && body.error) {
            // DM user -> tell them it went wrong and to try again
            return;
        }

        let userData = await UserDB.findOne({ DiscordId: userID });
        if (!userData) {
            userData = new UserDB({
                DiscordId: userID,
                LastfmUser: body.session.name,
                LastfmSK: body.session.key,
            });

            await userData.save();
        } else {
            userData.LastfmUser = body.session.name;
            userData.LastfmSK = body.session.key;
            await userData.save();
        }

        return userData;
    }

    private async GetToken(): Promise<string | undefined> {
        const path = "?method=auth.gettoken";

        // convert to sig function
        const signature = `api_key${this.API_KEY}methodauth.getToken${this.SHARED_SECRET}`;
        const md5sig = md5(signature, { encoding: "UTF-8" });

        const fullUrl = `${this.BaseURL}${path}&api_key=${this.API_KEY}&api_sig=${md5sig}&format=${this.Format}`;
        const response = await fetch(fullUrl);
        const body = await response.json();
        const token = body.token;
        if (!token) return;

        return token;
    }

    public async GetUrl(user: User): Promise<string | undefined> {
        const token = await this.GetToken();
        if (!token) return;
 
        this.CurrentlyAuthenticating.set(user, token);

        const url = `${this.AuthURL}&token=${token}`;
        return url;
    }

    // TODO -> custom errors?
    public async GetNowPlaying(sessionKey: string, user: string): Promise<undefined | RecentTracks> {
        const path = "?method=user.getRecentTracks";

        // TODO -> implement this.
        // const params = {
        //     "api_key": this.API_KEY,
        //     "sk": sessionKey,
        //     "method": "user.getRecentTracks"
        // }

        const now = Math.round(Date.now() / 1000);
        const from = now - 86400;

        const fullUrl = `${this.BaseURL}${path}&api_key=${this.API_KEY}&format=${this.Format}&limit=1&user=${user}&sk=${sessionKey}&from=${from}&extended=1`;
        const response = await fetch(fullUrl);
        const body = await response.json();

        if (body.message && body.error) {
            const error: ErrorResponse = body;
            throw new Error(`LastFM api error, message: ${error.message}, code: ${error.error}`)
        }

        if (!body.recenttracks) throw new Error("Invalid");

        // We've ensured the response is a proper one here
        const recentTracks: GetRecentTracks = body;
        return recentTracks.recenttracks;
    }

    public async GetAuthData(userID: string): Promise<undefined | { user: string, sk: string }> {
        const userData = await UserDB.findOne({ DiscordId: userID });
        if (!userData || !userData.LastfmUser || !userData.LastfmSK) return;

        return { user: userData.LastfmUser, sk: userData.LastfmSK };
    }
}

export default LastfmAuthManager;