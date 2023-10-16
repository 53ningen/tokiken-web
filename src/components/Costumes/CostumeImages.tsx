import CloseIcon from '@mui/icons-material/Close'
import { Box, Card, CardActionArea, IconButton, Modal, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useEffect, useState } from 'react'
import { CostumeImage } from '../../spreadsheets'
import Link from '../Link'
import { S3Image } from '../S3Image'

export const getCostumeImageObjectKey = (costumeImageKey: string, size: 300 | 600 | 1024) => {
  return costumeImageKey === '' ? '' : `static/costumes/${costumeImageKey}@${size}.png`
}

interface CostumeImagesProps {
  images: CostumeImage[]
}

export const CostumeImages = ({ images }: CostumeImagesProps) => {
  const [index, setIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && index > 0) {
        setIndex(index - 1)
      }
      if (event.key === 'ArrowRight' && index < images.length - 1) {
        setIndex(index + 1)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })
  return (
    <>
      <Stack spacing={2}>
        <Box display="flex" sx={{ width: '100%', aspectRatio: '1', cursor: 'pointer' }}>
          <S3Image
            key={images[index]?.costumeImageKey || 'noimage'}
            imgKey={
              images.length === 0 || images[index]?.costumeImageKey === ''
                ? 'noimage.png'
                : getCostumeImageObjectKey(images[index].costumeImageKey, 600)
            }
            onClick={() => setModalOpen(!modalOpen)}
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '600px',
              maxHeight: '600px',
              display: 'block',
              aspectRatio: 1,
            }}
          />
        </Box>
        <Stack>
          {images[index] && (
            <Typography variant="caption" textAlign="right">
              {images[index].costumeImageDescription}
            </Typography>
          )}
          <Typography variant="caption" textAlign="right">
            {images.length === 0 || images[index]?.costumeImageKey === '' ? (
              <Link href="https://docs.google.com/forms/d/1E3EOsHMNFk6R0BUHmUFy_e1NQdtucLMQ0TmKV7L0PKY/viewform">
                画像を提供する
              </Link>
            ) : (
              <>
                撮影: <Link href={images[index].costumeImageCreditUrl}>{images[index].costumeImageCredit}</Link>
                {['草🌱', '超ときめき♡宣伝部'].includes(images[index].costumeImageCredit) ? <></> : ' さん'}
              </>
            )}
          </Typography>
        </Stack>
        {images.length > 1 && (
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            {images.map((image, i) => {
              return (
                <Grid key={i} xs={3} sm={2} md={3}>
                  <Card>
                    <Box position="relative">
                      {i === index && (
                        <Box
                          position="absolute"
                          sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            zIndex: 100,
                            width: '100%',
                            height: 'auto',
                            maxWidth: '600px',
                            maxHeight: '600px',
                            display: 'block',
                            aspectRatio: 1,
                          }}
                        />
                      )}
                      <CardActionArea>
                        <S3Image
                          imgKey={getCostumeImageObjectKey(image.costumeImageKey, 300)}
                          width="100%"
                          style={{
                            aspectRatio: 1,
                            objectFit: 'cover',
                            width: '100%',
                            height: 'auto',
                            maxWidth: '1024px',
                            maxHeight: '1024px',
                            display: 'block',
                          }}
                          onClick={() => setIndex(i)}
                        />
                      </CardActionArea>
                    </Box>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        )}
      </Stack>
      <Modal
        disableAutoFocus
        disableEnforceFocus
        sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
        }}>
        <Box sx={{ backgroundColor: 'black', maxHeight: '100%' }}>
          <Box position="absolute">
            <IconButton aria-label="close" size="large" onClick={() => setModalOpen(false)}>
              <CloseIcon fontSize="inherit" color="info" />
            </IconButton>
          </Box>
          <Box sx={{ aspectRatio: '1' }}>
            <S3Image
              key={images[index]?.costumeImageKey || 'noimage'}
              imgKey={
                images.length === 0 || images[index]?.costumeImageKey === ''
                  ? 'noimage.png'
                  : getCostumeImageObjectKey(images[index].costumeImageKey, 1024)
              }
              style={{ maxHeight: '100vh', maxWidth: '100vw' }}
            />
          </Box>
        </Box>
      </Modal>
    </>
  )
}
