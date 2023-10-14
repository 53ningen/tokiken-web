import { Box, Card, CardActionArea, Typography } from '@mui/material'
import { NoImageUrl } from '../../const'
import { EventInfo } from '../../spreadsheets'
import Link from '../Link'

interface Props {
  item: EventInfo
}

const numOfCharsInfo = 50

export const EventInfoItem = ({ item: i }: Props) => {
  return (
    <Card key={i.eventInfoUrl} style={{ textOverflow: 'ellipsis' }}>
      <CardActionArea LinkComponent={Link} href={i.eventInfoUrl}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width="100%"
          height="auto"
          alt={i.eventInfo}
          src={i.eventInfoThumbnail === '' ? NoImageUrl : i.eventInfoThumbnail}
          loading="lazy"
          style={{ minHeight: '100px', objectFit: 'cover', aspectRatio: 1 }}
        />
        <Box p={1}>
          <Typography variant="caption">
            {i.eventInfo.substring(0, 50)}
            {i.eventInfo.length > numOfCharsInfo ? '...' : ''}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}
