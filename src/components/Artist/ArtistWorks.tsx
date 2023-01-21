import { Box, Card, CardActionArea, Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Link from '../../components/Link'
import { AlbumCover } from '../../components/Record/AlbumCover'
import { SongArtistRole, SongArtistSource } from '../../Database'
import theme from '../../theme'

export interface ArtistWorkItem {
  songName: string
  coverUrl: string
  creditTitle: string
  creditName: string
  source: SongArtistSource
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
          const { songName, coverUrl, creditTitle, creditName, source, role } = i
          return (
            <Grid key={songName} xs={6} sm={4} md={3} lg={2}>
              <ArtistWork
                songName={songName}
                coverUrl={coverUrl}
                creditTitle={creditTitle}
                creditName={creditName}
                source={source}
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

const ArtistWork = ({ songName, coverUrl, creditTitle, creditName, source }: ArtistWorkProps) => {
  return (
    <Card>
      <CardActionArea LinkComponent={Link} href={`/songs/${songName}`}>
        <Box>
          <AlbumCover imgUrl={coverUrl} />
          <Box display="flex" width="100%" p={1}>
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
              <Typography variant="caption">{getSourceLabel(source)}</Typography>
            </Stack>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}

const getSourceLabel = (source: SongArtistSource) => {
  switch (source) {
    case 'BOOKLET':
      return '✅ ブックレット記載情報'
    case 'JASRAC':
      return '✅ JASRAC 登録情報'
    default:
      return '🎵 情報確認中'
  }
}
