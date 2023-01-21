import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Link from '../Link'
import { AlbumCover } from '../Record/AlbumCover'

interface SongCollectionCardProps {
  name: string
  coverUrl: string
  lyricsArtists: string[]
  musicArtists: string[]
  arrangementArtists: string[]
}

export const SongCollectionCard = ({
  name,
  coverUrl,
  lyricsArtists,
  musicArtists,
  arrangementArtists,
}: SongCollectionCardProps) => {
  return (
    <Card>
      <CardActionArea LinkComponent={Link} href={`/songs/${name}`}>
        <Box width="100%">
          <Grid container>
            <Grid xs={4}>
              <AlbumCover imgUrl={coverUrl} />
            </Grid>
            <Grid xs={8}>
              <Stack spacing={1} px={1} whiteSpace="nowrap" width="100%">
                <Typography variant="subtitle2" textOverflow="ellipsis" overflow="hidden">
                  {name}
                </Typography>
                <Stack>
                  <SongCollectionCardArtist label="作詞" artists={lyricsArtists} />
                  <SongCollectionCardArtist label="作曲" artists={musicArtists} />
                  <SongCollectionCardArtist label="編曲" artists={arrangementArtists} />
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
  artists: string[]
}

const SongCollectionCardArtist = ({ label, artists }: SongCollectionCardArtistProps) => {
  return (
    <>
      {artists.length > 0 && (
        <Typography variant="caption" textOverflow="ellipsis" overflow="hidden">
          {label}: {artists.join('/')}
        </Typography>
      )}
    </>
  )
}
