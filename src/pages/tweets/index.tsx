import { Box, FormControlLabel, FormGroup, MenuItem, Select, Stack, Switch, Typography } from '@mui/material'
import { useState } from 'react'
import Calendar, { CalendarTileProperties } from 'react-calendar'
// import 'react-calendar/dist/Calendar.css'
import { Meta } from '../../components/Meta'
import { NavBar } from '../../components/NavBar'
import { SiteName } from '../../const'
import theme from '../../theme'

const accounts = [
  { id: 'sendenbu_staff', name: '超ときめき♡宣伝部', since: new Date(2015, 4, 1) },
  { id: 'julia_an115', name: '杏ジュリア', since: new Date(2023, 0, 15) },
]

export default function YouTubePage() {
  const title = '先日の宣伝部'
  const description = '指定した日付のとき宣公式のツイートにアクセスするツール'
  const [date, setDate] = useState(new Date())
  const [account, setAccount] = useState(accounts[0].id)
  const [includeRTs, setIncludeRTs] = useState(true)

  const onChangeDate = (newDate: Date) => {
    const since = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
    const nextDay = new Date(newDate.getTime() + 60 * 60 * 24 * 1000)
    const until = `${nextDay.getFullYear()}-${nextDay.getMonth() + 1}-${nextDay.getDate()}`
    const query = `from%3A${account}%20since%3A${since}%20until%3A${until}${
      includeRTs ? '%20include:nativeretweets' : ''
    }`
    window?.open(`https://twitter.com/search?q=${query}&src=typed_query&f=live`)
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
            <Stack px={{ xs: 1, sm: 4, md: 8 }} spacing={2} py={2}>
              <Box display="flex" justifyContent="center">
                <Stack>
                  <Select
                    id="account"
                    value={account}
                    onChange={(e) => {
                      setAccount(e.target.value)
                    }}>
                    {accounts.map((a) => (
                      <MenuItem key={a.id} value={`${a.id}`}>
                        {a.name} (@{a.id})
                      </MenuItem>
                    ))}
                  </Select>
                  <FormGroup>
                    <FormControlLabel
                      label="リツイートも含む"
                      control={<Switch checked={includeRTs} onChange={() => setIncludeRTs(!includeRTs)} />}
                    />
                  </FormGroup>
                </Stack>
              </Box>
              <Box py={4} display="flex" justifyContent="center">
                <Calendar
                  minDate={accounts.filter((a) => a.id === account)[0].since}
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
        </Stack>
      </main>
    </>
  )
}
