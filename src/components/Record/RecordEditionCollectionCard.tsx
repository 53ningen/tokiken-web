import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import { RecordEdition } from '../../spreadsheets'
import Link from '../Link'
import { AlbumCover } from './AlbumCover'

interface RecordCardProps {
  edition: RecordEdition
}

export const RecordEditionCollectionCard = ({ edition }: RecordCardProps) => {
  return (
    <Card>
      <CardActionArea LinkComponent={Link} href={`/records/${edition.recordId}#${edition.catalogNumber}`}>
        <Box>
          <AlbumCover imgUrl={edition.editionCoverUrl} />
          <Box display="flex" width="100%" p={1}>
            <Stack whiteSpace="nowrap" width="100%">
              <Typography variant="subtitle2" textOverflow="ellipsis" overflow="hidden">
                {edition.editionName}
              </Typography>
              <Typography variant="caption" textOverflow="ellipsis" overflow="hidden">
                {edition.editionName}
              </Typography>
              <Typography variant="caption" textOverflow="ellipsis" overflow="hidden">
                {edition.editionReleaseDate}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}
