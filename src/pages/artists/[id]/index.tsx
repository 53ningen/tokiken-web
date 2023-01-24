import { Box, Paper, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ArtistMediaLinks } from '../../../components/Artist/ArtistMediaLinks'
import { ArtistWorks } from '../../../components/Artist/ArtistWorks'
import { Meta } from '../../../components/Meta'
import { NavBar } from '../../../components/NavBar'
import { NoImageUrl, SiteName } from '../../../const'
import {
  ArtistWithSongCredits,
  getArtist,
  listArtists,
  listCredits,
  listRecordEditions,
  listSongs,
  SongCredit,
  SongCreditWithEditionCoverUrl,
} from '../../../spreadsheets'

interface ArtistPageProps {
  item: ArtistWithSongCredits
}

export default function ArtistPage({ item }: ArtistPageProps) {
  const path = useRouter().asPath
  const lyricsItems = item.works.filter((i) => i.creditRole === 'Lyrics')
  const musicItems = item.works.filter((i) => i.creditRole === 'Music')
  const arrangementItems = item.works.filter((i) => i.creditRole === 'Arrangement')
  const produceItems = item.works.filter((i) => i.creditRole === 'Produce')
  const danceItems = item.works.filter((i) => i.creditRole === 'Dance')
  const otherItems = item.works.filter((i) => i.creditRole === 'Others')
  return (
    <>
      <Meta title={`${item.artistName} - ${SiteName}`} />
      <main>
        <Stack spacing={2}>
          <NavBar
            items={[
              { path: '/artists', title: 'アーティストデータベース' },
              { path: path, title: item.artistName },
            ]}
          />
          <Paper>
            <Box px={{ xs: 1, sm: 4, md: 8 }}>
              <Stack spacing={2}>
                <Stack>
                  <Typography variant="caption">{item.artistKana}</Typography>
                  <Typography variant="h2">{item.artistName}</Typography>
                </Stack>
                <ArtistMediaLinks artist={item} />
                <ArtistWorks label="作詞" items={lyricsItems} />
                <ArtistWorks label="作曲" items={musicItems} />
                <ArtistWorks label="編曲" items={arrangementItems} />
                <ArtistWorks label="制作" items={produceItems} />
                <ArtistWorks label="ダンス" items={danceItems} />
                <ArtistWorks label="その他" items={otherItems} />
              </Stack>
            </Box>
          </Paper>
        </Stack>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const artists = await listArtists()
  const ids = artists.map((a) => a.artistId)
  const paths = ids.map((id) => {
    return {
      params: {
        id,
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ArtistPageProps> = async ({ params }) => {
  const id = params!.id as string
  const artist = await getArtist(id)
  if (!artist) {
    throw Error(`${id} not found`)
  }
  const allSongs = await listSongs()
  const allCredits = await listCredits()
  const allEditions = await listRecordEditions()

  const songCredits: SongCredit[] = allCredits
    .filter((c) => c.artistId === id)
    .map((c) => {
      const s = allSongs.find((s) => s.songId === c.songId)!
      return { ...c, ...s }
    })
  const works: SongCreditWithEditionCoverUrl[] = songCredits.map((sc) => {
    const editionCoverUrl =
      allEditions.find((e) => e.recordName === sc.songEarliestRecordName && e.editionCoverUrl !== NoImageUrl)
        ?.editionCoverUrl || NoImageUrl
    return {
      ...sc,
      editionCoverUrl,
    }
  })
  const item: ArtistWithSongCredits = {
    ...artist,
    works,
  }
  return {
    props: {
      item,
    },
  }
}
