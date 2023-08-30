import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useState } from 'react'
import { CostumeImage } from '../../spreadsheets'
import Link from '../Link'
import { S3Image } from '../S3Image'

interface CostumeImagesProps {
  images: CostumeImage[]
}

export const CostumeImages = ({ images }: CostumeImagesProps) => {
  const [index, setIndex] = useState(0)
  return (
    <Stack spacing={2}>
      <Box display="flex" sx={{ width: '100%', aspectRatio: '1' }}>
        <S3Image
          key={images[index]?.costumeImageKeyM || 'noimage'}
          imgKey={
            images.length === 0 || images[index]?.costumeImageKeyM === ''
              ? 'noimage.png'
              : images[index].costumeImageKeyM
          }
          width="100%"
          height="100%"
        />
      </Box>
      <Typography variant="caption" textAlign="right">
        {images.length === 0 || images[index]?.costumeImageKeyM === '' ? (
          <Link href="https://docs.google.com/forms/d/1E3EOsHMNFk6R0BUHmUFy_e1NQdtucLMQ0TmKV7L0PKY/viewform">
            画像を提供する
          </Link>
        ) : (
          <>
            撮影: <Link href={images[index].costumeImageCreditUrl}>{images[index].costumeImageCredit}</Link>
          </>
        )}
      </Typography>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {images.map((image, i) => {
          return (
            <Grid key={i} xs={3} sm={2} md={3}>
              <Card>
                <Box position="relative">
                  {i === index && (
                    <Box
                      position="absolute"
                      width="100%"
                      height="100%"
                      sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', zIndex: 100 }}
                    />
                  )}
                  <CardActionArea>
                    <S3Image
                      imgKey={image.costumeImageKeyS === '' ? 'noimage.png' : image.costumeImageKeyS}
                      width="100%"
                      onClick={() => setIndex(i)}
                    />
                  </CardActionArea>
                </Box>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  )
}
