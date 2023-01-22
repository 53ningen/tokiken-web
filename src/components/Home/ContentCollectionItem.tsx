import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import { BlankImageUrl } from '../../const'
import theme from '../../theme'
import Link from '../Link'
import { AlbumCover } from '../Record/AlbumCover'

export interface ContentCollectionItem {
  icon: string
  title: string
  href?: string
  description?: string
}

type ContentCollectionItemProps = ContentCollectionItem

export const ContentCollectionItem = ({ title, href, icon, description }: ContentCollectionItemProps) => {
  return (
    <Card>
      <CardActionArea href={href || '#'} LinkComponent={Link} disabled={href === undefined}>
        <Stack>
          <Box sx={{ backgroundColor: theme.palette.secondary.main }}>
            <AlbumCover imgUrl={BlankImageUrl} />
          </Box>
          <Stack p={1} position="absolute" width="100%" height="100%" textAlign="center" justifyContent="center">
            <Typography fontSize={50} pb={description ? 0 : 3}>
              {icon}
            </Typography>
            {description && (
              <Typography variant="caption" fontSize={12} pb={4}>
                {description}
              </Typography>
            )}
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
