import { Client, Events } from "discord.js";
import EventHandler from "../classes/structures/EventHandler";

export default class ClientReady extends EventHandler<Events.ClientReady> {
    constructor() {
        super(Events.ClientReady, true);
    }

    public execute(client: Client<true>) {
    }
}