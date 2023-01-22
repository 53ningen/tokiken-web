import { Stack, Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CountdownCollection } from '../../components/Countdown/CountdownCollection'
import { Meta } from '../../components/Meta'
import { NavBar } from '../../components/NavBar'
import { SiteName } from '../../const'
import { Event, listEvents } from '../../Database'
import theme from '../../theme'

interface CountdownProps {
  events: Event[]
}

export default function Countdown({ events }: CountdownProps) {
  const title = '超ときめき♡カウントダウン'
  const description = '超ときめき♡宣伝部のイベントへのカウントダウン'
  const upcomingEvents = events.filter((e) => Date.parse(e.eventDate) >= new Date().getTime())

  const [selectedEventId, setSelectedEventId] = useState<string>()
  const router = useRouter()
  const path = router.asPath
  useEffect(() => {
    ;(() => {
      const sharpSplited = path.split('#')
      if (sharpSplited.length < 2) {
        setSelectedEventId(undefined)
      } else {
        const id = sharpSplited[1].split('?')[0].toString()
        setSelectedEventId(id)
      }
    })()
  }, [path])
  return (
    <>
      <Meta title={`${title} - ${SiteName}`} description={description} />
      <main>
        <Stack spacing={2}>
          <NavBar items={[{ path: '/countdown', title: '超ときめき♡カウントダウン' }]} />
          <Stack textAlign="center" py={1}>
            <Typography variant="h3" color={theme.palette.primary.main}>
              {title}
            </Typography>
            <Typography variant="caption">{description}</Typography>
          </Stack>
          <CountdownCollection events={upcomingEvents} selectedEventId={selectedEventId} />
        </Stack>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<CountdownProps> = async () => {
  const events = await listEvents()
  return {
    props: {
      events,
    },
  }
}
