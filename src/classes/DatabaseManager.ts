import { MongooseError, connect } from "mongoose";
import Bot from "./Bot";

export default class DatabaseManager {
    private readonly URL = `mongodb+srv://${process.env.MONGODB_DATABASE_USER}:${process.env.MONGODB_DATABASE_PASSWORD}@${process.env.MONGODB_DATABASE_URL}/?retryWrites=true&w=majority&appName=Cluster0`;
    private readonly bot
    
    constructor(bot: Bot) {
        this.bot = bot;
    }

    public async Connect() {
        try {
            await connect(this.URL);

            this.bot.Logger.info("Connected to the database", "Database")
        } catch (err) {
            if (err instanceof MongooseError || err instanceof Error) {
                this.bot.Logger.error(err.message, "Database");
                this.bot.Logger.debug(err.stack ?? "");
            }
        }
    }
}