import { List, ListItem, ListItemButton, Stack, Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import { EventItem } from '../../components/Event/EventItem'
import Link from '../../components/Link'
import { Meta } from '../../components/Meta'
import { NavBar } from '../../components/NavBar'
import { SectionHeader } from '../../components/SectionHeader'
import { RevalidateEventList, SiteName, TokisenRegimes } from '../../const'
import { Event, EventPlace, listEventPlaces, listEvents } from '../../spreadsheets'
import theme from '../../theme'

interface EventsPageProps {
  events?: Event[]
  places?: EventPlace[]
}

export default function EventsPage({ events, places }: EventsPageProps) {
  const title = '超ときめき♡イベントデータベース'
  const description = '超ときめき♡宣伝部のイベントのデータ'
  return (
    <>
      <Meta title={`${title} - ${SiteName}`} description={description} />
      <main>
        <Stack spacing={2}>
          <NavBar items={[{ path: '/schedules', title: '超ときめき♡イベントデータベース' }]} />
          <Stack textAlign="center" py={1}>
            <Typography variant="h3" color={theme.palette.primary.main}>
              {title}
            </Typography>
            <Typography variant="caption">{description}</Typography>
          </Stack>
          <SectionHeader title="🔍 イベント名から探す" />
          <List disablePadding>
            {events &&
              events.map((e) => {
                return <EventItem key={e.eventId} event={e} />
              })}
          </List>
          <SectionHeader title="🏟️ 会場名から探す" />
          <List disablePadding>
            {places &&
              places.map((p) => {
                return (
                  <ListItem key={p.eventPlaceId}>
                    <ListItemButton LinkComponent={Link} href={`/schedules/places/${p.eventPlaceId}`}>
                      <Stack>
                        <Stack direction="row" spacing={1}>
                          <Typography variant="caption">{p.eventPlaceRegion}</Typography>
                          <Typography variant="caption">{p.eventPlaceEventCount} イベント</Typography>
                        </Stack>
                        <Typography variant="subtitle1">{p.eventPlace}</Typography>
                      </Stack>
                    </ListItemButton>
                  </ListItem>
                )
              })}
          </List>
          <SectionHeader title="📅 カレンダーから探す" />
          <Typography>TODO</Typography>
        </Stack>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<EventsPageProps> = async () => {
  const events = (await listEvents())
    // 超とき宣のイベントのみをフィルタ
    .filter((e) => new Date(e.eventDate) >= new Date(TokisenRegimes[5].startDate))
  const places = await listEventPlaces()
  return {
    props: {
      events,
      places,
    },
    revalidate: RevalidateEventList,
  }
}
