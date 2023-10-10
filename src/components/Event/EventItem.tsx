import { ListItem, ListItemButton, Stack, Typography } from '@mui/material'
import { Event } from '../../spreadsheets'
import Link from '../Link'
import { EventTypeChip } from '../Record/RecordType'

interface EventItemProps {
  event: Event
}

export const EventItem = ({ event: e }: EventItemProps) => {
  return (
    <ListItem>
      <ListItemButton LinkComponent={Link} href={`/schedules/events/${e.eventId}`}>
        <Stack>
          <EventTypeChip type={e.eventType} />
          <Stack direction="row" spacing={1}>
            <Typography variant="caption">{e.eventDate}</Typography>
            <Typography variant="caption">{e.eventStartTime}</Typography>
            <Typography variant="caption">{e.eventPlace}</Typography>
          </Stack>
          <Typography variant="subtitle1">{e.eventTitle}</Typography>
        </Stack>
      </ListItemButton>
    </ListItem>
  )
}
