import SortIcon from '@mui/icons-material/Sort'
import { Box, Button, Card, Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React, { useEffect, useState } from 'react'
import { FaTwitter } from 'react-icons/fa'
import { TwitterShareButton } from 'react-share'
import { SiteUrl } from '../../const'
import { Event } from '../../spreadsheets'
import theme from '../../theme'
import Link from '../Link'

interface CountdownCollectionProps {
  events: Event[]
  selectedEventId?: string
}

type SortType = 'ASC' | 'DSCE'

export const CountdownCollection = ({ events: initEvents, selectedEventId }: CountdownCollectionProps) => {
  const [events, setEvents] = useState(initEvents)
  const [sort, setSort] = useState<SortType>('DSCE')
  const toggleSort = () => {
    setEvents([...events].reverse())
    setSort(sort === 'ASC' ? 'DSCE' : 'ASC')
  }

  const [now, setNow] = useState(new Date().getTime())
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date().getTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  return (
    <Stack spacing={2} px={{ xs: 1, sm: 4, md: 8 }}>
      <Box textAlign="right">
        <Button
          sx={{ ml: 2, height: 28 }}
          color="info"
          size="small"
          variant="contained"
          startIcon={<SortIcon />}
          onClick={toggleSort}>
          {sort === 'ASC' ? '開催日が近い順' : '開催日が遠い順'}
        </Button>
      </Box>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {events.map((e) => {
          return (
            <React.Fragment key={e.eventId}>
              <Box id={`${e.eventId}`} position="relative" mt={-8} pt={8} />
              <Grid xs={12} sm={6} md={4}>
                <CountdownCollectionItem dateNow={now} event={e} selected={e.eventId === selectedEventId} />
              </Grid>
            </React.Fragment>
          )
        })}
      </Grid>
    </Stack>
  )
}

interface CountdownCollectionItemProps {
  dateNow: number
  event: Event
  selected: boolean
}

const CountdownCollectionItem = ({ dateNow, event, selected }: CountdownCollectionItemProps) => {
  const { eventId, eventTitle, eventDate, eventStartTime, eventPlace, eventHashTag } = event
  const targetTime = eventStartTime && eventStartTime !== '' ? eventStartTime : '00:00'
  const targetDateTime = Date.parse(`${eventDate.replace(/["/"]/g, '-')}T${targetTime}+09:00`)
  const diff = targetDateTime - dateNow
  const dayRemains = Math.abs(Math.floor(diff / (24 * 60 * 60 * 1000))).toString()
  const hourRemains = Math.abs(Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))).toString()
  const minRemains = Math.abs(Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000))).toString()
  const secRemains = Math.abs(Math.floor((diff % (60 * 1000)) / 1000)).toString()
  const shareMessage = `${eventTitle} ${
    diff > 0 ? 'まで' : 'から'
  } ${dayRemains} 日と ${hourRemains} 時間 ${minRemains} 分 ${secRemains} 秒`
  const shareUrl = `${SiteUrl}/countdown#${eventId}`
  const shareHashtags =
    eventHashTag && eventHashTag !== '' ? [eventHashTag, '超ときめきカウントダウン'] : ['超ときめきカウントダウン']
  return (
    <Card>
      <Stack p={1} bgcolor={selected ? theme.palette.secondary.main : 'inherit'}>
        <Stack direction="row" spacing={1} whiteSpace="nowrap" width="100%">
          <Typography variant="caption">{eventDate}</Typography>
          {eventStartTime && eventStartTime !== '' && <Typography variant="caption">{eventStartTime}</Typography>}
          <Typography variant="caption" textOverflow="ellipsis" overflow="hidden">
            {eventPlace}
          </Typography>
        </Stack>
        <Stack width="100%">
          <Typography
            suppressHydrationWarning={true}
            height="3em"
            variant="subtitle2"
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}>
            <Link href={`#${eventId}`}>{eventTitle}</Link> {diff > 0 ? 'まで' : 'から'}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="baseline" justifyContent="center">
          <Typography fontSize={35} textAlign="center" pb={2} suppressHydrationWarning={true}>
            {dayRemains}
          </Typography>
          <Typography fontSize={15}>日</Typography>
          <Typography fontSize={35} textAlign="center" pb={2} suppressHydrationWarning={true}>
            {hourRemains}
          </Typography>
          <Typography fontSize={15}>時間</Typography>
          <Typography fontSize={35} textAlign="center" pb={2} suppressHydrationWarning={true}>
            {minRemains}
          </Typography>
          <Typography fontSize={15}>分</Typography>
          <Typography fontSize={35} textAlign="center" pb={2} suppressHydrationWarning={true}>
            {secRemains}
          </Typography>
          <Typography fontSize={15}>秒</Typography>
        </Stack>
        <Box textAlign="right" alignItems="center">
          <TwitterShareButton
            suppressHydrationWarning={true}
            title={shareMessage}
            url={shareUrl}
            hashtags={shareHashtags}>
            <Chip
              size="small"
              color="twitter"
              label={
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" minWidth="30px">
                  <FaTwitter size={12} />
                  {eventHashTag && eventHashTag !== '' && <Typography fontSize={12}>#{eventHashTag}</Typography>}
                </Stack>
              }
              sx={{ cursor: 'pointer' }}
            />
          </TwitterShareButton>
        </Box>
      </Stack>
    </Card>
  )
}
