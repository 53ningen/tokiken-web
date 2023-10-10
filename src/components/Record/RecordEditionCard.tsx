import { Box, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { RecordEditionDetail } from '../../pages/records/[id]'
import { RecordType } from '../../spreadsheets'
import { AmazonButton } from '../AmazonButton'
import Link from '../Link'
import { AlbumCover } from './AlbumCover'
import { ObjectTypeChip } from './RecordType'
import { TrackList } from './TrackList'

interface RecordEditionViewProps {
  item: RecordEditionDetail
}

export const RecordEditionView = ({ item }: RecordEditionViewProps) => {
  const discs = [...new Set(item.tracks.map((t) => t.disc).values())].sort().map((d) => {
    return item.tracks.filter((t) => t.disc === d)
  })
  return (
    <Box key={item.catalogNumber}>
      <Grid container rowSpacing={1} columnSpacing={2}>
        <Box id={item.catalogNumber} component="span" sx={{ marginTop: -8, paddingTop: 8 }} />
        <Grid xs={12} sm={4} md={4} lg={4}>
          <AlbumCover imgUrl={item.editionCoverUrl} href={item.editionProductUrl} />
          <AmazonButton asin={item.editionASIN} />
        </Grid>
        <Grid xs={12} sm={8} md={8} lg={8}>
          <Stack spacing={1}>
            <ObjectTypeChip label={getLabel(item.recordType)} />
            <Typography variant="h3">
              <Link href={`#${item.catalogNumber}`} color="inherit">
                {item.editionName}
              </Link>
            </Typography>
            <Stack direction="row" spacing={1}>
              {item.recordType !== 'DIGITAL' && <Typography variant="caption">{item.catalogNumber}</Typography>}
              <Typography variant="caption">{item.editionReleaseDate}</Typography>
              <Typography variant="caption">{item.editionPrice}</Typography>
            </Stack>
          </Stack>
          <Stack py={2}>
            {discs.map((disc, i) => {
              return <TrackList key={i} tracks={disc} />
            })}
          </Stack>
          <Stack>
            {item.editionCredits.map((c) => {
              return (
                <Typography key={c.creditTitle} variant="caption">
                  {c.creditTitle}
                  {c.creditName !== '' && `: ${c.creditName}`}
                </Typography>
              )
            })}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

const getLabel = (type: RecordType) => {
  switch (type) {
    case 'SINGLE':
      return 'SINGLE'
    case 'ALBUM':
      return 'ALBUM'
    case 'MINI_ALBUM':
      return 'MINI ALBUM'
    case 'DIGITAL':
      return 'DIGITAL'
  }
}
