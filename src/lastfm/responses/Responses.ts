import { APIError } from "./ErrorResponse";

import Methods from "./Methods";

export default interface Responses {
    [Methods.Error]: APIError;

    [Methods.AlbumAddTags]: any;
    [Methods.AlbumGetInfo]: any;
    [Methods.AlbumGetTags]: any;
    [Methods.AlbumGetTopTags]: any;
    [Methods.AlbumRemoveTag]: any;
    [Methods.AlbumSearch]: any;

    [Methods.ArtistAddTags]: any;
    [Methods.ArtistGetCorrection]: any;
    [Methods.ArtistGetInfo]: any;
    [Methods.ArtistGetSimilar]: any;
    [Methods.ArtistGetTags]: any;
    [Methods.ArtistGetTopAlbums]: any;
    [Methods.ArtistGetTopTags]: any;
    [Methods.ArtistGetTopTracks]: any;
    [Methods.ArtistRemoveTag]: any;
    [Methods.ArtistSearch]: any;

    [Methods.AuthGetMobileSession]: any;
    [Methods.AuthGetSession]: any;
    [Methods.AuthGetToken]: any;

    [Methods.ChartGetTopArtists]: any;
    [Methods.ChartGetTopTags]: any;
    [Methods.ChartGetTopTracks]: any;

    [Methods.GeoGetTopArtists]: any;
    [Methods.GeoGetTopTracks]: any;

    [Methods.LibraryGetArtists]: any;

    [Methods.TagGetInfo]: any;
    [Methods.TagGetSimilar]: any;
    [Methods.TagGetTopAlbums]: any;
    [Methods.TagGetTopArtists]: any;
    [Methods.TagGetTopTags]: any;
    [Methods.TagGetTopTracks]: any;
    [Methods.TagGetWeeklyChartList]: any;

    [Methods.TrackAddTags]: any;
    [Methods.TrackGetCorrection]: any;
    [Methods.TrackGetInfo]: any;
    [Methods.TrackGetSimilar]: any;
    [Methods.TrackGetTags]: any;
    [Methods.TrackGetTopTags]: any;
    [Methods.TrackLove]: any;
    [Methods.TrackRemoveTag]: any;
    [Methods.TrackScrobble]: any;
    [Methods.TrackSearch]: any;
    [Methods.TrackUnlove]: any;
    [Methods.TrackUpdateNowPlaying]: any;

    [Methods.UserGetFriends]: any;
    [Methods.UserGetInfo]: any;
    [Methods.UserGetLovedTracks]: any;
    [Methods.UserGetPersonalTags]: any;
    [Methods.UserGetRecentTracks]: any;
    [Methods.UserGetTopAlbums]: any;
    [Methods.UserGetTopArtists]: any;
    [Methods.UserGetTopTags]: any;
    [Methods.UserGetTopTracks]: any;
    [Methods.UserGetWeeklyAlbumChart]: any;
    [Methods.UserGetWeeklyArtistChart]: any;
    [Methods.UserGetWeeklyChartList]: any;
    [Methods.UserGetWeeklyTrackChart]: any;
}