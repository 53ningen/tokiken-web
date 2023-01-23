import { Box, Card, CardActionArea, Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Link from '../../components/Link'
import { AlbumCover } from '../../components/Record/AlbumCover'
import { SongArtistSource, SongCreditWithEditionCoverUrl } from '../../spreadsheets'
import theme from '../../theme'
import { SongArtistSourceAnnotation } from '../Song/SongArtistSourceLink'

interface ArtistWorksProps {
  label: string
  items: SongCreditWithEditionCoverUrl[]
}

export const ArtistWorks = ({ label, items }: ArtistWorksProps) => {
  return (
    <Stack spacing={2}>
      <Grid xs={12} sx={{ backgroundColor: theme.palette.grey[300] }}>
        <Stack direction="row" alignItems="center">
          <Typography p={1} variant="h4">
            {label}
          </Typography>
          <Chip label={items.length} color="info" size="small" sx={{ width: 35, height: 18 }} />
        </Stack>
      </Grid>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {items.map((i) => {
          return (
            <Grid key={i.songId} xs={6} sm={4} md={3} lg={2}>
              <ArtistWork item={i} />
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  )
}

interface ArtistWorkProps {
  item: SongCreditWithEditionCoverUrl
}

const ArtistWork = ({ item }: ArtistWorkProps) => {
  return (
    <Card>
      <Stack pb={1}>
        <CardActionArea LinkComponent={Link} href={`/songs/${item.songId}`}>
          <Box>
            <AlbumCover imgUrl={item.editionCoverUrl} />
            <Box display="flex" width="100%" pt={1} px={1}>
              <Stack whiteSpace="nowrap" width="100%">
                <Typography variant="subtitle2" textOverflow="ellipsis" overflow="hidden">
                  {item.songName}
                </Typography>
                <Typography variant="caption" color="textSecondary" textOverflow="ellipsis" overflow="hidden">
                  {item.creditTitle}
                </Typography>
                <Typography variant="caption" color="textSecondary" textOverflow="ellipsis" overflow="hidden">
                  {item.creditName}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </CardActionArea>
        <Typography px={1} variant="caption">
          <SongArtistSourceAnnotation source={item.creditSource} sourceUrl={item.creditSourceUrl} />
        </Typography>
      </Stack>
    </Card>
  )
}

const getSourceLabel = (source: SongArtistSource) => {
  switch (source) {
    case 'BOOKLET':
      return '✅ ブックレット記載情報'
    case 'JASRAC':
      return '✅ JASRAC 登録情報'
    case 'EXTERNAL':
      return '✅ ウェブ記載情報'
    default:
      return '🎵 情報確認中'
  }
}
