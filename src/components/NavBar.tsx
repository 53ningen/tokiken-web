import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Box, Breadcrumbs, Typography } from '@mui/material'
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
        {items.map((item, index) => {
          return index < items.length - 1 ? (
            <Link key={item.path} href={item.path}>
              {item.title}
            </Link>
          ) : (
            <Typography key={item.path}>{item.title}</Typography>
          )
        })}
      </Breadcrumbs>
    </Box>
  )
}
