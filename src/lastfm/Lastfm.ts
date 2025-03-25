import AuthManager from "./managers/AuthManager";
import AlbumManager from "./managers/AlbumManager";
import ArtistManager from "./managers/ArtistManager";
import ChartManager from "./managers/ChartManager";
import GeoManager from "./managers/GeoManager";
import LibraryManager from "./managers/LibraryManager";
import TagManager from "./managers/TagManager";
import TrackManager from "./managers/TrackManager";
import UserManager from "./managers/UserManager";

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

    constructor() {
        this.Album = new AlbumManager();
        this.Artist = new ArtistManager();
        this.Auth = new AuthManager();
        this.Chart = new ChartManager();
        this.Geo = new GeoManager();
        this.Library = new LibraryManager();
        this.Tag = new TagManager();
        this.Track = new TrackManager();
        this.User = new UserManager();
    }
}