import Bot from "../../classes/Bot";
import Methods from "../responses/Methods";
import Manager from "./Manager";

export default class AuthManager extends Manager {
    public readonly methodDir = "auth";

    constructor(bot: Bot) {
        super(bot);
    }

    public async GetToken() {
        const method = "gettoken";

        const params = {
            "api_key": this.API_KEY,
            "method": method,
        };

        return await this.Request<Methods.AuthGetToken>(this.GetUrl(params));
    }
}