enum ResponseTypes {
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



export default ResponseTypes;