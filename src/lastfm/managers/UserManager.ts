import Bot from "../../classes/Bot";
import Methods from "../responses/Methods";
import Manager from "./Manager";

export default class UserManager extends Manager {
    constructor() {
        super();
    }

    public async GetNowPlaying(d: { user: string, sk: string }) {
        const method = Methods.UserGetRecentTracks;
        const params = {
            "method": method,
            "sk": d.sk,
            "user": d.user,
            "limit": 1,
            "extended": 1,
        };

        const url = this.GetUrl(params);
        return await this.Request<typeof method>(url);
    }
}