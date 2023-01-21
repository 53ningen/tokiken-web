import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import { BlankImageUrl } from '../../const'
import theme from '../../theme'
import Link from '../Link'
import { AlbumCover } from '../Record/AlbumCover'

interface ContentCollectionItemProps {
  icon: JSX.Element
  title: string
  href?: string
}

export const ContentCollectionItem = ({ title, href, icon }: ContentCollectionItemProps) => {
  return (
    <Card>
      <CardActionArea href={href || '#'} LinkComponent={Link} disabled={href === undefined}>
        <Stack>
          <Box sx={{ backgroundColor: theme.palette.secondary.main }}>
            <AlbumCover imgUrl={BlankImageUrl} />
          </Box>
          <Stack p={1} position="absolute" width="100%" height="100%" textAlign="center" justifyContent="center">
            {icon}
          </Stack>
          <Typography
            p={0.5}
            variant="subtitle2"
            color={href ? theme.palette.primary.main : theme.palette.action.disabled}>
            {title}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  )
}
