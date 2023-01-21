import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { RecordEdition } from '../../Database'
import theme from '../../theme'
import { RecordEditionCollectionCard } from '../Record/RecordEditionCollectionCard'

interface SongRecordEditionListProps {
  editions: RecordEdition[]
}

export const SongRecordEditionList = ({ editions }: SongRecordEditionListProps) => {
  return (
    <>
      {editions.length > 0 && (
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          <Grid xs={12}>
            <Box sx={{ backgroundColor: theme.palette.grey[300] }}>
              <Typography p={1} variant="h4">
                収録レコード
              </Typography>
            </Box>
          </Grid>
          {editions.map((r) => {
            return (
              <Grid key={r.CatalogNumber} xs={6} sm={4} md={3} lg={2}>
                <Box>
                  <RecordEditionCollectionCard edition={r} />
                </Box>
              </Grid>
            )
          })}
        </Grid>
      )}
    </>
  )
}
