import { Box, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Meta } from '../../../../components/Meta'
import { NavBar } from '../../../../components/NavBar'
import { Pagination } from '../../../../components/Pagenation'
import { YouTubeVideoCollection } from '../../../../components/YouTube/YouTubeVideoCollection'
import { NumOfVideosPerPage, SiteName } from '../../../../const'
import {
  getYouTubeChannel,
  listYouTubeChannels,
  listYouTubeVideos,
  YouTubeChannel,
  YouTubeVideo,
} from '../../../../spreadsheets'
import theme from '../../../../theme'

interface YouTubeChannelPageProps {
  channel: YouTubeChannel
  videos: YouTubeVideo[]
  page: number
  totalPages: number
}

export default function YouTubeChannelPage({ channel, videos, page, totalPages }: YouTubeChannelPageProps) {
  const title = '超ときめき♡YouTubeデータベース'
  const description = `「${channel.channelTitle}」の動画一覧`
  return (
    <>
      <Meta title={`${title} - ${SiteName}`} description={description} />
      <main>
        <Stack spacing={2}>
          <NavBar
            items={[
              { path: '/youtube', title: 'YouTubeデータベース' },
              { path: `/youtube/channels/${channel.channelId}`, title: `${channel.channelTitle}` },
              { path: `/youtube/channels/${channel.channelId}/${page}`, title: `ページ: ${page}` },
            ]}
          />
          <Stack textAlign="center" py={1}>
            <Typography variant="h3" color={theme.palette.primary.main}>
              {title}
            </Typography>
            <Typography variant="caption">{description}</Typography>
          </Stack>
          <YouTubeVideoCollection videos={videos} />
          <Box py={4}>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath={`/youtube/channels/${channel.channelId}`}
            />
          </Box>
        </Stack>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const channels = await listYouTubeChannels()
  const paths = channels.flatMap((channel) => {
    const numOfPages = Math.ceil(parseInt(channel.channelVideoCount) / NumOfVideosPerPage)
    const pages = [...Array(numOfPages)].map((_, i) => i + 1)
    return pages.flatMap((p) => {
      return {
        params: {
          channelId: channel.channelId,
          page: p.toString(),
        },
      }
    })
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<YouTubeChannelPageProps> = async ({ params }) => {
  const channelId = params!.channelId as string
  const page = parseInt(params!.page as string)
  const channel = await getYouTubeChannel(channelId)
  if (!channel) {
    throw Error(`channel not found: ${channelId}`)
  }
  const totalPages = Math.ceil(parseInt(channel.channelVideoCount) / NumOfVideosPerPage)
  const allVideos = await listYouTubeVideos()
  const videos = allVideos
    .filter((v) => v.channelId === channelId)
    .sort((a, b) => Date.parse(b.videoPublishedAt) - Date.parse(a.videoPublishedAt))
    .slice(NumOfVideosPerPage * (page - 1), NumOfVideosPerPage * page)
  return {
    props: {
      channel,
      videos,
      page,
      totalPages,
    },
  }
}
