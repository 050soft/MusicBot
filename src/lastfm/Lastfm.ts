import AuthManager from "./managers/AuthManager";
import AlbumManager from "./managers/AlbumManager";
import ArtistManager from "./managers/ArtistManager";
import ChartManager from "./managers/ChartManager";
import GeoManager from "./managers/GeoManager";
import LibraryManager from "./managers/LibraryManager";
import TagManager from "./managers/TagManager";
import TrackManager from "./managers/TrackManager";
import UserManager from "./managers/UserManager";
import Bot from "../classes/Bot";

export default class Lastfm {
    public Album: AlbumManager;
    public Artist: ArtistManager;
    public Auth: AuthManager;
    public Chart: ChartManager;
    public Geo: GeoManager;
    public Library: LibraryManager;
    public Tag: TagManager;
    public Track: TrackManager;
    public User: UserManager;

    constructor(bot: Bot) {
        this.Album = new AlbumManager(bot);
        this.Artist = new ArtistManager(bot);
        this.Auth = new AuthManager(bot);
        this.Chart = new ChartManager(bot);
        this.Geo = new GeoManager(bot);
        this.Library = new LibraryManager(bot);
        this.Tag = new TagManager(bot);
        this.Track = new TrackManager(bot);
        this.User = new UserManager(bot);
    }
}