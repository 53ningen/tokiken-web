import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Box, Breadcrumbs } from '@mui/material'
import Link from './Link'

interface NavBarProps {
  items: { path: string; title: string }[]
}

const HomeTitle = '🏠'

export const NavBar = ({ items }: NavBarProps) => {
  return (
    <Box px={{ xs: 1, sm: 2 }} pt={2}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
        <Link href="/">{HomeTitle}</Link>
        {items.map((item) => {
          return (
            <Link key={item.path} href={item.path}>
              {item.title}
            </Link>
          )
        })}
      </Breadcrumbs>
    </Box>
  )
}
