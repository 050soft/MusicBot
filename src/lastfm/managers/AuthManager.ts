import Methods from "../responses/Methods";
import Manager from "./Manager";

export default class AuthManager extends Manager {
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
        return `${this.AuthURL}&token=${token.data.token}`;
    }
}