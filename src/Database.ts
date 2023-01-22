const songSheetId = '13Y4wbnnfY23aPUnB6n4KELVfElu1z3j5OUE9gRy9EBU'
const eventSheetId = '1VVSHBBJgG45JnaIViv2qQ6CpNIZ4o6jF2mp3L1yYfHY'

const apiKey = process.env.SHEET_API_KEY
const cache = new Map<string, object>()
const useCache = true

interface SheetValuesResponse {
  range: string
  majorDimension: string
  values: string[][]
}

// Express data structure of each sheet
export type RecordType = 'SINGLE' | 'ALBUM' | 'MINI_ALBUM'

export interface Record {
  Id: string
  Name: string
  Type: RecordType
  Label: string
  ProductUrl: string
}

export interface RecordEdition {
  CatalogNumber: string
  ReleaseDate: string
  RecordName: string
  Edition: string
  Price: string
  ASIN: string
  Type: RecordType
  Label: string
  CoverUrl: string
  AdUrl: string
}

export interface Track {
  CatalogNumber: string
  RecordName: string
  RecordEdition: string
  Disc: string
  Track: string
  TrackType: string
  SongName: string
  TrackName: string
}

export interface Song {
  Name: string
  Kana: string
  JASRACCode: string
  ISWC: string
  EarliestRecord: string
  EarliestCatalogNumber: string
}

export interface Artist {
  Name: string
  Kana: string
  WikipediaSlug: string
  Twitter: string
  MusicCount: string
  ArrangementCount: string
  LyricsCount: string
  ProduceCount: string
  DanceCount: string
}

export type SongArtistRole = 'Vocal' | 'Music' | 'Arrangement' | 'Lyrics' | 'Produce' | 'Dance' | 'Others'
export type SongArtistSource = 'BOOKLET' | 'JASRAC'

export interface SongArtist {
  Song: string
  Role: SongArtistRole
  Artist: string
  CreditName: string
  CreditTitle: string
  Source: SongArtistSource
}

export interface RecordEditionArtist {
  CatalogNumber: string
  RecordName: string
  Edition: string
  CreditTitle: string
  Artist: string
}

/**
 * @deprecated
 */
export interface RecordDetails {
  Record: Record
  EditionDetails: RecordEditionDetails[]
}

/**
 * @deprecated
 */
export interface RecordEditionDetails {
  Edition: RecordEdition
  Discs: Disc[]
  Credits: Credit[]
}

/**
 * @deprecated
 */
export interface Disc {
  DiscNumber: number
  Tracks: Track[]
}

/**
 * @deprecated
 */
interface Credit {
  CreditTitle: string
  Artist: string
}

const getRecord = async (recordName: string) => {
  const records = await listRecords()
  return records.find((r) => r.Name === recordName)
}

export const listRecords = async () => {
  const cacheKey = 'Records'
  if (useCache && cache.has(cacheKey)) {
    return cache.get(cacheKey) as Record[]
  }
  const range = 'Record!A1:E200'
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

const getRecordEdition = async (catalogNumber: string) => {
  const editions = await listRecordEditions()
  return editions.find((e) => e.CatalogNumber === catalogNumber)
}

export const listRecordEditions = async (recordName?: string): Promise<RecordEdition[]> => {
  const cacheKey = 'RecordEditions'
  if (useCache && cache.has(cacheKey)) {
    const editions = cache.get(cacheKey) as RecordEdition[]
    return recordName ? editions.filter((r) => r.RecordName === recordName) : editions
  }
  const range = 'RecordEdition!A1:J200'
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
  return recordName ? editions.filter((r) => r.RecordName === recordName) : editions
}

const listTracks = async (recordName?: string) => {
  const cacheKey = 'Tracks'
  if (useCache && cache.has(cacheKey)) {
    const tracks = cache.get(cacheKey) as Track[]
    return recordName ? tracks.filter((t) => t.RecordName === recordName) : tracks
  }
  const range = 'Track!A1:H500'
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
  return recordName ? tracks.filter((t) => t.RecordName === recordName) : tracks
}

/**
 * @deprecated
 */
export const listRecordEditionsForSong = async (songName: string) => {
  const tracks = await listTracks()
  const catalogNumbers = [...new Set(tracks.filter((t) => t.SongName === songName).map((t) => t.CatalogNumber))]
  const editions: RecordEdition[] = []
  for (const n of catalogNumbers) {
    const e = await getRecordEdition(n)
    if (e) {
      editions.push(e)
    }
  }
  return editions
}

export const getSong = async (name: string) => {
  const songs = await listSongs()
  return songs.find((s) => s.Name === name)
}

export const listSongs = async () => {
  const cacheKey = 'Songs'
  if (useCache && cache.has(cacheKey)) {
    const songs = cache.get(cacheKey) as Song[]
    return songs
  }
  const range = 'Song!A1:F200'
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

export const getArtist = async (name: string) => {
  const artists = await listArtists()
  return artists.find((a) => a.Name === name)
}

export const listArtists = async () => {
  const cacheKey = 'Artists'
  if (useCache && cache.has(cacheKey)) {
    const artists = cache.get(cacheKey) as Artist[]
    return artists
  }
  const range = 'Artist!A1:K500'
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

export const listSongArtists = async () => {
  const cacheKey = 'SongArtists'
  if (useCache && cache.has(cacheKey)) {
    const artists = cache.get(cacheKey) as SongArtist[]
    return artists
  }
  const range = 'SongArtist!A1:F1000'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${songSheetId}/values/${range}?key=${apiKey}`
  const f = await fetch(url)
  const res = (await f.json()) as SheetValuesResponse
  const [columnNames, ...data] = res.values
  const artists = data.map((d) => {
    var obj: any = {}
    for (let i = 0; i < columnNames.length; i++) {
      obj[columnNames[i]] = d[i] || ''
    }
    return obj as SongArtist
  })
  cache.set(cacheKey, artists)
  return artists
}

/**
 * @deprecated
 */
export const listSongArtistsOfRecord = async (recordDetails: RecordDetails) => {
  const songNames = [
    ...new Set(
      recordDetails.EditionDetails.flatMap((d) => d.Discs)
        .flatMap((d) => d.Tracks)
        .flatMap((t) => t.SongName)
    ),
  ]
  const songsArtists = (await listSongArtists()).filter((a) => songNames.includes(a.Song))
  return songsArtists
}

const listRecordEditionArtists = async (recordName?: string) => {
  const cacheKey = 'RecordEditionArtists'
  if (useCache && cache.has(cacheKey)) {
    const artists = cache.get(cacheKey) as RecordEditionArtist[]
    return recordName ? artists.filter((a) => a.RecordName === recordName) : artists
  }
  const range = 'RecordEditionArtist!A1:E500'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${songSheetId}/values/${range}?key=${apiKey}`
  const f = await fetch(url)
  const res = (await f.json()) as SheetValuesResponse
  const [columnNames, ...data] = res.values
  const artists = data.map((d) => {
    var obj: any = {}
    for (let i = 0; i < columnNames.length; i++) {
      obj[columnNames[i]] = d[i] || ''
    }
    return obj as RecordEditionArtist
  })
  cache.set(cacheKey, artists)
  return recordName ? artists.filter((a) => a.RecordName === recordName) : artists
}

/**
 * @deprecated
 */
export const getRecordDetails = async (recordName: string): Promise<RecordDetails> => {
  const Record = await getRecord(recordName)
  if (!Record) {
    throw Error('record not found')
  }
  const editions = await listRecordEditions(recordName)
  const tracks = await listTracks(recordName)
  const artists = await listRecordEditionArtists(recordName)
  const EditionDetails: RecordEditionDetails[] = editions.map((Edition) => {
    var Discs: Disc[] = []
    var DiscNumber = 1
    while (true) {
      const Tracks = tracks
        .filter((t) => t.CatalogNumber === Edition.CatalogNumber)
        .filter((t) => t.Disc === DiscNumber.toString())
      if (Tracks.length === 0) {
        break
      }
      Discs = [...Discs, { DiscNumber: DiscNumber, Tracks }]
      DiscNumber++
    }
    const Credits = artists
      .filter((a) => a.CatalogNumber === Edition.CatalogNumber)
      .map((a) => {
        return {
          CreditTitle: a.CreditTitle,
          Artist: a.Artist,
        } as Credit
      })
    return {
      Edition,
      Discs,
      Credits,
    }
  })
  const details: RecordDetails = {
    Record,
    EditionDetails,
  }
  return details
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
