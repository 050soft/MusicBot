import { ActivityType, Events } from "discord.js";
import IEvent from "../../interfaces/IEvent";

export default <IEvent> {
    name: Events.ClientReady,
    once: true,

    async execute(bot) {
        bot.Log(`Logged in as: ${bot.user?.tag}!`);
        bot.Log(`Total Guilds: ${bot.guilds.cache.size}`);

        setInterval(async function() {
            const user = "436950036098842645";
            const authdata = await bot.LastFMAuthManager.GetAuthData(user);
            if (!authdata) return;
            const np = await bot.LastFMAuthManager.GetNowPlaying(authdata.sk, authdata.user);
            if (np) {
                const trackName = np.track[0].name;
                const trackArtist = np.track[0].artist.name;
                bot.FeaturedTrack = np.track[0];
                bot.user?.setPresence({activities: [{ type: ActivityType.Custom, name: "music", state: `Featured: ${trackName} - ${trackArtist}` }] });
            }
        }, 10_000);
    }
}