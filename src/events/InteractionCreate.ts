import { CacheType, Events, Interaction } from "discord.js";
import Event from "../classes/structures/Event";

export default class InteractionCreate extends Event<Events.InteractionCreate> {
    constructor() {
       super(Events.InteractionCreate) 
    }

    async execute(interaction: Interaction<CacheType>) {
    }
}