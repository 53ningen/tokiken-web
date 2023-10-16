import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import { Costume } from '../../spreadsheets'
import Link from '../Link'
import { S3Image } from '../S3Image'
import { getCostumeImageObjectKey } from './CostumeImages'

interface CostumeCardProps {
  costume: Costume
}

export const CostumeCollectionCard = ({ costume }: CostumeCardProps) => {
  return (
    <Card>
      <CardActionArea LinkComponent={Link} href={`/costumes/${costume.costumeId}`}>
        <Box>
          <CostumeThumbnail imgKey={getCostumeImageObjectKey(costume.costumeImageKey, 300)} />
          <Box display="flex" width="100%" p={1}>
            <Stack whiteSpace="nowrap" width="100%">
              <Typography variant="subtitle2" textOverflow="ellipsis" overflow="hidden">
                {costume.costumeName}
              </Typography>
              <Typography variant="caption" textOverflow="ellipsis" overflow="hidden">
                デザイナー: {costume.costumeDesigner === '' ? '確認中' : costume.costumeDesigner}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}

interface CostumeThumbnailProps {
  imgKey: string
}

const CostumeThumbnail = ({ imgKey }: CostumeThumbnailProps) => {
  return (
    <Box
      display="flex"
      sx={{
        aspectRatio: '1',
        width: '100%',
        height: 'auto',
        maxWidth: '300px',
        maxHeight: '300px',
        display: 'block',
      }}>
      <S3Image
        width="100%"
        imgKey={imgKey === '' ? 'noimage.png' : imgKey}
        loading="lazy"
        style={{ aspectRatio: 1, objectFit: 'contain', backgroundColor: '#fff' }}
      />
    </Box>
  )
}
