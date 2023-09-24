import { Chip, Skeleton } from '@mui/material'
import { JSXElementConstructor, ReactElement } from 'react'
import { ISO8601toDateTimeString } from '../../const'

type Props = {
  icon?: ReactElement<any, string | JSXElementConstructor<any>> | undefined
  ISO8601String?: string
}

export const DateTimeChip = ({ icon, ISO8601String }: Props) => {
  const str = ISO8601toDateTimeString(ISO8601String)
  return (
    <Chip
      icon={icon}
      label={<span suppressHydrationWarning>{str}</span> || <Skeleton width="6rem" />}
      variant="outlined"
      size="small"
      sx={{ mr: 1, background: 'white' }}
    />
  )
}
