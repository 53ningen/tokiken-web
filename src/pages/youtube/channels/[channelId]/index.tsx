import { GetStaticPaths, GetStaticProps } from 'next'
import { NumOfVideosPerPage } from '../../../../const'
import {
  getYouTubeChannel,
  listYouTubeChannels,
  listYouTubeVideos,
  YouTubeChannel,
  YouTubeVideo,
} from '../../../../spreadsheets'
import YouTubeChannelPage from './[page]'

interface YouTubeChannelHomePageProps {
  channel: YouTubeChannel
  videos: YouTubeVideo[]
  page: number
  totalPages: number
}

export default function YouTubeChannelHomePage({ channel, videos, page, totalPages }: YouTubeChannelHomePageProps) {
  return YouTubeChannelPage({ channel, videos, page, totalPages })
}

export const getStaticPaths: GetStaticPaths = async () => {
  const channels = await listYouTubeChannels()
  const channelIds = channels.map((c) => c.channelId)
  const paths = channelIds.map((channelId) => {
    return {
      params: {
        channelId,
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<YouTubeChannelHomePageProps> = async ({ params }) => {
  const channelId = params!.channelId as string
  const channel = await getYouTubeChannel(channelId)
  if (!channel) {
    throw Error(`channel not found: ${channelId}`)
  }
  const totalPages = Math.ceil(parseInt(channel.channelVideoCount) / NumOfVideosPerPage)
  const allVideos = await listYouTubeVideos()
  const videos = allVideos
    .filter((v) => v.channelId === channelId)
    .sort((a, b) => Date.parse(b.videoPublishedAt) - Date.parse(a.videoPublishedAt))
    .slice(0, NumOfVideosPerPage)
  return {
    props: {
      channel,
      videos,
      page: 1,
      totalPages,
    },
  }
}
