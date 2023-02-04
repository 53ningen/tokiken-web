import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import Calendar, { CalendarTileProperties } from 'react-calendar'
// import 'react-calendar/dist/Calendar.css'
import { Meta } from '../../components/Meta'
import { NavBar } from '../../components/NavBar'
import { SiteName } from '../../const'
import theme from '../../theme'

export default function YouTubePage() {
  const title = '先日の宣伝部'
  const description = '指定した日付のとき宣公式のツイートにアクセスするツール'
  const [date, setDate] = useState(new Date())

  const onChangeDate = (newDate: Date) => {
    const since = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
    const until = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate() + 1}`
    window?.open(
      `https://twitter.com/search?q=from%3Asendenbu_staff%20since%3A${since}%20until%3A${until}&src=typed_query&f=live`
    )
    setDate(newDate)
  }
  const getEvents = ({ date, view }: CalendarTileProperties) => {
    if (view !== 'month') {
      return null
    }
    const d = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    const events = [{ date: '2015-5-1', eventName: 'とき宣Twitter開設日' }]
    return (
      <Box>
        <Typography variant="caption">{events.find((e) => e.date === d)?.eventName || null}</Typography>
      </Box>
    )
  }
  return (
    <>
      <Meta title={`${title} - ${SiteName}`} description={description} />
      <main>
        <Stack spacing={2}>
          <NavBar items={[{ path: '/tweets', title: '先日の宣伝部' }]} />
          <Stack textAlign="center" py={1}>
            <Typography variant="h3" color={theme.palette.primary.main}>
              {title}
            </Typography>
            <Typography variant="caption">{description}</Typography>
            <Box px={{ xs: 1, sm: 4, md: 8 }} py={4} display="flex" justifyContent="center">
              <Calendar
                minDate={new Date(2015, 4, 1)}
                maxDate={new Date()}
                locale={'en-US'}
                calendarType="ISO 8601"
                onChange={onChangeDate}
                value={date}
                tileContent={getEvents}
              />
            </Box>
          </Stack>
        </Stack>
      </main>
    </>
  )
}
