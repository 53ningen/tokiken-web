import { Box, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import { Artist } from '../../Database'
import theme from '../../theme'
import { CollectionIndex, createCollectionIndexMapping } from '../CollectionIndex'
import { ArtistCollectionCard } from './ArtistCollectionCard'

interface ArtistCollectionProps {
  artists: Artist[]
}

export default function ArtistCollection({ artists }: ArtistCollectionProps) {
  const index = createCollectionIndexMapping(
    artists.map((a) => {
      return { Name: a.artistName, Kana: a.artistKana }
    })
  )
  return (
    <Stack spacing={1} px={{ xs: 1, sm: 4, md: 8 }}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
        <CollectionIndex mapping={index} />
      </Stack>
      <Grid container spacing={1} width="100%">
        {artists.map((a) => {
          const i = index.get(a.artistName)
          return (
            <React.Fragment key={a.artistName}>
              {i && (
                <Grid xs={12} zIndex={-999}>
                  {index.get(a.artistName) && (
                    <Box id={index.get(a.artistName)} mt={-4} pt={6}>
                      <Typography pt={1} pb={1} variant="h3" color={theme.palette.primary.main}>
                        {index.get(a.artistName)}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              )}
              <Grid xs={12} sm={6} md={4} lg={3}>
                <ArtistCollectionCard artist={a} />
              </Grid>
            </React.Fragment>
          )
        })}
      </Grid>
    </Stack>
  )
}
