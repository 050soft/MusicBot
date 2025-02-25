import "dotenv/config";
import { GatewayIntentBits } from "discord.js";
import Bot from "./bot/Bot";
import config from "./config.json";

// Make some small changes to discord JS
declare module "discord.js" {
    export interface ChatInputCommandInteraction {
        Bot: Bot,
    }
    export interface MessageContextMenuCommandInteraction {
        Bot: Bot,
    }
    export interface UserContextMenuCommandInteraction {
        Bot: Bot,
    }
    export interface SelectMenuInteraction {
        Bot: Bot,
    }
    export interface ButtonInteraction {
        Bot: Bot,
    }
    export interface AutoCompleteInteraction {
        Bot: Bot,
    }
    export interface ModalSubmitInteraction {
        Bot: Bot,
    }
}

new Bot({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessagePolls
    ]
});