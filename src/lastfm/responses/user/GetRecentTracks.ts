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