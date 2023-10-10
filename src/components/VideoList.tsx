import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { YouTubeVideo } from '../spreadsheets'
import theme from '../theme'
import { YouTubeVideoCard } from './YouTube/YouTubeVideoCard'

interface VideoListProps {
  listTitle: string
  videos: YouTubeVideo[]
}

export const VideoList = ({ listTitle, videos }: VideoListProps) => {
  return (
    <>
      {videos.length > 0 && (
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          <Grid xs={12}>
            <Box sx={{ backgroundColor: theme.palette.grey[300] }}>
              <Typography p={1} variant="h4">
                {listTitle}
              </Typography>
            </Box>
          </Grid>
          {videos.map((v) => {
            return (
              <Grid key={v.videoId} xs={12} sm={12} md={6} lg={4}>
                <Box>
                  <YouTubeVideoCard video={v} />
                </Box>
              </Grid>
            )
          })}
        </Grid>
      )}
    </>
  )
}
