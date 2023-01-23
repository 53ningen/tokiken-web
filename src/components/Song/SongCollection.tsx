import { Box, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import { SongWithCreditsAndEditions } from '../../spreadsheets'
import theme from '../../theme'
import { CollectionIndex, createCollectionIndexMapping } from '../CollectionIndex'
import { SongCollectionCard } from './SongCollectionCard'

interface SongCollectionProps {
  items: SongWithCreditsAndEditions[]
}

export const SongCollection = ({ items }: SongCollectionProps) => {
  const index = createCollectionIndexMapping(
    items.map((i) => {
      return { name: i.songName, kana: i.songKana }
    })
  )
  return (
    <Stack spacing={1} px={{ xs: 1, sm: 4, md: 8 }}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
        <CollectionIndex mapping={index} />
      </Stack>
      <Grid container spacing={{ xs: 1, sm: 2 }} width="100%">
        {items.map((item) => {
          const i = index.get(item.songName)
          return (
            <React.Fragment key={item.songId}>
              {i && (
                <>
                  <Grid xs={12}>
                    {index.get(item.songName) && (
                      <Typography pt={1} pb={1} variant="h3" color={theme.palette.primary.main}>
                        <Box id={index.get(item.songName)} component="span" sx={{ marginTop: -8, paddingTop: 7 }} />
                        {index.get(item.songName)}
                      </Typography>
                    )}
                  </Grid>
                </>
              )}
              <Grid xs={12} sm={6} md={4}>
                <Box>
                  <SongCollectionCard item={item} />
                </Box>
              </Grid>
            </React.Fragment>
          )
        })}
      </Grid>
    </Stack>
  )
}
