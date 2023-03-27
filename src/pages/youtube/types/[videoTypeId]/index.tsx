import { GetStaticPaths, GetStaticProps } from 'next'
import { NumOfVideosPerPage, RevalidateYouTubeData } from '../../../../const'
import {
  getYouTubeVideoType,
  listYouTubeVideos,
  listYouTubeVideoTypes,
  YouTubeVideo,
  YouTubeVideoType,
} from '../../../../spreadsheets'
import YouTubeTypePage from './[page]'

interface YouTubeTypeHomePageProps {
  videoType: YouTubeVideoType
  videos: YouTubeVideo[]
  page: number
  totalPages: number
}

export default function YouTubeTypeHomePage({ videoType, videos, page, totalPages }: YouTubeTypeHomePageProps) {
  return YouTubeTypePage({ videoType, videos, page, totalPages })
}

export const getStaticPaths: GetStaticPaths = async () => {
  const videoTypes = await listYouTubeVideoTypes()
  const paths = videoTypes.map((videoType) => {
    return {
      params: {
        videoTypeId: videoType.videoTypeId,
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<YouTubeTypeHomePageProps> = async ({ params }) => {
  const videoTypeId = params!.videoTypeId as string
  const videoType = await getYouTubeVideoType(videoTypeId)
  if (!videoType) {
    throw Error(`videoType not found: ${videoTypeId}`)
  }
  const totalPages = Math.ceil(parseInt(videoType.videoTypeCount) / NumOfVideosPerPage)
  const allVideos = await listYouTubeVideos()
  const videos = allVideos
    .filter((v) => v.videoTypeId === videoTypeId)
    .sort((a, b) => Date.parse(b.videoPublishedAt) - Date.parse(a.videoPublishedAt))
    .slice(0, NumOfVideosPerPage)
  return {
    props: {
      videoType,
      videos,
      page: 1,
      totalPages,
    },
    revalidate: RevalidateYouTubeData,
  }
}
