const songSheetId = '13Y4wbnnfY23aPUnB6n4KELVfElu1z3j5OUE9gRy9EBU'
const eventSheetId = '1VVSHBBJgG45JnaIViv2qQ6CpNIZ4o6jF2mp3L1yYfHY'
const contentSheetId = '1mVHPjvue9Tcm-4sfz-ZrLXo40FDJk3k4MBGefNTybjA'

const apiKey = process.env.SHEET_API_KEY
const cache = new Map<string, object>()
const useCache = true

export const hasValue = (s?: string) => s && s !== ''

interface SheetValuesResponse {
  range: string
  majorDimension: string
  values: string[][]
}

export type RecordType = 'SINGLE' | 'ALBUM' | 'MINI_ALBUM' | 'DIGITAL'

export interface Record {
  recordId: string
  recordName: string
  recordType: RecordType
  recordLabel: string
  recordProductUrl: string
  recordAppleMusicId: string
}

export interface RecordEdition {
  catalogNumber: string
  editionReleaseDate: string
  recordId: string
  recordName: string
  editionName: string
  editionPrice: string
  editionASIN: string
  recordType: RecordType
  recordLabel: string
  editionCoverUrl: string
  editionProductUrl: string
}

export interface Track {
  catalogNumber: string
  recordName: string
  editionName: string
  disc: string
  track: string
  trackType: string
  songId: string
  SongName: string
  trackName: string
}

export interface Song {
  songId: string
  songName: string
  songKana: string
  songJASRACCode: string
  songISWCCode: string
  songEarliestRecordName: string
  songEarliestCatalogNumber: string
  songAppleMusicId: string
}

export interface Artist {
  artistId: string
  artistName: string
  artistKana: string
  artistWikipediaSlug: string
  artistTwitter: string
  artistInstagram: string
  artistTikTok: string
  artistWebsite: string
  artistMusicCount: string
  artistArrangementCount: string
  artistLyricsCount: string
  artistProduceCount: string
  artistDanceCount: string
}

export type CreditRole = 'Vocal' | 'Music' | 'Arrangement' | 'Lyrics' | 'Produce' | 'Dance' | 'Others'
export type SongArtistSource = 'BOOKLET' | 'JASRAC' | 'EXTERNAL'

export interface Credit {
  songId: string
  songName: string
  creditRole: CreditRole
  artistId: string
  creditName: string
  creditTitle: string
  creditSource: SongArtistSource
  creditSourceUrl: string
}

export interface RecordEditionCredit {
  catalogNumber: string
  recordName: string
  editionName: string
  creditTitle: string
  creditName: string
}

export type CreditArtist = Credit & Artist
export type SongWithCreditsAndEditions = Song & { credits: Credit[] } & { recordEditions: RecordEdition[] }
export type SongCredit = Song & Credit
export type SongCreditWithEditionCoverUrl = SongCredit & { editionCoverUrl: string }
export type ArtistWithSongCredits = Artist & { works: SongCreditWithEditionCoverUrl[] }
export type TrackWithCredits = Track & { credits: Credit[] }

export const getRecord = async (recordId: string) => {
  const records = await listRecords()
  return records.find((r) => r.recordId === recordId)
}

export const listRecords = async () => {
  const cacheKey = 'Records'
  if (useCache && cache.has(cacheKey)) {
    return cache.get(cacheKey) as Record[]
  }
  const range = 'Record!A1:F200'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${songSheetId}/values/${range}?key=${apiKey}`
  const f = await fetch(url)
  const res = (await f.json()) as SheetValuesResponse
  const [columnNames, ...data] = res.values
  const records = data.map((d) => {
    var obj: any = {}
    for (let i = 0; i < columnNames.length; i++) {
      obj[columnNames[i]] = d[i] || ''
    }
    return obj as Record
  })
  cache.set(cacheKey, records)
  return records
}

export const listRecordEditions = async (recordId?: string): Promise<RecordEdition[]> => {
  const cacheKey = 'RecordEditions'
  if (useCache && cache.has(cacheKey)) {
    const editions = cache.get(cacheKey) as RecordEdition[]
    return recordId ? editions.filter((r) => r.recordId === recordId) : editions
  }
  const range = 'RecordEdition!A1:K300'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${songSheetId}/values/${range}?key=${apiKey}`
  const f = await fetch(url)
  const res = (await f.json()) as SheetValuesResponse
  const [columnNames, ...data] = res.values
  const editions = data.map((d) => {
    var obj: any = {}
    for (let i = 0; i < columnNames.length; i++) {
      obj[columnNames[i]] = d[i] || ''
    }
    return obj as RecordEdition
  })
  cache.set(cacheKey, editions)
  return recordId ? editions.filter((r) => r.recordId === recordId) : editions
}

export const listTracks = async (catalogNumber?: string) => {
  const cacheKey = 'Tracks'
  if (useCache && cache.has(cacheKey)) {
    const tracks = cache.get(cacheKey) as Track[]
    return catalogNumber ? tracks.filter((t) => t.catalogNumber === catalogNumber) : tracks
  }
  const range = 'Track!A1:I1000'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${songSheetId}/values/${range}?key=${apiKey}`
  const f = await fetch(url)
  const res = (await f.json()) as SheetValuesResponse
  const [columnNames, ...data] = res.values
  const tracks = data.map((d) => {
    var obj: any = {}
    for (let i = 0; i < columnNames.length; i++) {
      obj[columnNames[i]] = d[i] || ''
    }
    return obj as Track
  })
  cache.set(cacheKey, tracks)
  return catalogNumber ? tracks.filter((t) => t.catalogNumber === catalogNumber) : tracks
}

export const getSong = async (id: string) => {
  const songs = await listSongs()
  return songs.find((s) => s.songId === id)
}

export const listSongs = async () => {
  const cacheKey = 'Songs'
  if (useCache && cache.has(cacheKey)) {
    const songs = cache.get(cacheKey) as Song[]
    return songs
  }
  const range = 'Song!A1:H200'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${songSheetId}/values/${range}?key=${apiKey}`
  const f = await fetch(url)
  const res = (await f.json()) as SheetValuesResponse
  const [columnNames, ...data] = res.values
  const songs = data.map((d) => {
    var obj: any = {}
    for (let i = 0; i < columnNames.length; i++) {
      obj[columnNames[i]] = d[i] || ''
    }
    return obj as Song
  })
  cache.set(cacheKey, songs)
  return songs
}

export const getArtist = async (id: string) => {
  const artists = await listArtists()
  return artists.find((a) => a.artistId === id)
}

export const listArtists = async () => {
  const cacheKey = 'Artists'
  if (useCache && cache.has(cacheKey)) {
    const artists = cache.get(cacheKey) as Artist[]
    return artists
  }
  const range = 'Artist!A1:M300'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${songSheetId}/values/${range}?key=${apiKey}`
  const f = await fetch(url)
  const res = (await f.json()) as SheetValuesResponse
  const [columnNames, ...data] = res.values
  const artists = data.map((d) => {
    var obj: any = {}
    for (let i = 0; i < columnNames.length; i++) {
      obj[columnNames[i]] = d[i] || ''
    }
    return obj as Artist
  })
  cache.set(cacheKey, artists)
  return artists
}

export const listCredits = async () => {
  const cacheKey = 'Credits'
  if (useCache && cache.has(cacheKey)) {
    const credits = cache.get(cacheKey) as Credit[]
    return credits
  }
  const range = 'Credit!A1:H1000'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${songSheetId}/values/${range}?key=${apiKey}`
  const f = await fetch(url)
  const res = (await f.json()) as SheetValuesResponse
  const [columnNames, ...data] = res.values
  const credits = data.map((d) => {
    var obj: any = {}
    for (let i = 0; i < columnNames.length; i++) {
      obj[columnNames[i]] = d[i] || ''
    }
    return obj as Credit
  })
  cache.set(cacheKey, credits)
  return credits
}

export const listRecordEditionCredits = async (catalogNumber?: string) => {
  const cacheKey = 'RecordEditionCredits'
  if (useCache && cache.has(cacheKey)) {
    const credits = cache.get(cacheKey) as RecordEditionCredit[]
    return catalogNumber ? credits.filter((a) => a.catalogNumber === catalogNumber) : credits
  }
  const range = 'RecordEditionCredit!A1:E500'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${songSheetId}/values/${range}?key=${apiKey}`
  const f = await fetch(url)
  const res = (await f.json()) as SheetValuesResponse
  const [columnNames, ...data] = res.values
  const credits = data.map((d) => {
    var obj: any = {}
    for (let i = 0; i < columnNames.length; i++) {
      obj[columnNames[i]] = d[i] || ''
    }
    return obj as RecordEditionCredit
  })
  cache.set(cacheKey, credits)
  return catalogNumber ? credits.filter((a) => a.catalogNumber === catalogNumber) : credits
}

// Event Sheet
export interface Event {
  eventId: string
  eventTitle: string
  eventTitleTentative: 'TRUE' | 'FALSE'
  eventDate: string
  /** optional */
  eventStartTime: string
  /** optional */
  eventPlace: string
  eventHashTag: string
  eventInfoSourceType: 'OFFICIAL'
  /** optional */
  eventInfoUrl: string
}

export interface Costume {
  costumeId: string
  costumeName: string
}

export const listEvents = async () => {
  const cacheKey = 'Events'
  if (useCache && cache.has(cacheKey)) {
    const events = cache.get(cacheKey) as Event[]
    return events
  }
  const range = 'Event!A1:I1000'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${eventSheetId}/values/${range}?key=${apiKey}`
  const f = await fetch(url)
  const res = (await f.json()) as SheetValuesResponse
  const [columnNames, ...data] = res.values
  const events = data.map((d) => {
    var obj: any = {}
    for (let i = 0; i < columnNames.length; i++) {
      obj[columnNames[i]] = d[i] || ''
    }
    return obj as Event
  })
  cache.set(cacheKey, events)
  return events
}

export const listCostumes = async () => {
  const cacheKey = 'Costumes'
  if (useCache && cache.has(cacheKey)) {
    const costumes = cache.get(cacheKey) as Costume[]
    return costumes
  }
  const range = 'Costume!A1:D1000'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${eventSheetId}/values/${range}?key=${apiKey}`
  const f = await fetch(url)
  const res = (await f.json()) as SheetValuesResponse
  const [columnNames, ...data] = res.values
  const costumes = data.map((d) => {
    var obj: any = {}
    for (let i = 0; i < columnNames.length; i++) {
      obj[columnNames[i]] = d[i] || ''
    }
    return obj as Costume
  })
  cache.set(cacheKey, costumes)
  return costumes
}

// Content Sheet
export interface YouTubeVideo {
  videoId: string
  videoPublishedAt: string
  channelId: string
  channelTitle: string
  videoTitle: string
  videoTypeId: string
  /** optional */
  songId: string
}

export interface YouTubeVideoType {
  videoTypeId: string
  videoTypeName: string
  videoTypeSortPriority: string
  videoTypeCount: string
  videoTypeIcon: string
}

export interface YouTubeChannel {
  channelId: string
  channelTitle: string
  channelVideoCount: string
  channelThumbnailUrl: string
}

export interface YouTubeVideoType {
  videoTypeId: string
  videoTypeName: string
  videoTypeSortPriority: string
}

export type YouTubeVideoWithType = YouTubeVideo & YouTubeVideoType

export const listYouTubeVideos = async () => {
  const cacheKey = 'YouTubeVideos'
  if (useCache && cache.has(cacheKey)) {
    const videos = cache.get(cacheKey) as YouTubeVideo[]
    return videos
  }
  const range = 'YouTubeVideo!A1:G2000'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${contentSheetId}/values/${range}?key=${apiKey}`
  const f = await fetch(url)
  const res = (await f.json()) as SheetValuesResponse
  const [columnNames, ...data] = res.values
  const videos = data.map((d) => {
    var obj: any = {}
    for (let i = 0; i < columnNames.length; i++) {
      obj[columnNames[i]] = d[i] || ''
    }
    return obj as YouTubeVideo
  })
  cache.set(cacheKey, videos)
  return videos
}

export const getYouTubeVideoType = async (videoTypeId: string) => {
  const videoTypes = await listYouTubeVideoTypes()
  return videoTypes.find((t) => t.videoTypeId === videoTypeId)
}

export const listYouTubeVideoTypes = async () => {
  const cacheKey = 'YouTubeVideoTypes'
  if (useCache && cache.has(cacheKey)) {
    const videos = cache.get(cacheKey) as YouTubeVideoType[]
    return videos
  }
  const range = 'YouTubeVideoType!A1:E200'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${contentSheetId}/values/${range}?key=${apiKey}`
  const f = await fetch(url)
  const res = (await f.json()) as SheetValuesResponse
  const [columnNames, ...data] = res.values
  const videos = data.map((d) => {
    var obj: any = {}
    for (let i = 0; i < columnNames.length; i++) {
      obj[columnNames[i]] = d[i] || ''
    }
    return obj as YouTubeVideoType
  })
  cache.set(cacheKey, videos)
  return videos
}

export const getYouTubeChannel = async (channelId: string) => {
  const channels = await listYouTubeChannels()
  return channels.find((c) => c.channelId === channelId)
}

export const listYouTubeChannels = async () => {
  const cacheKey = 'YouTubeChannels'
  if (useCache && cache.has(cacheKey)) {
    const channels = cache.get(cacheKey) as YouTubeChannel[]
    return channels
  }
  const range = 'YouTubeChannel!A1:D100'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${contentSheetId}/values/${range}?key=${apiKey}`
  const f = await fetch(url)
  const res = (await f.json()) as SheetValuesResponse
  const [columnNames, ...data] = res.values
  const channels = data.map((d) => {
    var obj: any = {}
    for (let i = 0; i < columnNames.length; i++) {
      obj[columnNames[i]] = d[i] || ''
    }
    return obj as YouTubeChannel
  })
  cache.set(cacheKey, channels)
  return channels
}
