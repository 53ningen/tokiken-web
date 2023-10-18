import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Modal, Stack, Typography } from '@mui/material'
import { AlbumItem } from '../../API'
import { CastChip } from '../CastChip'
import { S3Image } from '../S3Image'
import { getAlbumItemS3Key } from './PhotoUtil'

interface Props {
  item: AlbumItem
  open: boolean
  handleClose: () => void
}

export const PhotoViewer: React.FC<Props> = ({ item, open, handleClose }) => {
  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      sx={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      open={open}
      onClose={() => {
        handleClose()
      }}>
      <>
        <Box sx={{ backgroundColor: 'black', maxHeight: '100%' }}>
          <Box position="absolute">
            <IconButton aria-label="close" size="large" onClick={() => handleClose()}>
              <CloseIcon fontSize="inherit" color="info" />
            </IconButton>
          </Box>
          <Box>
            <S3Image imgKey={getAlbumItemS3Key(item)} style={{ maxHeight: '100vh', maxWidth: '100vw' }} />
          </Box>
        </Box>
        <Stack p={2} width="100%" position="absolute" sx={{ bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <Stack direction="row">
            {item.tags.map((t) => (
              <CastChip key={t} cast={t || ''} />
            ))}
          </Stack>
          <Typography color="white">{item.description}</Typography>
        </Stack>
      </>
    </Modal>
  )
}
