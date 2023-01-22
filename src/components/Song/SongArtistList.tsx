import { Box, Card, CardActionArea, Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { Artist, SongArtist } from '../../Database'
import theme from '../../theme'
import Link from '../Link'

export type SongArtistItem = Artist & SongArtist

interface SongArtistListProps {
  label: string
  artists: SongArtistItem[]
}

export const SongArtistList = ({ label, artists }: SongArtistListProps) => {
  return (
    <>
      {artists.length > 0 && (
        <Grid container spacing={1}>
          <Grid xs={12}>
            <Box sx={{ backgroundColor: theme.palette.grey[300] }}>
              <Typography p={1} variant="h4">
                {label}
              </Typography>
            </Box>
          </Grid>
          {artists.map((a) => {
            return (
              <Grid key={a.artistName} xs={12} sm={6} md={4} lg={3}>
                <SongArtistListItem artist={a} />
              </Grid>
            )
          })}
        </Grid>
      )}
    </>
  )
}

interface SongArtistListItemProps {
  artist: SongArtistItem
}

export const SongArtistListItem = ({ artist }: SongArtistListItemProps) => {
  return (
    <Card>
      <CardActionArea LinkComponent={Link} href={`/artists/${artist.artistName}`}>
        <Box height="100%" p={1} whiteSpace="nowrap" width="100%">
          <Stack>
            {artist.CreditTitle !== '' && (
              <Typography variant="caption" textOverflow="ellipsis" overflow="hidden">
                {artist.CreditTitle}
              </Typography>
            )}
            <Typography variant="subtitle2" textOverflow="ellipsis" overflow="hidden">
              {artist.CreditName}
            </Typography>
            <Stack direction="row" spacing={1} pt={1} height="2em" textOverflow="ellipsis" overflow="hidden">
              <ArtistTypeChip count={artist.artistLyricsCount} type="作詞" />
              <ArtistTypeChip count={artist.artistMusicCount} type="作曲" />
              <ArtistTypeChip count={artist.artistArrangementCount} type="編曲" />
              <ArtistTypeChip count={artist.artistProduceCount} type="制作" />
              <ArtistTypeChip count={artist.artistDanceCount} type="ダンス" />
            </Stack>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  )
}

interface ArtistTypeChipProps {
  count: string
  type: string
}

const ArtistTypeChip = ({ count, type }: ArtistTypeChipProps) => {
  return (
    <>{count && count !== '0' && <Chip color="info" label={`${type}: ${count}`} size="small" sx={{ height: 20 }} />}</>
  )
}
