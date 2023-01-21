import { Box, Card, CardActionArea, Chip, Stack, Typography } from '@mui/material'
import { Artist } from '../../Database'
import Link from '../Link'

interface ArtistCollectionCardProps {
  artist: Artist
}

export const ArtistCollectionCard = ({ artist }: ArtistCollectionCardProps) => {
  return (
    <Card>
      <CardActionArea LinkComponent={Link} href={`/artists/${artist.Name}`}>
        <Box height="100%" p={1} whiteSpace="nowrap" width="100%">
          <Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="subtitle2">{artist.Name}</Typography>
              {artist.Twitter !== '' && (
                <Typography variant="caption" color="textSecondary">
                  @{artist.Twitter}
                </Typography>
              )}
            </Stack>
            <Typography variant="caption">{artist.Kana}</Typography>
            <Stack direction="row" spacing={1} pt={1} height="2em" textOverflow="ellipsis" overflow="hidden">
              <ArtistTypeChip count={artist.LyricsCount} type="作詞" />
              <ArtistTypeChip count={artist.MusicCount} type="作曲" />
              <ArtistTypeChip count={artist.ArrangementCount} type="編曲" />
              <ArtistTypeChip count={artist.ProduceCount} type="制作" />
              <ArtistTypeChip count={artist.DanceCount} type="ダンス" />
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
