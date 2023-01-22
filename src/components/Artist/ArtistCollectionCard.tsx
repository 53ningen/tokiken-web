import { Box, Card, CardActionArea, Chip, Stack, Typography } from '@mui/material'
import { Artist } from '../../Database'
import Link from '../Link'

interface ArtistCollectionCardProps {
  artist: Artist
}

export const ArtistCollectionCard = ({ artist }: ArtistCollectionCardProps) => {
  return (
    <Card>
      <CardActionArea LinkComponent={Link} href={`/artists/${artist.artistName}`}>
        <Box height="100%" p={1} whiteSpace="nowrap" width="100%">
          <Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="subtitle2">{artist.artistName}</Typography>
              {artist.artistTwitter !== '' && (
                <Typography variant="caption" color="textSecondary">
                  @{artist.artistTwitter}
                </Typography>
              )}
            </Stack>
            <Typography variant="caption">{artist.artistKana}</Typography>
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
