import Grid from '@mui/material/Unstable_Grid2'
import { YouTubeVideoType } from '../../spreadsheets'
import { YouTubeTypeCard } from './YouTubeTypeCard'

interface YouTubeTypeCollectionProps {
  videoTypes: YouTubeVideoType[]
}

export const YouTubeTypeCollection = ({ videoTypes }: YouTubeTypeCollectionProps) => {
  return (
    <Grid container spacing={{ xs: 1, sm: 2 }} width="100%">
      {videoTypes.map((videoType) => {
        return (
          <Grid key={videoType.videoTypeId} xs={3} sm={2} lg={1}>
            <YouTubeTypeCard videoType={videoType} />
          </Grid>
        )
      })}
    </Grid>
  )
}
