import { Box, Typography } from '@mui/material'
import { RecordType } from '../../Database'

interface RecordTypeChipProps {
  type: RecordType
}

export const RecordTypeChip = ({ type }: RecordTypeChipProps) => {
  const label = getLabel(type)
  return (
    <Box>
      <Typography component="span" sx={{ backgroundColor: 'black' }} px="8px" py="2px" variant="caption" color="white">
        {label}
      </Typography>
    </Box>
  )
}

const getLabel = (type: RecordType) => {
  switch (type) {
    case 'SINGLE':
      return 'SINGLE'
    case 'ALBUM':
      return 'ALBUM'
    case 'MINI_ALBUM':
      return 'MINI ALBUM'
  }
}
