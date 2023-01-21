import { Box, Paper, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Link from '../../../components/Link'
import { Meta } from '../../../components/Meta'
import { NavBar } from '../../../components/NavBar'
import { RecordEditionView } from '../../../components/Record/RecordEditionCard'
import { RecordTypeChip } from '../../../components/Record/RecordType'
import { SiteName } from '../../../const'
import { getRecordDetails, listRecords, listSongArtistsOfRecord, RecordDetails, SongArtist } from '../../../Database'

interface RecordPageProps {
  recordDetails: RecordDetails
  songArtists: SongArtist[]
}

export default function RecordPage({ recordDetails, songArtists }: RecordPageProps) {
  const path = useRouter().asPath
  return (
    <>
      <Meta title={`${recordDetails.Record.Name} - ${SiteName}`} />
      <main>
        <Stack spacing={2}>
          <NavBar
            items={[
              { path: '/records', title: 'レコードデータベース' },
              { path: path, title: recordDetails.Record.Name },
            ]}
          />
          <Paper elevation={0}>
            <Box px={{ xs: 1, sm: 4, md: 8 }}>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <RecordTypeChip type={recordDetails.Record.Type} />
                  <Link href={recordDetails.Record.ProductUrl} target="_blank">
                    <Typography variant="h2">{recordDetails.Record.Name}</Typography>
                  </Link>
                  <Typography variant="caption">{recordDetails.Record.Label}</Typography>
                </Stack>
                <Stack spacing={6}>
                  {recordDetails.EditionDetails.map((details) => (
                    <RecordEditionView
                      key={details.Edition.CatalogNumber}
                      details={details}
                      songArtists={songArtists}
                    />
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
  const ids = records.map((r) => r.Id)
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
  const id = params!.id as string
  const name = id.replace(';', '/')
  const recordDetails = await getRecordDetails(name)
  const songArtists = await listSongArtistsOfRecord(recordDetails)
  return {
    props: {
      recordDetails,
      songArtists,
    },
  }
}
