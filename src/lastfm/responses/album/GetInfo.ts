export default interface GetInfo {
    album: Album
}

export interface Album {
    artist: string
    mbid: string
    tags: Tags
    playcount: string
    image: Image[]
    tracks: Tracks
    url: string
    name: string
    listeners: string
    wiki: Wiki
}

export interface Tags {
    tag: Tag[]
}

export interface Tag {
    url: string
    name: string
}

export interface Image {
    size: string
    "#text": string
}

export interface Tracks {
    track: Track[]
}

export interface Track {
    streamable: Streamable
    duration: number
    url: string
    name: string
    "@attr": Attr
    artist: Artist
}

export interface Streamable {
    fulltrack: string
    "#text": string
}

export interface Attr {
    rank: number
}

export interface Artist {
    url: string
    name: string
    mbid: string
}

export interface Wiki {
    published: string
    summary: string
    content: string
}
