import mongoose, { MongooseError } from "mongoose";

class DatabaseManager {
    private readonly URL = `mongodb+srv://${process.env.MONGODB_DATABASE_USER}:${process.env.MONGODB_DATABASE_PASSWORD}@${process.env.MONGODB_DATABASE_URL}/?retryWrites=true&w=majority&appName=Cluster0`; // config?

    public async Start() {
        try {
            await mongoose.connect(this.URL);
        } catch (err) {
            if (err instanceof MongooseError) {
                throw new Error(`${err.message}, ${err.stack}`);
            } else if (err instanceof Error) {
                throw new Error(err.message);
            }
        }
    }
}

export default DatabaseManager;