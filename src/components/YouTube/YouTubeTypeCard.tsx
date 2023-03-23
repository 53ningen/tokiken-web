import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import { BlankImageUrl } from '../../const'
import { YouTubeVideoType } from '../../spreadsheets'
import theme from '../../theme'
import Link from '../Link'
import { AlbumCover } from '../Record/AlbumCover'

interface YouTubeTypeCardProps {
  videoType: YouTubeVideoType
}

export const YouTubeTypeCard = ({ videoType }: YouTubeTypeCardProps) => {
  return (
    <Card elevation={0} variant="elevation" square>
      <Box>
        <CardActionArea LinkComponent={Link} href={`/youtube/types/${videoType.videoTypeId}`}>
          <Stack>
            <Box sx={{ backgroundColor: theme.palette.secondary.main }}>
              <AlbumCover imgUrl={BlankImageUrl} />
            </Box>
            <Stack p={1} position="absolute" width="100%" height="100%" textAlign="center" justifyContent="center">
              <Typography fontSize={{ xs: 50, lg: 40 }} pb={1}>
                {videoType.videoTypeIcon}
              </Typography>
            </Stack>
          </Stack>
        </CardActionArea>
        <Box display="flex" width="100%" p={0}>
          <Stack width="100%">
            <Typography fontSize={{ xs: 10, md: 12 }} variant="subtitle2">
              <Link color="inherit" href={`/youtube/types/${videoType.videoTypeId}`}>
                {videoType.videoTypeName} ({videoType.videoTypeCount})
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Card>
  )
}
