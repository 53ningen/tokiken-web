import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import { RecordEdition } from '../../Database'
import Link from '../Link'
import { AlbumCover } from './AlbumCover'

interface RecordCardProps {
  edition: RecordEdition
}

export const RecordEditionCollectionCard = ({ edition }: RecordCardProps) => {
  return (
    <Card>
      <CardActionArea
        LinkComponent={Link}
        href={`/records/${edition.RecordName.replace('/', ';')}#${edition.CatalogNumber}`}>
        <Box>
          <AlbumCover imgUrl={edition.CoverUrl} />
          <Box display="flex" width="100%" p={1}>
            <Stack whiteSpace="nowrap" width="100%">
              <Typography variant="subtitle2" textOverflow="ellipsis" overflow="hidden">
                {edition.RecordName}
              </Typography>
              <Typography variant="caption" textOverflow="ellipsis" overflow="hidden">
                {edition.Edition}
              </Typography>
              <Typography variant="caption" textOverflow="ellipsis" overflow="hidden">
                {edition.ReleaseDate}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}
