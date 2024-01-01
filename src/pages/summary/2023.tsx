import { Box, Card, CardContent, Checkbox, Chip, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { Meta } from '../../components/Meta'
import { NavBar } from '../../components/NavBar'
import { SiteName } from '../../const'
import { events } from '../../lib/events'
import { places } from '../../lib/places'
import { Event, EventPlace } from '../../spreadsheets'
import theme from '../../theme'

interface Summary2023Props {
  events: Event[]
  places: EventPlace[]
}

const storageKey = `summary/2023`

const Summary2023 = ({ events, places }: Summary2023Props) => {
  const title = 'ときまとめ 2023'
  const description = '2023年の超ときめき♡宣伝部イベントの参加記録をまとめるツール'
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([])
  const [showResult, setShowResult] = useState<boolean>(false)
  const submit = () => {
    setShowResult(true)
  }
  const getResult = () => {
    const es = events.filter((e) => selectedEventIds.includes(e.eventId))
    const placeIds = es.map((e) => e.eventPlaceId)
    const ps = places
      .filter((p) => placeIds.includes(p.eventPlaceId))
      .filter((p, i, self) => self.findIndex((s) => s.eventPlaceId === p.eventPlaceId) === i)
    return {
      events: es,
      places: ps,
    }
  }
  useEffect(() => {
    ;(() => {
      const storage = localStorage.getItem(storageKey)
      if (storage) {
        const ids = JSON.parse(storage)
        setSelectedEventIds(ids)
      }
    })()
  }, [])
  return (
    <>
      <Meta title={`${title} - ${SiteName}`} description={description} />
      <main>
        <Stack spacing={2} textAlign="center">
          <NavBar items={[{ path: '/ocr', title: 'ときまとめ 2023' }]} />
          <Stack textAlign="center" py={1}>
            <Typography variant="h3" color={theme.palette.primary.main}>
              {title}
            </Typography>
            <Typography variant="caption">{description}</Typography>
          </Stack>
        </Stack>
        <Stack>
          <Box p={1}>
            <FormGroup>
              {events
                .sort(
                  (a, b) =>
                    Date.parse(`${a.eventDate}T${a.eventStartTime}`) - Date.parse(`${b.eventDate}T${b.eventStartTime}`)
                )
                .map((e) => {
                  const selected = selectedEventIds.includes(e.eventId)
                  return (
                    <FormControlLabel
                      key={e.eventId}
                      control={<Checkbox key={e.eventId} />}
                      label={<EventLabel event={e} />}
                      checked={selected}
                      onChange={() => {
                        const newIds = selected
                          ? selectedEventIds.filter((id) => id !== e.eventId)
                          : [...selectedEventIds, e.eventId]
                        setSelectedEventIds(newIds)
                        localStorage.setItem(storageKey, JSON.stringify(newIds))
                      }}
                    />
                  )
                })}
            </FormGroup>
            <Stack pt={4} spacing={2}>
              <Typography variant="h2">✈️ 2023年の参加イベントまとめ</Typography>
              <Result data={getResult()} />
            </Stack>
          </Box>
        </Stack>
      </main>
    </>
  )
}

const EventLabel = ({ event }: { event: Event }) => {
  return (
    <Stack>
      <Typography variant="caption">
        {event.eventDate.replace('2023-', '')} {event.eventStartTime} - {event.eventPlace}
      </Typography>
      <Typography variant="body2">{event.eventTitle}</Typography>
    </Stack>
  )
}

const Result = ({ data }: { data: { events: Event[]; places: EventPlace[] } }) => {
  const { events, places } = data
  const regions = places.map((p) => p.eventPlaceRegion).filter((p, i, self) => self.findIndex((s) => s === p) === i)
  const message = ``
  return (
    <Stack display="flex" spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip label="参加イベント数" variant="filled" color="tokisen" />
        <Typography variant="body1">{events.length} イベント（全64イベント）</Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip label="訪問した会場数" variant="filled" color="kanami" />
        <Typography variant="body1">{places.length} 会場（全47会場）</Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip label="訪問した地域数" variant="filled" color="hiyori" />
        <Typography variant="body1">{regions.length} 地域（全14都道府県+海外）</Typography>
      </Stack>
      <Typography variant="caption">訪問地域: {regions.sort().join(' ')}</Typography>
      <Card variant="outlined" style={{ whiteSpace: 'nowrap', overflowX: 'scroll' }}>
        <CardContent>
          <Stack>
            {events.map((e) => {
              return (
                <Typography key={e.eventId} variant="caption">
                  {e.eventDate.replace('2023-', '')} {e.eventTitle}
                </Typography>
              )
            })}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

export const getStaticProps: GetStaticProps<Summary2023Props> = async () => {
  return {
    props: {
      events,
      places,
    },
  }
}

export default Summary2023
