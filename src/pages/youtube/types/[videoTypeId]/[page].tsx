import { Box, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Meta } from '../../../../components/Meta'
import { NavBar } from '../../../../components/NavBar'
import { Pagination } from '../../../../components/Pagenation'
import { YouTubeVideoCollection } from '../../../../components/YouTube/YouTubeVideoCollection'
import { NumOfVideosPerPage, RevalidateYouTubeData, SiteName } from '../../../../const'
import {
  getYouTubeVideoType,
  listYouTubeVideos,
  listYouTubeVideoTypes,
  YouTubeVideo,
  YouTubeVideoType,
} from '../../../../spreadsheets'
import theme from '../../../../theme'

interface YouTubeTypePageProps {
  videoType: YouTubeVideoType
  videos: YouTubeVideo[]
  page: number
  totalPages: number
}

export default function YouTubeTypePage({ videoType, videos, page, totalPages }: YouTubeTypePageProps) {
  const title = '超ときめき♡YouTubeデータベース'
  const description = `「${videoType.videoTypeName}」の動画一覧`
  return (
    <>
      <Meta title={`${title} - ${SiteName}`} description={description} />
      <main>
        <Stack spacing={2}>
          <NavBar
            items={[
              { path: '/youtube', title: 'YouTubeデータベース' },
              { path: `/youtube/types/${videoType.videoTypeId}`, title: `${videoType.videoTypeName}` },
              { path: `/youtube/types/${videoType.videoTypeId}/${page}`, title: `ページ: ${page}` },
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
              basePath={`/youtube/types/${videoType.videoTypeId}`}
            />
          </Box>
        </Stack>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const videoTypes = await listYouTubeVideoTypes()
  const paths = videoTypes.flatMap((videoType) => {
    const numOfPages = Math.ceil(parseInt(videoType.videoTypeCount) / NumOfVideosPerPage)
    const pages = [...Array(numOfPages)].map((_, i) => i + 1)
    return pages.flatMap((p) => {
      return {
        params: {
          videoTypeId: videoType.videoTypeId,
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

export const getStaticProps: GetStaticProps<YouTubeTypePageProps> = async ({ params }) => {
  const videoTypeId = params!.videoTypeId as string
  const page = parseInt(params!.page as string)
  const videoType = await getYouTubeVideoType(videoTypeId)
  if (!videoType) {
    throw Error(`videoType not found: ${videoTypeId}`)
  }
  const totalPages = Math.ceil(parseInt(videoType.videoTypeCount) / NumOfVideosPerPage)
  const allVideos = await listYouTubeVideos()
  const videos = allVideos
    .filter((v) => v.videoTypeId === videoTypeId)
    .sort((a, b) => Date.parse(b.videoPublishedAt) - Date.parse(a.videoPublishedAt))
    .slice(NumOfVideosPerPage * (page - 1), NumOfVideosPerPage * page)
  return {
    props: {
      videoType,
      videos,
      page,
      totalPages,
      revalidate: RevalidateYouTubeData,
    },
  }
}
