import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    DiscordId: String,
    LastfmUser: String,
    LastfmSK: String, // SK = Session Key, for now we will store it in plaintext (forgive me)

    CommandsUsed: Number,
});

export default model("Users", UserSchema);