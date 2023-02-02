import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import { Locale } from '../../const'
import { YouTubeVideo } from '../../spreadsheets'
import Link from '../Link'

interface YouTubeVideoCardProps {
  video: YouTubeVideo
}

export const YouTubeVideoCard = ({ video }: YouTubeVideoCardProps) => {
  const publishedAt = new Date(video.videoPublishedAt).toLocaleDateString(Locale)
  const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`
  return (
    <Card elevation={0} square>
      <Box>
        <CardActionArea LinkComponent={Link} href={videoUrl} target="_blank">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width="100%"
            height="auto"
            alt={video.videoTitle}
            src={`http://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
            loading="lazy"
            style={{ minHeight: '100px', objectFit: 'contain' }}
          />
        </CardActionArea>
        <Box display="flex" width="100%" p={1}>
          <Stack whiteSpace="nowrap" width="100%">
            <Typography fontSize={12} variant="subtitle2" textOverflow="ellipsis" overflow="hidden">
              <Link color="inherit" href={videoUrl}>
                {video.videoTitle}
              </Link>
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="caption" textOverflow="ellipsis" overflow="hidden">
                {publishedAt}
              </Typography>
              <Typography variant="caption" textOverflow="ellipsis" overflow="hidden">
                <Link color="inherit" href={`/youtube/channels/${video.channelId}`}>
                  {video.channelTitle}
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Card>
  )
}
