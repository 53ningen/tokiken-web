import { Stack, Typography } from '@mui/material'
import { SiteCopyRight } from '../const'
import Link from './Link'
import { LoginButton } from './LoginButton'

export const Footer = () => {
  return (
    <Stack spacing={2} minHeight={300} display="flex" alignItems="center" justifyContent="center">
      <Typography variant="caption">
        <Link href="/" color="inherit">
          {SiteCopyRight}
        </Link>
      </Typography>
      <Stack direction="row" spacing={2}>
        <Typography variant="caption">
          <Link
            href="https://docs.google.com/forms/d/1E3EOsHMNFk6R0BUHmUFy_e1NQdtucLMQ0TmKV7L0PKY/viewform?pli=1&pli=1&edit_requested=true"
            color="inherit"
            target="_blank">
            Contact
          </Link>
        </Typography>
        <Typography variant="caption">
          <Link href="/privacy" color="inherit">
            Privacy Policy
          </Link>
        </Typography>
        <Typography variant="caption">
          <Link href="https://twitter.com/kusabure" color="inherit" target="_blank">
            Twitter
          </Link>
        </Typography>
      </Stack>
      <Typography variant="caption">
        <LoginButton />
      </Typography>
    </Stack>
  )
}
