import { Box, Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Meta } from '../../../components/Meta'
import { NavBar } from '../../../components/NavBar'
import { AppleMusicSongPreviewPlayer } from '../../../components/Song/AppleMusicPreviewPlayer'
import { CreditList } from '../../../components/Song/CreditList'
import { SongRecordEditionList } from '../../../components/Song/SongRecordList'
import { SongVideoList } from '../../../components/Song/SongVideoList'
import { SiteName } from '../../../const'
import {
  Credit,
  CreditArtist,
  getSong,
  hasValue,
  listArtists,
  listCredits,
  listOfficialYouTubeVideos,
  listRecordEditions,
  listSongs,
  listTracks,
  listYouTubeVideoTypes,
  RecordEdition,
  Song,
  Track,
  YouTubeVideo,
  YouTubeVideoType,
  YouTubeVideoWithType,
} from '../../../spreadsheets'

export interface SongDetail extends Song {
  credits: CreditArtist[]
  recordEditions: RecordEdition[]
  relatedVideos: YouTubeVideoWithType[]
}

interface SongPageProps {
  item: SongDetail
}

export default function RecordPage({ item }: SongPageProps) {
  const path = useRouter().asPath
  const lyrics = item.credits.filter((c) => c.creditRole === 'Lyrics')
  const music = item.credits.filter((c) => c.creditRole === 'Music')
  const arrangement = item.credits.filter((c) => c.creditRole === 'Arrangement')
  const produce = item.credits.filter((c) => c.creditRole === 'Produce')
  const dance = item.credits.filter((c) => c.creditRole === 'Dance')
  const others = item.credits.filter((c) => c.creditRole === 'Others')
  const earliestEdition = item.recordEditions.sort(
    (a, b) => Date.parse(a.editionReleaseDate) - Date.parse(b.editionReleaseDate)
  )[0]

  const mv = item.relatedVideos.filter((v) => v.videoTypeId === 'MusicVideo' || v.videoTypeId === 'LIVE')
  const shorts = item.relatedVideos.filter((v) => v.videoTypeId === 'Shorts')
  const otherVideos = item.relatedVideos.filter(
    (v) => v.videoTypeId !== 'MusicVideo' && v.videoTypeId !== 'LIVE' && v.videoTypeId !== 'Shorts'
  )

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
                <Grid container spacing={2}>
                  <Grid xs={12} sm={4}>
                    <Stack>
                      <Typography variant="caption">{item.songKana}</Typography>
                      <Typography variant="h2">{item.songName}</Typography>
                    </Stack>
                    <Stack>
                      {item.songEarliestRecordName !== '' && (
                        <Typography variant="caption">リリース日: {earliestEdition.editionReleaseDate}</Typography>
                      )}
                      {item.songEarliestRecordName !== '' && (
                        <Typography variant="caption">
                          初出: {earliestEdition.recordName}
                          {earliestEdition.recordType === 'DIGITAL' && `（${earliestEdition.editionName}）`}
                        </Typography>
                      )}
                      {item.songJASRACCode !== '' && (
                        <Typography variant="caption">JASRAC 作品コード: {item.songJASRACCode}</Typography>
                      )}
                      {item.songISWCCode !== '' && (
                        <Typography variant="caption">ISWC 作品コード: {item.songISWCCode}</Typography>
                      )}
                    </Stack>
                  </Grid>
                  <Grid xs={12} sm={8}>
                    {hasValue(item.songAppleMusicId) && (
                      <AppleMusicSongPreviewPlayer appleMusicSongId={item.songAppleMusicId} />
                    )}
                  </Grid>
                </Grid>
                <CreditList credits={lyrics} label="作詞" />
                <CreditList credits={music} label="作曲" />
                <CreditList credits={arrangement} label="編曲" />
                <CreditList credits={produce} label="制作" />
                <CreditList credits={dance} label="ダンス" />
                <CreditList credits={others} label="その他" />
                <SongRecordEditionList editions={item.recordEditions} />
                <SongVideoList listTitle="MV・ライブ映像" videos={mv} />
                <SongVideoList listTitle="関連動画" videos={otherVideos} />
                <SongVideoList listTitle="Short 動画" videos={shorts} />
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
  const allVideos: YouTubeVideo[] = await listOfficialYouTubeVideos()
  const allVideoTypes: YouTubeVideoType[] = await listYouTubeVideoTypes()

  const allTracks: Track[] = await listTracks()
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
  const recordEditions = [
    ...new Set(allTracks.filter((t) => t.songId === song.songId).map((t) => t.catalogNumber)),
  ].flatMap((catalogNumber) => allEditions.filter((e) => e.catalogNumber === catalogNumber))

  const relatedVideos = allVideos
    .filter((v) => v.songId === id)
    .map((v) => {
      const t = allVideoTypes.find((t) => t.videoTypeId === v.videoTypeId)!
      return { ...v, ...t }
    })

  const item = {
    ...song,
    credits,
    recordEditions,
    relatedVideos,
  }
  return {
    props: {
      item,
    },
  }
}
