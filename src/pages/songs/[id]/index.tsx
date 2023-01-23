import { Box, Paper, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Meta } from '../../../components/Meta'
import { NavBar } from '../../../components/NavBar'
import { CreditList } from '../../../components/Song/CreditList'
import { SongRecordEditionList } from '../../../components/Song/SongRecordList'
import { SiteName } from '../../../const'
import {
  Credit,
  CreditArtist,
  getSong,
  listArtists,
  listCredits,
  listRecordEditions,
  listSongs,
  RecordEdition,
  SongWithCreditArtistsAndEditions,
} from '../../../spreadsheets'

interface SongPageProps {
  item: SongWithCreditArtistsAndEditions
}

export default function RecordPage({ item }: SongPageProps) {
  const path = useRouter().asPath
  const lyrics = item.credits.filter((c) => c.creditRole === 'Lyrics')
  const music = item.credits.filter((c) => c.creditRole === 'Music')
  const arrangement = item.credits.filter((c) => c.creditRole === 'Arrangement')
  const produce = item.credits.filter((c) => c.creditRole === 'Produce')
  const dance = item.credits.filter((c) => c.creditRole === 'Dance')
  const others = item.credits.filter((c) => c.creditRole === 'Others')
  return (
    <>
      <Meta title={`${item.songName} - ${SiteName}`} />
      <main>
        <Stack spacing={2}>
          <NavBar
            items={[
              { path: '/songs', title: '楽曲データベース' },
              { path: path, title: item.songName },
            ]}
          />
          <Paper>
            <Box px={{ xs: 1, sm: 4, md: 8 }}>
              <Stack spacing={2}>
                <Stack>
                  <Typography variant="caption">{item.songKana}</Typography>
                  <Typography variant="h2">{item.songName}</Typography>
                </Stack>
                <Stack>
                  {item.songEarliestRecordId !== '' && (
                    <Typography variant="caption">初出レコード: {item.songEarliestRecordId}</Typography>
                  )}
                  {item.songJASRACCode !== '' && (
                    <Typography variant="caption">JASRAC 作品コード: {item.songJASRACCode}</Typography>
                  )}
                  {item.songISWCCode !== '' && (
                    <Typography variant="caption">ISWC 作品コード: {item.songISWCCode}</Typography>
                  )}
                </Stack>
                <CreditList credits={lyrics} label="作詞" />
                <CreditList credits={music} label="作曲" />
                <CreditList credits={arrangement} label="編曲" />
                <CreditList credits={produce} label="制作" />
                <CreditList credits={dance} label="ダンス" />
                <CreditList credits={others} label="その他" />
                <SongRecordEditionList editions={item.recordEditions} />
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
  const ids = songs.map((s) => s.songId)
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

export const getStaticProps: GetStaticProps<SongPageProps> = async ({ params }) => {
  const id = params!.id as string
  const song = await getSong(id)
  const artists = await listArtists()
  if (!song) {
    throw Error(`song not found: ${id}`)
  }
  const allEditions: RecordEdition[] = await listRecordEditions()
  const allCredits: Credit[] = await listCredits()
  const credits: CreditArtist[] = allCredits
    .filter((c) => c.songId === song.songId)
    .map((c) => {
      const a = artists.find((a) => a.artistId === c.artistId)!
      return {
        ...c,
        ...a,
      }
    })
  const recordEditions = allEditions.filter((e) => e.recordId === song.songEarliestRecordId)
  const item = {
    ...song,
    credits,
    recordEditions,
  }
  return {
    props: {
      item,
    },
  }
}
