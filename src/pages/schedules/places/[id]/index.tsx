import { Box, List, Paper, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import { EventItem } from '../../../../components/Event/EventItem'
import { Meta } from '../../../../components/Meta'
import { NavBar } from '../../../../components/NavBar'
import { RevalidateEventList, SiteName } from '../../../../const'
import { Event, EventPlace, getEventPlace, listEventPlaces, listEvents } from '../../../../spreadsheets'

interface EventPlacePageProps {
  place: EventPlace
  events: Event[]
}

export default function EventPage({ place, events }: EventPlacePageProps) {
  const title = `${place.eventPlace} - 超ときめき♡イベントデータベース`
  const description = '超ときめき♡宣伝部のイベントのデータ'
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
                  <Typography variant="caption">{place.eventPlaceKana}</Typography>
                  <Typography variant="h2">{place.eventPlace}</Typography>
                  <Stack>
                    <Stack direction="row" spacing={1}>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="caption">住所:</Typography>
                        <Typography variant="caption">{place.eventPlaceAddress}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                <List disablePadding>
                  {events.map((e) => {
                    return <EventItem key={e.eventId} event={e} />
                  })}
                </List>
              </Stack>
            </Box>
          </Paper>
        </Stack>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await listEventPlaces()
  const ids = events.map((e) => e.eventPlaceId)
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

export const getStaticProps: GetStaticProps<EventPlacePageProps> = async ({ params }) => {
  const eventPlaceId = params!.id as string
  const place = await getEventPlace(eventPlaceId)
  if (!place) {
    throw Error(`${eventPlaceId} not found`)
  }
  const events = (await listEvents()).filter((e) => e.eventPlaceId === eventPlaceId)
  return {
    props: {
      place,
      events: events,
    },
    revalidate: RevalidateEventList,
  }
}
