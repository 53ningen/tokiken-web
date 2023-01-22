import { Box, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { ContentCollectionItem } from './ContentCollectionItem'

interface ContentCollectionProps {
  collectionTitle: string
  collectionDescription: string
  items: ContentCollectionItem[]
}

export const ContentCollection = ({ items, collectionTitle, collectionDescription }: ContentCollectionProps) => {
  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h2">{collectionTitle}</Typography>
        <Typography variant="caption">{collectionDescription}</Typography>
      </Box>
      <Grid container spacing={2}>
        {items.map((i) => {
          return (
            <Grid xs={6} sm={4} key={i.title}>
              <ContentCollectionItem icon={i.icon} title={i.title} description={i.description} href={i.href} />
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  )
}
