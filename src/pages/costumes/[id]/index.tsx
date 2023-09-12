import Edit from '@mui/icons-material/Edit'
import { Box, Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { GetStaticPaths, GetStaticProps } from 'next'
import { CostumeImages } from '../../../components/Costumes/CostumeImages'
import { CostumeInfoItem } from '../../../components/Costumes/CostumeInfoItem'
import Link from '../../../components/Link'
import { Meta } from '../../../components/Meta'
import { NavBar } from '../../../components/NavBar'
import { YouTubeVideoCard } from '../../../components/YouTube/YouTubeVideoCard'
import { SiteName } from '../../../const'
import { useAuth } from '../../../context/AuthContext'
import {
  Costume,
  CostumeImage,
  CostumeInfo,
  getCostume,
  listCostumeImages,
  listCostumeInfo,
  listCostumes,
  listYouTubeVideosByCostumeId,
  YouTubeVideo,
} from '../../../spreadsheets'
import theme from '../../../theme'

interface CostumesPageProps {
  costume: Costume
  info: CostumeInfo[]
  images: CostumeImage[]
  videos: YouTubeVideo[]
}

export default function CostumePage({ costume, info, images, videos }: CostumesPageProps) {
  const title = `超ときめき♡衣装データベース: ${costume.costumeName}`
  const description = `超ときめき♡宣伝部の衣装: ${costume.costumeName} のデータ`
  const { isLoggedIn, initialized } = useAuth()

  const designerComments = info
    .filter((i) => i.costumeInfoCategory === 'Designer')
    .sort((i, j) => i.costumeInfoOrder - j.costumeInfoOrder)
  const officialComments = info
    .filter((i) => i.costumeInfoCategory === 'Official')
    .sort((i, j) => i.costumeInfoOrder - j.costumeInfoOrder)
  return (
    <>
      <Meta title={`${title} - ${SiteName}`} description={description} />
      <main>
        <Stack spacing={2}>
          <NavBar
            items={[
              { path: '/costumes', title: '衣装データベース' },
              { path: '/costumes', title: costume.costumeName },
            ]}
          />
          <Paper elevation={0}>
            <Box px={{ xs: 1, sm: 4, md: 8 }}>
              <Grid container spacing={{ xs: 1, sm: 2 }}>
                <Grid xs={12} sm={12} md={6} lg={6}>
                  <CostumeImages images={images} />
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={6}>
                  <Stack spacing={4}>
                    <Stack>
                      <Typography variant="caption">
                        衣装呼称タイプ: {costume.costumeNameType === 'Official' ? '公式' : '非公式'}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="h2">{costume.costumeName}</Typography>
                        {initialized && isLoggedIn() && (
                          <Link href={`/costumes/${costume.costumeId}/edit`}>
                            <Edit fontSize="small" />
                          </Link>
                        )}
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="caption">
                          デザイナー:{' '}
                          {costume.costumeDesignerSource === '' ? (
                            costume.costumeDesigner === '' ? (
                              '調査中'
                            ) : (
                              costume.costumeDesigner
                            )
                          ) : (
                            <Link href={costume.costumeDesignerSource!}>{costume.costumeDesigner}</Link>
                          )}
                        </Typography>
                        {costume.costumeDesigner === '' && (
                          <Typography variant="caption">
                            [
                            <Link href="https://docs.google.com/forms/d/1E3EOsHMNFk6R0BUHmUFy_e1NQdtucLMQ0TmKV7L0PKY/viewform">
                              情報を提供する
                            </Link>
                            ]
                          </Typography>
                        )}
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="caption">
                          お披露目日: {costume.costumeDebutDate !== '' ? costume.costumeDebutDate : '調査中'}
                        </Typography>
                        {costume.costumeDebutDate === '' && (
                          <Typography variant="caption">
                            [
                            <Link href="https://docs.google.com/forms/d/1E3EOsHMNFk6R0BUHmUFy_e1NQdtucLMQ0TmKV7L0PKY/viewform">
                              情報を提供する
                            </Link>
                            ]
                          </Typography>
                        )}
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="caption">
                          お披露目イベント: {costume.costumeDebutEvent !== '' ? costume.costumeDebutEvent : '調査中'}
                        </Typography>
                        {costume.costumeDebutEvent === '' && (
                          <Typography variant="caption">
                            [
                            <Link href="https://docs.google.com/forms/d/1E3EOsHMNFk6R0BUHmUFy_e1NQdtucLMQ0TmKV7L0PKY/viewform">
                              情報を提供する
                            </Link>
                            ]
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                    {designerComments.length > 0 && (
                      <Stack>
                        <Box sx={{ backgroundColor: theme.palette.grey[300] }}>
                          <Typography p={1} variant="h4">
                            デザイナーコメント
                          </Typography>
                        </Box>
                        {designerComments.map((i) => {
                          return (
                            <CostumeInfoItem
                              key={`designer-${i.costumeInfoType}-${i.costumeInfoOrder}`}
                              info={i}
                              lazyLoad={i.costumeInfoOrder != 1}
                            />
                          )
                        })}
                      </Stack>
                    )}
                    {officialComments.length > 0 && (
                      <Stack>
                        <Box sx={{ backgroundColor: theme.palette.grey[300] }}>
                          <Typography p={1} variant="h4">
                            関連情報
                          </Typography>
                        </Box>
                        {officialComments.map((i) => {
                          return (
                            <CostumeInfoItem
                              key={`official-${i.costumeInfoType}-${i.costumeInfoOrder}`}
                              info={i}
                              lazyLoad={i.costumeInfoOrder != 1}
                            />
                          )
                        })}
                      </Stack>
                    )}
                    {videos.length > 0 && (
                      <Stack>
                        <Box sx={{ backgroundColor: theme.palette.grey[300] }}>
                          <Typography p={1} variant="h4">
                            関連 YouTube 動画
                          </Typography>
                        </Box>
                        <Grid container spacing={{ xs: 1, sm: 2 }}>
                          {videos.map((v) => {
                            return (
                              <Grid key={v.videoId} xs={6} sm={6} md={12} lg={6}>
                                <Box>
                                  <YouTubeVideoCard video={v} />
                                </Box>
                              </Grid>
                            )
                          })}
                        </Grid>
                      </Stack>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Stack>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const costumes = await listCostumes()
  const ids = costumes.map((a) => a.costumeId)
  const paths = ids.map((id) => {
    return {
      params: {
        id,
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<CostumesPageProps> = async ({ params }) => {
  const id = params!.id as string
  const costume = await getCostume(id)
  const info = await listCostumeInfo(id)
  const images = (await listCostumeImages(id)).sort((i) => i.costumeImageOrder)
  const videos = await listYouTubeVideosByCostumeId(id)
  if (!costume) {
    throw Error(`${id} not found`)
  }
  return {
    props: {
      costume,
      info,
      images,
      videos,
    },
  }
}
