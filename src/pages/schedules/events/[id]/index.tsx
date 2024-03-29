import { Box, Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { GetStaticPaths, GetStaticProps } from 'next'
import { CastChip } from '../../../../components/CastChip'
import CostumeCollection from '../../../../components/Costumes/CostumeCollection'
import { EventCreditCard } from '../../../../components/Event/EventCreditCard'
import { EventInfoItem } from '../../../../components/Event/EventInfoItem'
import Link from '../../../../components/Link'
import { Meta } from '../../../../components/Meta'
import { NavBar } from '../../../../components/NavBar'
import { Markdown } from '../../../../components/Post/Markdown'
import { EventTypeChip } from '../../../../components/Record/RecordType'
import { SectionHeader } from '../../../../components/SectionHeader'
import { VideoList } from '../../../../components/VideoList'
import { RevalidateEvent, SiteName } from '../../../../const'
import {
  Costume,
  Event,
  EventCast,
  EventCredit,
  EventInfo,
  getEvent,
  getEventMemo,
  listCostumes,
  listEventCasts,
  listEventCostumes,
  listEventCredits,
  listEventInfo,
  listEvents,
  listYouTubeVideos,
  YouTubeVideo,
} from '../../../../spreadsheets'
import theme from '../../../../theme'

export interface EventDetail extends Event {
  relatedVideos?: YouTubeVideo[]
  costumes?: Costume[]
  credits?: EventCredit[]
  casts?: EventCast[]
  info?: EventInfo[]
  memo: string
}

interface EventPageProps {
  item: EventDetail
}

export default function EventPage({ item }: EventPageProps) {
  const title = `${item.eventTitle} - 超ときめき♡イベントデータベース`
  const description = '超ときめき♡宣伝部のイベントのデータ'
  const e = item
  return (
    <>
      <Meta title={`${title} - ${SiteName}`} description={description} />
      <main>
        <Stack spacing={2}>
          <NavBar items={[{ path: '/schedules', title: '超ときめき♡イベントデータベース' }]} />
          <Paper>
            <Box px={{ xs: 1, sm: 4, md: 8 }}>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <EventTypeChip type={e.eventType} />
                  <Typography variant="h2">{e.eventTitle}</Typography>
                  <Stack>
                    <Stack direction="row" spacing={1}>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="caption">日時:</Typography>
                        <Typography variant="caption">{e.eventDate.replaceAll('-', '/')}</Typography>
                      </Stack>
                      {e.eventStartTime !== '' && (
                        <Stack direction="row" spacing={1}>
                          <Typography variant="caption">{e.eventStartTime}</Typography>
                        </Stack>
                      )}
                    </Stack>
                    {e.eventPlace !== '' && (
                      <Stack direction="row" spacing={1}>
                        <Typography variant="caption">会場:</Typography>
                        <Typography variant="caption">
                          <Link href={`/schedules/places/${item.eventPlaceId}`}>{e.eventPlace}</Link>
                        </Typography>
                      </Stack>
                    )}
                    {e.eventHashTag !== '' && (
                      <Stack direction="row" spacing={1}>
                        <Typography variant="caption">ハッシュタグ:</Typography>
                        <Typography variant="caption">
                          <Link
                            href={`https://twitter.com/search?q=${encodeURIComponent(
                              `#${e.eventHashTag}`
                            )}&src=typed_query`}>
                            #{e.eventHashTag}
                          </Link>
                        </Typography>
                      </Stack>
                    )}
                    <Stack direction="row" flexWrap="wrap" rowGap={0.5}>
                      <Typography variant="caption" style={{ marginRight: theme.spacing(1) }}>
                        メンバー:
                      </Typography>
                      {item.casts?.map((c) => (
                        <CastChip key={c.eventCastName} cast={c.eventCastName} />
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
                {e.costumes && e.costumes.length > 0 && (
                  <>
                    <SectionHeader title="👗 着用した衣装" />
                    <CostumeCollection costumes={e.costumes} />
                  </>
                )}
                {e.credits && e.credits.length > 0 && (
                  <>
                    <SectionHeader title="👤 制作スタッフ" />
                    <Grid container spacing={{ xs: 1, sm: 2 }}>
                      {item.credits?.map((c) => {
                        return (
                          <Grid key={`${c.eventCreditTitle}${c.eventCreditName}`} xs={6} sm={4} md={3}>
                            <EventCreditCard item={c} />
                          </Grid>
                        )
                      })}
                    </Grid>
                  </>
                )}
                {e.relatedVideos && e.relatedVideos.length > 0 && (
                  <VideoList videos={e.relatedVideos} listTitle="📺 関連 YouTube 動画" />
                )}
                {item.info && item.info.length > 0 && (
                  <>
                    <SectionHeader title="🔗 関連ページ" />
                    <Grid container spacing={{ xs: 1, sm: 2 }}>
                      {item.info.map((i) => {
                        return (
                          <Grid key={i.eventInfoUrl} xs={6} sm={4} md={3}>
                            <EventInfoItem item={i} />
                          </Grid>
                        )
                      })}
                    </Grid>
                  </>
                )}
                {item.memo !== '' && (
                  <>
                    <SectionHeader title="🌏 その他" />
                    <Markdown body={item.memo} />
                  </>
                )}
              </Stack>
            </Box>
          </Paper>
        </Stack>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await listEvents()
  const ids = events.map((e) => e.eventId)
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

export const getStaticProps: GetStaticProps<EventPageProps> = async ({ params }) => {
  const id = params!.id as string
  const event = await getEvent(id)
  if (!event) {
    throw Error(`${id} not found`)
  }

  const credits = await listEventCredits(id)
  const casts = await listEventCasts(event!)
  const costumeIds = (await listEventCostumes(id)).map((c) => c.costumeId)
  const costumes = costumeIds.length > 0 ? (await listCostumes()).filter((c) => costumeIds.includes(c.costumeId)) : []
  const videos = (await listYouTubeVideos()).filter((v) => v.eventId === id)
  const info = await listEventInfo(id)
  const memo = (await getEventMemo(id))?.eventMemo
  return {
    props: {
      item: {
        ...event,
        relatedVideos: videos || [],
        costumes: costumes || [],
        credits: credits || [],
        casts: casts || [],
        info: info || [],
        memo: memo || '',
      },
    },
    revalidate: RevalidateEvent,
  }
}
