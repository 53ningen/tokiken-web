import Grid from '@mui/material/Unstable_Grid2'
import { YouTubeChannel } from '../../spreadsheets'
import { YouTubeChannelCard } from './YouTubeChannelCard'

interface YouTubeChannelCollectionProps {
  channels: YouTubeChannel[]
}

export const YouTubeChannelCollection = ({ channels }: YouTubeChannelCollectionProps) => {
  return (
    <Grid container spacing={{ xs: 1, sm: 2 }} width="100%">
      {channels.map((channel) => {
        return (
          <Grid key={channel.channelId} xs={3} sm={2} lg={1}>
            <YouTubeChannelCard channel={channel} />
          </Grid>
        )
      })}
    </Grid>
  )
}
