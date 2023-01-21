import { Stack, Typography } from '@mui/material'
import { SiteCopyRight } from '../const'
import Link from './Link'

export const Footer = () => {
  return (
    <Stack spacing={2} minHeight={300} display="flex" alignItems="center" justifyContent="center">
      <Typography variant="caption">
        <Link href="/" color="inherit">
          {SiteCopyRight}
        </Link>
      </Typography>
      <Typography variant="caption">
        <Link href="https://twitter.com/gomi2ngen" color="inherit" target="_blank">
          管理者: @gomi2ngen
        </Link>
      </Typography>
    </Stack>
  )
}
