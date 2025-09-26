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
