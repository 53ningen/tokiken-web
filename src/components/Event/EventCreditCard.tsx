import { Box, Card, CardActionArea, Typography } from '@mui/material'
import { EventCredit } from '../../spreadsheets'
import Link from '../Link'

export interface EventCreditCardProps {
  item: EventCredit
}

export const EventCreditCard = ({ item }: EventCreditCardProps) => {
  return (
    <Card>
      <CardActionArea LinkComponent={Link} href={item.eventCreditSource}>
        <Box p={1}>
          <Typography variant="caption">{item.eventCreditTitle}</Typography>
          <Typography>{item.eventCreditName}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}
