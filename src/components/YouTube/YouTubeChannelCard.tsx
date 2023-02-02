import { Badge, Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import { YouTubeChannel } from '../../spreadsheets'
import Link from '../Link'

interface YouTubeChannelCardProps {
  channel: YouTubeChannel
}

export const YouTubeChannelCard = ({ channel }: YouTubeChannelCardProps) => {
  return (
    <Card elevation={0} square>
      <Box>
        <CardActionArea LinkComponent={Link} href={`/youtube/channels/${channel.channelId}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width="100%"
            height="auto"
            alt={channel.channelTitle}
            src={channel.channelThumbnailUrl}
            loading="lazy"
            style={{ minHeight: '80px', objectFit: 'contain' }}
          />
          <Badge
            badgeContent={channel.channelVideoCount}
            color="primary"
            style={{ position: 'absolute', margin: '16px', padding: '0 16px' }}
          />
        </CardActionArea>
        <Box display="flex" width="100%" p={0}>
          <Stack width="100%">
            <Typography fontSize={{ xs: 10, md: 12 }} variant="subtitle2">
              <Link color="inherit" href={`/youtube/channels/${channel.channelId}`}>
                {channel.channelTitle} ({channel.channelVideoCount})
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Card>
  )
}
