/*
MusicBot - A Discord music bot by 050soft
Copyright (C) 2025  050soft

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
import { ActionRowBuilder, APIEmbedField, Client, ClientOptions, Collection, ColorResolvable, EmbedBuilder, Interaction, MessageActionRowComponentBuilder, MessageFlags } from "discord.js";
import { Logger } from "./Logger";
import { LogLevel } from "../enums/LogLevel";
import config from "../config.json";

import { version, commit_id } from "../version";
import { EventHandler } from "./EventHandler";
import { InteractionHandler } from "./InteractionHandler";
import { DatabaseManager } from "./DatabaseManager";
import { Track } from "../lastfm/responses/user/GetRecentTracks";
import { Lastfm } from "../lastfm/Lastfm";

export class Bot extends Client {
    public readonly InformativeLogging: boolean;
    public readonly DeveloperMode: boolean;
    public readonly ApplicationID: string;
    public readonly ServerID: string;

    public readonly SuccessEmbedColor: ColorResolvable;
    public readonly ErrorEmbedColor: ColorResolvable;
    public readonly NormalEmbedColor: ColorResolvable;
    public readonly DiscogsEmoji: string;
    public readonly LastfmEmoji: string;

    public EventHandler: EventHandler;
    public InteractionHandler: InteractionHandler;
    public LastfmManager: Lastfm;
    public DatabaseManager: DatabaseManager;
    
    public Logger: Logger;

    public FeaturedTrack: Track | undefined;

    private CurrentlyAuthenticating: Collection<string, { token: string, startedOn: number }>;

    constructor(clientOptions: ClientOptions) {
        super(clientOptions);

        this.InformativeLogging = config.APPLICATION.INFORMATIVE_LOGGING;
        this.DeveloperMode = config.DEVELOPMENT.DEVMODE;
        if (this.DeveloperMode) {
            this.ApplicationID = config.DEVELOPMENT.APP_ID;
        } else {
            this.ApplicationID = config.APPLICATION.ID
        }
        this.ServerID = config.DEVELOPMENT.SERVER;

        this.SuccessEmbedColor = config.EMBEDS.SUCCESS as ColorResolvable;
        this.ErrorEmbedColor = config.EMBEDS.ERROR as ColorResolvable;
        this.NormalEmbedColor = config.EMBEDS.NORMAL as ColorResolvable;
        this.DiscogsEmoji = config.EMBEDS.DISCOGS_EMOJI;
        this.LastfmEmoji = config.EMBEDS.LASTFM_EMOJI

        this.EventHandler = new EventHandler(this);
        this.InteractionHandler = new InteractionHandler(this);
        this.LastfmManager = new Lastfm();
        this.DatabaseManager = new DatabaseManager(this);
        this.Logger = new Logger(LogLevel.VERBOSE);

        this.CurrentlyAuthenticating = new Collection();

        this.Logger.info(`Development mode is set to ${this.DeveloperMode}`);

        this.EventHandler.HandleAndLoadEvents();
        this.InteractionHandler.LoadInteractions();
        this.DatabaseManager.Connect();

        // Loops the function
        setInterval(async () => {
            this.CheckCurrentlyAuthenticating();
        }, 30_000);
    }

    private async CheckCurrentlyAuthenticating() {
        const allUsers = this.CurrentlyAuthenticating.entries();
        const now = Math.round(new Date().getTime() / 1000);
        for (const [user, authData] of allUsers) {
            if ((now - authData.startedOn) >= 3_600) {
                // It's been 60 minutes; token expired.
                this.CurrentlyAuthenticating.delete(user);
                // Maybe send user a DM
                continue;
            }

            const session = await this.LastfmManager.Auth.GetSession(authData.token);
            if (session.IsError()) {
                continue;
            }

            if (!session.data.session.key || !session.data.session.name) continue;

            await this.DatabaseManager.SetAuthData(user, { user: session.data.session.name, sk: session.data.session.key });
            try {
                const userObj = await this.users.fetch(user);
                await userObj.send({ content: `You've successfully logged in with Last.fm as **${session.data.session.name}**`});
            } catch {}
            this.CurrentlyAuthenticating.delete(user);
        }
    }

    public get BotVersion(): string {
        if (this.DeveloperMode) {
            return `${version}-dev`;
        }
        return `${version}`;
    }

    public get CommitId(): string {
        return `${commit_id}`;
    }

    public async GetGuildCount(): Promise<number> {
        // FIXME !! when starting to use shards use the shard-wide counting method
        return this.guilds.cache.size;
    }

    public async SetCurrentlyAuthenticating(userID: string, token: string) {
        return this.CurrentlyAuthenticating.set(userID, { token: token, startedOn: Math.round(new Date().getTime() / 1000) });
    }

    public async ReplyEmbed(interaction: Interaction, data: { content?: string, title?: string, url?: string, description: string, fields?: APIEmbedField[], components?: ActionRowBuilder<MessageActionRowComponentBuilder>[], thumbnail?: string, author?: { name: string, iconURL?: string, url?: string }, unixTime?: string, ephemeral?: boolean }) {
        if (!interaction.isRepliable()) {
            return;
            //throw new BotError(ErrorCodes.cannotReplyToInteraction, interaction.type);
        }

        const { content, title, url, description, fields, components, thumbnail, author, unixTime, ephemeral } = data;
        // if (!message) {}

        const embed = new EmbedBuilder();
        embed.setColor(this.NormalEmbedColor as ColorResolvable);
        embed.setFooter({ text: `v${this.BotVersion} • commit: ${this.CommitId}` });
        if (unixTime) {
            embed.setTimestamp(new Date(unixTime));
        } else {
            embed.setTimestamp(new Date());
        }

        if (title) {
            embed.setTitle(title);

            // Nesting this here since url cannot be set without a title
            if (url) {
                embed.setURL(url);
            }
        }       
        embed.setDescription(description);
        if (fields) {
            embed.addFields(fields);
        }
        if (thumbnail) {
            embed.setThumbnail(thumbnail);
        }
        if (author) {
            embed.setAuthor(author);
        }

        if (interaction.deferred || interaction.replied) {
            return await interaction.editReply({ content: content, embeds: [embed], components: components });
        }

        const flags: MessageFlags.Ephemeral[] = [];
        if (ephemeral) {
            flags.push(MessageFlags.Ephemeral);
        }

        return await interaction.reply({ content: content, embeds: [embed], components: components, flags: flags });
    }
}

