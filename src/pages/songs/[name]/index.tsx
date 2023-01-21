import { Box, Paper, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Meta } from '../../../components/Meta'
import { NavBar } from '../../../components/NavBar'
import { SongArtistItem, SongArtistList } from '../../../components/Song/SongArtistList'
import { SongRecordEditionList } from '../../../components/Song/SongRecordList'
import { SiteName } from '../../../const'
import {
  getArtist,
  getSong,
  listRecordEditionsForSong,
  listSongArtists,
  listSongs,
  RecordEdition,
  Song,
} from '../../../Database'

interface SongPageProps {
  song: Song
  editions: RecordEdition[]
  songAritstItems: SongArtistItem[]
}

export default function RecordPage({ song, editions, songAritstItems }: SongPageProps) {
  const path = useRouter().asPath
  const lyrics = songAritstItems.filter((i) => i.Role === 'Lyrics')
  const music = songAritstItems.filter((i) => i.Role === 'Music')
  const arrangement = songAritstItems.filter((i) => i.Role === 'Arrangement')
  const produce = songAritstItems.filter((i) => i.Role === 'Produce')
  const dance = songAritstItems.filter((i) => i.Role === 'Dance')
  const others = songAritstItems.filter((i) => i.Role === 'Others')
  return (
    <>
      <Meta title={`${song.Name} - ${SiteName}`} />
      <main>
        <Stack spacing={2}>
          <NavBar
            items={[
              { path: '/songs', title: '楽曲データベース' },
              { path: path, title: song.Name },
            ]}
          />
          <Paper>
            <Box px={{ xs: 1, sm: 4, md: 8 }}>
              <Stack spacing={2}>
                <Stack>
                  <Typography variant="caption">{song.Kana}</Typography>
                  <Typography variant="h2">{song.Name}</Typography>
                </Stack>
                <Stack>
                  {song.EarliestRecord !== '' && (
                    <Typography variant="caption">初出レコード: {song.EarliestRecord}</Typography>
                  )}
                  {song.JASRACCode !== '' && (
                    <Typography variant="caption">JASRAC 作品コード: {song.JASRACCode}</Typography>
                  )}
                  {song.ISWC !== '' && <Typography variant="caption">ISWC 作品コード: {song.ISWC}</Typography>}
                </Stack>
                <SongArtistList artists={lyrics} label="作詞" />
                <SongArtistList artists={music} label="作曲" />
                <SongArtistList artists={arrangement} label="編曲" />
                <SongArtistList artists={produce} label="制作" />
                <SongArtistList artists={dance} label="ダンス" />
                <SongArtistList artists={others} label="その他" />
                <SongRecordEditionList editions={editions} />
              </Stack>
            </Box>
          </Paper>
        </Stack>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const songs = await listSongs()
  const names = songs.map((s) => s.Name)
  const paths = names.map((name) => {
    return {
      params: {
        name,
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<SongPageProps> = async ({ params }) => {
  const name = params!.name as string
  const song = await getSong(name)
  const editions = await listRecordEditionsForSong(name)

  const songArtists = (await listSongArtists()).filter((a) => a.Song === name)
  const songAritstItems: SongArtistItem[] = []
  for (const sa of songArtists) {
    const { Artist: artistName, CreditTitle: creditTitle, CreditName: creditName, Source: source, Role: role } = sa
    const a = await getArtist(artistName)
    songAritstItems.push({
      ...a!,
      ...sa,
    })
  }
  if (!song) {
    throw Error(`${name} not found`)
  }
  return {
    props: {
      song,
      editions,
      songAritstItems,
    },
  }
}
