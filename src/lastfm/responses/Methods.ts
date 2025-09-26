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
export enum Methods {
    Error = "error",

    // Album
    AlbumAddTags = "album.addTags",
    AlbumGetInfo = "album.getInfo",
    AlbumGetTags = "album.getTags",
    AlbumGetTopTags = "album.getTopTags",
    AlbumRemoveTag = "album.removeTag",
    AlbumSearch = "album.search",

    // Artist
    ArtistAddTags = "artist.addTags",
    ArtistGetCorrection = "artist.getCorrection",
    ArtistGetInfo = "artist.getInfo",
    ArtistGetSimilar = "artist.getSimilar",
    ArtistGetTags = "artist.getTags",
    ArtistGetTopAlbums = "artist.getTopAlbums",
    ArtistGetTopTags = "artist.getTopTags",
    ArtistGetTopTracks = "artist.getTopTracks",
    ArtistRemoveTag = "artist.removeTag",
    ArtistSearch = "artist.search",

    // Auth
    AuthGetMobileSession = "auth.getMobileSession",
    AuthGetSession = "auth.getSession",
    AuthGetToken = "auth.getToken",

    // Chart
    ChartGetTopArtists = "chart.getTopArtists",
    ChartGetTopTags = "chart.getTopTags",
    ChartGetTopTracks = "chart.getTopTracks",

    // Geo
    GeoGetTopArtists = "geo.getTopArtists",
    GeoGetTopTracks = "geo.getTopTracks",

    // Library
    LibraryGetArtists = "library.getArtists",

    // Tag
    TagGetInfo = "tag.getInfo",
    TagGetSimilar = "tag.getSimilar",
    TagGetTopAlbums = "tag.getTopAlbums",
    TagGetTopArtists = "tag.getTopArtists",
    TagGetTopTags = "tag.getTopTags",
    TagGetTopTracks = "tag.getTopTracks",
    TagGetWeeklyChartList = "tag.getWeeklyChartList",

    // Track
    TrackAddTags = "track.addTags",
    TrackGetCorrection = "track.getCorrection",
    TrackGetInfo = "track.getInfo",
    TrackGetSimilar = "track.getSimilar",
    TrackGetTags = "track.getTags",
    TrackGetTopTags = "track.getTopTags",
    TrackLove = "track.love",
    TrackRemoveTag = "track.removeTag",
    TrackScrobble = "track.scrobble",
    TrackSearch = "track.search",
    TrackUnlove = "track.unlove",
    TrackUpdateNowPlaying = "track.updateNowPlaying",

    // User
    UserGetFriends = "user.getFriends",
    UserGetInfo = "user.getInfo",
    UserGetLovedTracks = "user.getLovedTracks",
    UserGetPersonalTags = "user.getPersonalTags",
    UserGetRecentTracks = "user.getRecentTracks",
    UserGetTopAlbums = "user.getTopAlbums",
    UserGetTopArtists = "user.getTopArtists",
    UserGetTopTags = "user.getTopTags",
    UserGetTopTracks = "user.getTopTracks",
    UserGetWeeklyAlbumChart = "user.getWeeklyAlbumChart",
    UserGetWeeklyArtistChart = "user.getWeeklyArtistChart",
    UserGetWeeklyChartList = "user.getWeeklyChartList",
    UserGetWeeklyTrackChart = "user.getWeeklyTrackChart"
}
