import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'

import TwitterIcon from '@mui/icons-material/Twitter'
import { Box, Button, Card, CardActionArea, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { Tweet } from 'react-twitter-widgets'
import { CostumeInfo } from '../../spreadsheets'
import theme from '../../theme'
import Link from '../Link'

interface CostumeInfoItemProps {
  info: CostumeInfo
  lazyLoad?: boolean
}

export const CostumeInfoItem = ({ info, lazyLoad = false }: CostumeInfoItemProps) => {
  const [loaded, setLoaded] = useState(!lazyLoad)
  switch (info.costumeInfoType) {
    case 'twitter':
      const id = info.costumeInfoUrl.split('/').pop() || ''
      return lazyLoad && !loaded ? (
        <Card sx={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
          <CardActionArea LinkComponent={Link} href={info.costumeInfoUrl}>
            <Box p={2}>
              <Stack direction="row" spacing={2}>
                <TwitterIcon fontSize="large" />
                <Typography component="pre" whiteSpace="pre-wrap">
                  {info.costumeInfo}
                </Typography>
              </Stack>
            </Box>
          </CardActionArea>
          <Box p={2}>
            <Button variant="outlined" size="small" fullWidth onClick={() => setLoaded(true)}>
              ツイートを読み込む
            </Button>
          </Box>
        </Card>
      ) : (
        <Tweet tweetId={id} />
      )
    case 'instagram':
      return (
        <Card sx={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
          <CardActionArea LinkComponent={Link} href={info.costumeInfoUrl}>
            <Box p={2}>
              <Stack direction="row" spacing={2}>
                <InstagramIcon fontSize="large" />
                <Typography component="pre" whiteSpace="pre-wrap">
                  {info.costumeInfo}
                </Typography>
              </Stack>
            </Box>
          </CardActionArea>
          <Box p={2}>
            <Button variant="outlined" size="small" fullWidth onClick={() => setLoaded(true)}>
              instagram
            </Button>
          </Box>
        </Card>
      )
    case 'youtube':
      return (
        <Card sx={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
          <CardActionArea LinkComponent={Link} href={info.costumeInfoUrl}>
            <Box p={2}>
              <Stack direction="row" spacing={2}>
                <YouTubeIcon fontSize="large" />
                <Typography component="pre" whiteSpace="pre-wrap">
                  {info.costumeInfo}
                </Typography>
              </Stack>
            </Box>
          </CardActionArea>
        </Card>
      )
  }
}
