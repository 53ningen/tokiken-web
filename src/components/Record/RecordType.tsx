import { Box, Typography } from '@mui/material'
import { EventType } from '../../spreadsheets'

interface ObjectTypeChipProps {
  label: string
}

export const ObjectTypeChip = ({ label }: ObjectTypeChipProps) => {
  return (
    <Box>
      <Typography component="span" sx={{ backgroundColor: 'black' }} px="8px" py="2px" variant="caption" color="white">
        {label}
      </Typography>
    </Box>
  )
}

interface EventTypeChipProps {
  type: EventType
}

export const EventTypeChip = ({ type }: EventTypeChipProps) => {
  return <ObjectTypeChip label={getEventLabel(type)} />
}

const getEventLabel = (type: EventType) => {
  switch (type) {
    case 'LIVE':
      return 'ライブ'
    case 'EVENT':
      return 'イベント'
    case 'BROADCAST':
      return '配信・放送'
    case 'OTHER':
    default:
      return 'その他'
  }
}
