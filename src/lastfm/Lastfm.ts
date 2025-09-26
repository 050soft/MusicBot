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
import { AuthManager } from "./managers/AuthManager";
import { AlbumManager } from "./managers/AlbumManager";
import { ArtistManager } from "./managers/ArtistManager";
import { ChartManager } from "./managers/ChartManager";
import { GeoManager } from "./managers/GeoManager";
import { LibraryManager } from "./managers/LibraryManager";
import { TagManager } from "./managers/TagManager";
import { TrackManager } from "./managers/TrackManager";
import { UserManager } from "./managers/UserManager";

export class Lastfm {
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