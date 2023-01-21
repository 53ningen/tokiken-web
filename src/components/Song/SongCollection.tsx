import { Box, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import theme from '../../theme'
import { CollectionIndex, createCollectionIndexMapping } from '../CollectionIndex'
import { SongCollectionCard } from './SongCollectionCard'

export interface SongCollectionItem {
  name: string
  kana: string
  coverUrl: string
  lyricsArtists: string[]
  musicArtists: string[]
  arrangementArtists: string[]
}

interface SongCollectionProps {
  items: SongCollectionItem[]
}

export const SongCollection = ({ items }: SongCollectionProps) => {
  const index = createCollectionIndexMapping(
    // FIXME:
    items.map((i) => {
      return { Name: i.name, Kana: i.kana }
    })
  )
  return (
    <Stack spacing={1} px={{ xs: 1, sm: 4, md: 8 }}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
        <CollectionIndex mapping={index} />
      </Stack>
      <Grid container spacing={{ xs: 1, sm: 2 }} width="100%">
        {items.map((s) => {
          const { name, coverUrl, lyricsArtists, musicArtists, arrangementArtists } = s
          const i = index.get(name)
          return (
            <React.Fragment key={name}>
              {i && (
                <>
                  <Grid xs={12}>
                    {index.get(name) && (
                      <Typography pt={1} pb={1} variant="h3" color={theme.palette.primary.main}>
                        <Box id={index.get(name)} component="span" sx={{ marginTop: -8, paddingTop: 7 }} />
                        {index.get(name)}
                      </Typography>
                    )}
                  </Grid>
                </>
              )}
              <Grid xs={12} sm={6} md={4}>
                <Box>
                  <SongCollectionCard
                    name={name}
                    coverUrl={coverUrl}
                    lyricsArtists={lyricsArtists}
                    musicArtists={musicArtists}
                    arrangementArtists={arrangementArtists}
                  />
                </Box>
              </Grid>
            </React.Fragment>
          )
        })}
      </Grid>
    </Stack>
  )
}
