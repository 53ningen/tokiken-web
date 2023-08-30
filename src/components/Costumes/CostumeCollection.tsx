import { Box, Stack } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { Costume } from '../../spreadsheets'
import { CostumeCollectionCard } from './CostumeCollectionCard'

interface CostumeCollectionProps {
  costumes: Costume[]
}

export default function CostumeCollection({ costumes }: CostumeCollectionProps) {
  return (
    <Stack spacing={2} px={{ xs: 1, sm: 4, md: 8 }}>
      <Grid container spacing={{ xs: 1, sm: 2 }} width="100%">
        {costumes.map((c) => {
          return (
            <Grid key={c.costumeId} xs={6} sm={4} md={3} lg={3}>
              <Box>
                <CostumeCollectionCard costume={c} />
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  )
}
