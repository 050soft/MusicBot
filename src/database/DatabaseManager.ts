import mongoose from "mongoose";

class DatabaseManager {
    private readonly URL = `mongodb+srv://${process.env.MONGODB_DATABASE_USER}:${process.env.MONGODB_DATABASE_PASSWORD}@${process.env.MONGODB_DATABASE_URL}/?retryWrites=true&w=majority&appName=Cluster0`; // config?

    public async Start() {
        // TODO -> Error handling
        await mongoose.connect(this.URL);
    }
}

export default DatabaseManager;