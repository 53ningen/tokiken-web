import { Stack, Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import { Meta } from '../../components/Meta'
import { NavBar } from '../../components/NavBar'
import { SectionHeader } from '../../components/SectionHeader'
import { YouTubeChannelCollection } from '../../components/YouTube/YouTubeChannelCollection'
import { YouTubeTypeCollection } from '../../components/YouTube/YouTubeTypeCollection'
import { SiteName } from '../../const'
import { listYouTubeChannels, listYouTubeVideoTypes, YouTubeChannel, YouTubeVideoType } from '../../spreadsheets'
import theme from '../../theme'

interface YouTubePageProps {
  channels: YouTubeChannel[]
  videoTypes: YouTubeVideoType[]
}

export default function YouTubePage({ channels, videoTypes }: YouTubePageProps) {
  const title = '超ときめき♡YouTubeデータベース'
  const description = '超ときめき♡宣伝部関連のYouTube動画のデータ'
  return (
    <>
      <Meta title={`${title} - ${SiteName}`} description={description} />
      <main>
        <Stack spacing={2}>
          <NavBar items={[{ path: '/youtube', title: 'YouTubeデータベース' }]} />
          <Stack textAlign="center" py={1}>
            <Typography variant="h3" color={theme.palette.primary.main}>
              {title}
            </Typography>
            <Typography variant="caption">{description}</Typography>
          </Stack>
          <Stack spacing={2} px={{ xs: 1, sm: 4, md: 8 }}>
            <SectionHeader title="📺 チャンネルから探す" />
            <YouTubeChannelCollection channels={channels} />
          </Stack>
          <Stack spacing={2} px={{ xs: 1, sm: 4, md: 8 }}>
            <SectionHeader title="🏷 動画のタイプから探す" />
            <YouTubeTypeCollection videoTypes={videoTypes} />
          </Stack>
        </Stack>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<YouTubePageProps> = async () => {
  const channels = await listYouTubeChannels()
  const videoTypes = await listYouTubeVideoTypes()
  return {
    props: {
      channels,
      videoTypes,
    },
  }
}
