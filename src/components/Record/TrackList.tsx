import { Box, Divider, List, ListItem, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { Credit, TrackWithCredits } from '../../spreadsheets'
import theme from '../../theme'
import { ArtistLink } from '../Artist/ArtistLink'
import Link from '../Link'

interface TrackListProps {
  tracks: TrackWithCredits[]
}

export const TrackList = ({ tracks }: TrackListProps) => {
  const toArtistLink = (credit: Credit) => <ArtistLink key={credit.artistId} artist={credit} />
  return (
    <Box>
      <Box sx={{ backgroundColor: theme.palette.grey[300] }}>
        <Typography p={1} variant="h4">
          DISC {tracks[0].disc}
        </Typography>
      </Box>
      <List sx={{ listStyleType: 'decimal', paddingLeft: 4 }}>
        {tracks.map((t) => {
          const musicArtists = t.credits.filter((c) => c.creditRole === 'Music').map((a) => toArtistLink(a))
          const arrangementArtists = t.credits.filter((c) => c.creditRole === 'Arrangement').map((a) => toArtistLink(a))
          const lyricsArtists = t.credits.filter((c) => c.creditRole === 'Lyrics').map((a) => toArtistLink(a))
          return (
            <Box key={`${t.disc},${t.track}`}>
              <ListItem sx={{ display: 'list-item', paddingRight: 0 }} dense>
                {t.SongName !== '' ? (
                  <Grid container>
                    <Grid xs={12} xl={4}>
                      <Typography variant="body1">
                        <Link href={`/songs/${t.songId}`}>{t.trackName}</Link>
                      </Typography>
                    </Grid>
                    <Grid xs={12} xl={8}>
                      <Typography variant="caption">
                        {lyricsArtists.length > 0 && (
                          <>
                            <span>作詞: </span>
                            {lyricsArtists}
                          </>
                        )}
                        {musicArtists.length > 0 && (
                          <>
                            <span>作曲: </span>
                            {musicArtists}
                          </>
                        )}
                        {arrangementArtists.length > 0 && (
                          <>
                            <span>編曲: </span>
                            {arrangementArtists}
                          </>
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <Typography variant="body1">{t.trackName}</Typography>
                )}
              </ListItem>
              <Divider sx={{ marginLeft: -4 }} />
            </Box>
          )
        })}
      </List>
    </Box>
  )
}
