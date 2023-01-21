import { Box, Divider, List, ListItem, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { Disc, SongArtist } from '../../Database'
import theme from '../../theme'
import { ArtistLink } from '../Artist/ArtistLink'
import Link from '../Link'

interface TrackListProps {
  disc: Disc
  songArtists: SongArtist[]
}

export const TrackList = ({ disc, songArtists }: TrackListProps) => {
  const toArtistLink = (artist: SongArtist) => <ArtistLink key={artist.Artist} artist={artist} />
  return (
    <Box>
      <Box sx={{ backgroundColor: theme.palette.grey[300] }}>
        <Typography p={1} variant="h4">
          DISC {disc.DiscNumber}
        </Typography>
      </Box>
      <List sx={{ listStyleType: 'decimal', paddingLeft: 4 }}>
        {disc.Tracks.map((t) => {
          const as = songArtists.filter((a) => a.Song === t.SongName)
          const musicArtists = as.filter((a) => a.Role === 'Music').map((a) => toArtistLink(a))
          const arrangementArtists = as.filter((a) => a.Role === 'Arrangement').map((a) => toArtistLink(a))
          const lyricsArtists = as.filter((a) => a.Role === 'Lyrics').map((a) => toArtistLink(a))
          return (
            <Box key={`${disc.DiscNumber},${t.Track}`}>
              <ListItem sx={{ display: 'list-item', paddingRight: 0 }} dense>
                {t.SongName !== '' ? (
                  <Grid container>
                    <Grid xs={12} xl={4}>
                      <Typography variant="body1">
                        <Link href={`/songs/${t.SongName}`}>{t.TrackName}</Link>
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
                  <Typography variant="body1">{t.TrackName}</Typography>
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
