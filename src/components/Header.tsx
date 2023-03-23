import { AppBar, Toolbar } from '@mui/material'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { SiteCopyRight } from '../const'
import Link from './Link'

export const Header = () => {
  return (
    <>
      <AppBar color="secondary" elevation={0} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth="lg" disableGutters>
          <Toolbar variant="dense">
            <Typography textAlign="center" variant="h3" flexGrow={1}>
              <Link href="/" color="white">
                <Image width={204} height={33} alt={SiteCopyRight} src="/logo.png" />
              </Link>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  )
}
