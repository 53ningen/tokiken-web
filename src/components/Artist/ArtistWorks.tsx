import { Box, Card, CardActionArea, Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Link from '../../components/Link'
import { AlbumCover } from '../../components/Record/AlbumCover'
import { SongArtistRole, SongArtistSource } from '../../Database'
import theme from '../../theme'
import { SongArtistSourceAnnotation } from '../Song/SongArtistSourceLink'

export interface ArtistWorkItem {
  songName: string
  coverUrl: string
  creditTitle: string
  creditName: string
  source: SongArtistSource
  sourceUrl: string
  role: SongArtistRole
}

interface ArtistWorksProps {
  label: string
  items: ArtistWorkItem[]
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
          const { songName, coverUrl, creditTitle, creditName, source, sourceUrl, role } = i
          return (
            <Grid key={songName} xs={6} sm={4} md={3} lg={2}>
              <ArtistWork
                songName={songName}
                coverUrl={coverUrl}
                creditTitle={creditTitle}
                creditName={creditName}
                source={source}
                sourceUrl={sourceUrl}
                role={role}
              />
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  )
}

type ArtistWorkProps = ArtistWorkItem

const ArtistWork = ({ songName, coverUrl, creditTitle, creditName, source, sourceUrl }: ArtistWorkProps) => {
  return (
    <Card>
      <Stack pb={1}>
        <CardActionArea LinkComponent={Link} href={`/songs/${songName}`}>
          <Box>
            <AlbumCover imgUrl={coverUrl} />
            <Box display="flex" width="100%" pt={1} px={1}>
              <Stack whiteSpace="nowrap" width="100%">
                <Typography variant="subtitle2" textOverflow="ellipsis" overflow="hidden">
                  {songName}
                </Typography>
                <Typography variant="caption" color="textSecondary" textOverflow="ellipsis" overflow="hidden">
                  {creditTitle}
                </Typography>
                <Typography variant="caption" color="textSecondary" textOverflow="ellipsis" overflow="hidden">
                  {creditName}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </CardActionArea>
        <Typography px={1} variant="caption">
          <SongArtistSourceAnnotation source={source} sourceUrl={sourceUrl} />
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
