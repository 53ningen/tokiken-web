import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import { YouTubeVideo } from '../../spreadsheets'
import Link from '../Link'

interface YouTubeVideoCardProps {
  video: YouTubeVideo
}

export const YouTubeVideoCard = ({ video }: YouTubeVideoCardProps) => {
  const publishedAt = new Date(video.videoPublishedAt).toLocaleDateString()
  return (
    <Card elevation={0} square>
      <CardActionArea LinkComponent={Link} href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank">
        <Box>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width="100%"
            height="auto"
            alt=""
            src={`http://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
            loading="lazy"
            style={{ objectFit: 'contain' }}
          />
          <Box display="flex" width="100%" p={1}>
            <Stack whiteSpace="nowrap" width="100%">
              <Typography variant="subtitle2" textOverflow="ellipsis" overflow="hidden">
                {video.videoTitle}
              </Typography>
              <Typography variant="caption" textOverflow="ellipsis" overflow="hidden">
                {publishedAt}
              </Typography>
              <Typography variant="caption" textOverflow="ellipsis" overflow="hidden">
                {video.channelTitle}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}
