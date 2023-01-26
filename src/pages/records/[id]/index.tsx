import { Box, Paper, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Link from '../../../components/Link'
import { Meta } from '../../../components/Meta'
import { NavBar } from '../../../components/NavBar'
import { RecordEditionView } from '../../../components/Record/RecordEditionCard'
import { AppleMusicAlbumPreviewPlayer } from '../../../components/Song/AppleMusicPreviewPlayer'
import { SiteName } from '../../../const'
import {
  getRecord,
  hasValue,
  listCredits,
  listRecordEditionCredits,
  listRecordEditions,
  listRecords,
  listTracks,
  Record,
  RecordEdition,
  RecordEditionCredit,
  TrackWithCredits,
} from '../../../spreadsheets'

export type RecordEditionDetail = RecordEdition & { tracks: TrackWithCredits[] } & {
  editionCredits: RecordEditionCredit[]
}
type RecordDetail = Record & { editionDetails: RecordEditionDetail[] }

interface RecordPageProps {
  item: RecordDetail
}

export default function RecordPage({ item }: RecordPageProps) {
  const path = useRouter().asPath
  return (
    <>
      <Meta title={`${item.recordName} - ${SiteName}`} />
      <main>
        <Stack spacing={2}>
          <NavBar
            items={[
              { path: '/records', title: 'レコードデータベース' },
              { path: path, title: item.recordName },
            ]}
          />
          <Paper elevation={0}>
            <Box px={{ xs: 1, sm: 4, md: 8 }}>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Link href={item.recordProductUrl} target="_blank">
                    <Typography variant="h2">{item.recordName}</Typography>
                  </Link>
                  <Typography variant="caption">{item.recordLabel}</Typography>
                </Stack>
                {hasValue(item.recordAppleMusicId) && (
                  <AppleMusicAlbumPreviewPlayer appleMusicRecordId={item.recordAppleMusicId} />
                )}
                <Stack spacing={6}>
                  {item.editionDetails.map((e) => (
                    <RecordEditionView key={e.catalogNumber} item={e} />
                  ))}
                </Stack>
              </Stack>
            </Box>
          </Paper>
        </Stack>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const records = await listRecords()
  const ids = records.map((r) => r.recordId)
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

export const getStaticProps: GetStaticProps<RecordPageProps> = async ({ params }) => {
  const recordId = params!.id as string
  const record = await getRecord(recordId)
  if (!record) {
    throw new Error(`record not found: ${recordId}`)
  }
  const allCredits = await listCredits()
  const editions = await listRecordEditions(recordId)

  const editionDetails: RecordEditionDetail[] = []
  for (const edition of editions) {
    const tracks: TrackWithCredits[] = []
    const editionTracks = await listTracks(edition.catalogNumber)
    for (const track of editionTracks) {
      const credits = allCredits.filter((c) => c.songId === track.songId)
      tracks.push({
        ...track,
        credits,
      })
    }
    const editionCredits = await listRecordEditionCredits(edition.catalogNumber)
    editionDetails.push({
      ...edition,
      tracks,
      editionCredits,
    })
  }
  const item: RecordDetail = {
    ...record,
    editionDetails,
  }
  return {
    props: {
      item,
    },
  }
}
