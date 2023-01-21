import { Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { ContentCollectionItem } from './ContentCollectionItem'

export const ContentCollection = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={6} sm={4}>
        <ContentCollectionItem
          icon={
            <Typography fontSize={50} pb={3}>
              🎼
            </Typography>
          }
          title={'楽曲'}
          href="/songs"
        />
      </Grid>
      <Grid xs={6} sm={4}>
        <ContentCollectionItem
          icon={
            <Typography fontSize={50} pb={3}>
              💿
            </Typography>
          }
          title={'レコード'}
          href="/records"
        />
      </Grid>
      <Grid xs={6} sm={4}>
        <ContentCollectionItem
          icon={
            <Typography fontSize={50} pb={3}>
              🎤
            </Typography>
          }
          title={'アーティスト'}
          href="/artists"
        />
      </Grid>
      <Grid xs={6} sm={4}>
        <ContentCollectionItem
          icon={
            <Stack>
              <Typography fontSize={50}>🏟</Typography>
              <Typography variant="caption" fontSize={12} pb={4}>
                under construction
              </Typography>
            </Stack>
          }
          title={'イベント'}
        />
      </Grid>
      <Grid xs={6} sm={4}>
        <ContentCollectionItem
          icon={
            <Stack>
              <Typography fontSize={50}>👗</Typography>
              <Typography variant="caption" fontSize={12} pb={4}>
                under construction
              </Typography>
            </Stack>
          }
          title={'衣装'}
        />
      </Grid>
      <Grid xs={6} sm={4}>
        <ContentCollectionItem
          icon={
            <Stack>
              <Typography fontSize={50}>🗓</Typography>
              <Typography variant="caption" pb={4}>
                under construction
              </Typography>
            </Stack>
          }
          title={'年表'}
        />
      </Grid>
    </Grid>
  )
}
