import { Box, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { RecordEditionDetails, SongArtist } from '../../Database'
import Link from '../Link'
import { AlbumCover } from './AlbumCover'
import { TrackList } from './TrackList'

interface RecordEditionViewProps {
  details: RecordEditionDetails
  songArtists: SongArtist[]
}

export const RecordEditionView = ({ details, songArtists }: RecordEditionViewProps) => {
  return (
    <Box key={details.Edition.CatalogNumber}>
      <Grid container rowSpacing={1} columnSpacing={2}>
        <Box id={details.Edition.CatalogNumber} component="span" sx={{ marginTop: -8, paddingTop: 8 }} />
        <Grid xs={12} sm={4} md={4} lg={4}>
          <AlbumCover imgUrl={details.Edition.CoverUrl} href={details.Edition.AdUrl} />
        </Grid>
        <Grid xs={12} sm={8} md={8} lg={8}>
          <Stack>
            <Typography variant="h3">
              <Link href={`#${details.Edition.CatalogNumber}`} color="inherit">
                {details.Edition.Edition}
              </Link>
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="caption">{details.Edition.CatalogNumber}</Typography>
              <Typography variant="caption">{details.Edition.ReleaseDate}</Typography>
              <Typography variant="caption">{details.Edition.Price}</Typography>
            </Stack>
          </Stack>
          <Stack py={2}>
            {details.Discs.map((disc) => {
              return <TrackList key={disc.DiscNumber} disc={disc} songArtists={songArtists} />
            })}
          </Stack>
          <Stack>
            {details.Credits.map((c) => {
              return (
                <Typography key={c.CreditTitle} variant="caption">
                  {c.CreditTitle}
                  {c.Artist !== '' && `: ${c.Artist}`}
                </Typography>
              )
            })}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
