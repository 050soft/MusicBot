export default interface GetRecentTracks {
    recenttracks: RecentTracks
}

export interface RecentTracks {
    track: Track[]
    "@attr": UserAttr
}

export interface Track {
    artist: Artist
    mbid: string
    name: string
    image: Image2[]
    streamable: string
    album: Album
    url: string
    "@attr"?: TrackAttr
    loved: string
    date?: Date
}

export interface Artist {
    url: string
    name: string
    image: Image[]
    mbid: string
}

export interface Image {
    size: string
    "#text": string
}

export interface Image2 {
    size: string
    "#text": string
}

export interface Album {
    mbid: string
    "#text": string
}

export interface TrackAttr {
    nowplaying: string
}

export interface Date {
    uts: string
    "#text": string
}

export interface UserAttr {
    user: string
    totalPages: string
    page: string
    perPage: string
    total: string
}