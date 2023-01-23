import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { NoImageUrl } from '../../const'
import { Credit, SongWithCreditsAndEditions } from '../../spreadsheets'
import Link from '../Link'
import { AlbumCover } from '../Record/AlbumCover'

interface SongCollectionCardProps {
  item: SongWithCreditsAndEditions
}

export const SongCollectionCard = ({ item }: SongCollectionCardProps) => {
  const coverUrl =
    item.recordEditions.find((e) => e.editionCoverUrl && e.editionCoverUrl !== NoImageUrl)?.editionCoverUrl ||
    NoImageUrl

  const lyricsCredits = item.credits.filter((c) => c.creditRole === 'Lyrics')
  const musicCredits = item.credits.filter((c) => c.creditRole === 'Music')
  const arrangementCredits = item.credits.filter((c) => c.creditRole === 'Arrangement')
  return (
    <Card>
      <CardActionArea LinkComponent={Link} href={`/songs/${item.songId}`}>
        <Box width="100%">
          <Grid container>
            <Grid xs={4}>
              <AlbumCover imgUrl={coverUrl} />
            </Grid>
            <Grid xs={8}>
              <Stack spacing={1} px={1} whiteSpace="nowrap" width="100%">
                <Typography variant="subtitle2" textOverflow="ellipsis" overflow="hidden">
                  {item.songName}
                </Typography>
                <Stack>
                  <SongCollectionCardArtist label="作詞" credits={lyricsCredits} />
                  <SongCollectionCardArtist label="作曲" credits={musicCredits} />
                  <SongCollectionCardArtist label="編曲" credits={arrangementCredits} />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </CardActionArea>
    </Card>
  )
}

interface SongCollectionCardArtistProps {
  label: string
  credits: Credit[]
}

const SongCollectionCardArtist = ({ label, credits }: SongCollectionCardArtistProps) => {
  return (
    <>
      {credits.length > 0 && (
        <Typography variant="caption" textOverflow="ellipsis" overflow="hidden">
          {label}: {credits.map((c) => c.creditName).join('/')}
        </Typography>
      )}
    </>
  )
}
