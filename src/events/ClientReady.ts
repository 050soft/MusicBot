import { ActivityType, Events } from "discord.js";
import Event from "../classes/structures/Event";

const weekDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

export default class ClientReady extends Event<Events.ClientReady> {
    constructor() {
        super(Events.ClientReady, true);
    }

    public async execute() {
        this.bot.Logger.info(`Logged in as: ${this.bot.user?.tag}!`, "Client");
        this.bot.Logger.info(`Total Guilds: ${await this.bot.GetGuildCount()}`, "Stats");

        const getTrack = async () => {
            const user = "436950036098842645";
            const authdata = await this.bot.DatabaseManager.GetAuthData(user);
            if (!authdata) return;
            const response = await this.bot.LastfmManager.User.GetNowPlaying(authdata);
            if (response.IsError()) return;
            if (response && response.data.recenttracks) {
                const np = response.data.recenttracks;
                const trackName = np.track[0].name;
                const trackArtist = np.track[0].artist.name;
                this.bot.FeaturedTrack = np.track[0];
                this.bot.user?.setPresence({activities: [{ type: ActivityType.Custom, name: "music", state: `Featured: ${trackName} - ${trackArtist}` }] });
            }
        }

        setInterval(async function() {
            getTrack();
        }, 300_000);

        // const updateStatus = () => {
        //     this.bot.user!.setActivity('🔥 METAL ' + weekDays[new Date().getDay()] + '? METAL EVERYDAY!', { type: ActivityType.Custom });
        // };

        // updateStatus();
        
        // const now = new Date();
        // const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0).getTime();
        // const diff = midnight - now.getTime();

        // setTimeout(() => {
        //     updateStatus();
        //     setInterval(updateStatus, 24 * 60 * 60 * 1000);
        // }, diff);
    }
}
