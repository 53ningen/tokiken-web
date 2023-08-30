import PostAddIcon from '@mui/icons-material/PostAdd'
import { Box, Checkbox, FormControlLabel, FormGroup, IconButton, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { Storage } from 'aws-amplify'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import { Costume } from '../../spreadsheets'
import theme from '../../theme'
import { S3Image } from '../S3Image'

interface CostumeEditorProps {
  costume: Costume
}

export default function CostumeEditor({ costume }: CostumeEditorProps) {
  const [disabled, setDisabled] = useState(false)
  const [costumeNameType, setCostumeNameType] = useState(costume.costumeNameType)
  const [costumeName, setCostumeName] = useState(costume.costumeName)
  const [costumeDesigner, setCostumeDesigner] = useState(costume.costumeDesigner)
  const [costumeDesignerSource, setCostumeDesignerSource] = useState(costume.costumeDesignerSource)
  const [costumeDebutDate, setCostumeDebutDate] = useState(costume.costumeDebutDate)
  const [costumeDebutEvent, setCostumeDebutEvent] = useState(costume.costumeDebutEvent)
  const uploadFile = async (f: File[]) => {
    const file = f[0]
    const fileId = `${uuidv4()}`
    const res = await Storage.put(`costumes/${costume.costumeId}/${fileId}`, file, {
      level: 'public',
      contentType: file.type,
    })
    return res.key
  }
  const onDrop = useCallback(async (fs: File[]) => {
    try {
      const tasks = fs.map((f) => uploadFile([f]))
      const keys = await Promise.all(tasks)
      keys.forEach((k) => console.log(k))
    } catch (e) {
      console.error(e)
    } finally {
    }
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          id="title"
          label="Title"
          variant="outlined"
          disabled={disabled}
          sx={{ background: 'white' }}
          value={costumeName}
          onChange={(e) => setCostumeName(e.currentTarget.value)}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={costumeNameType === 'Official'}
                disabled={disabled}
                onChange={(_) => setCostumeNameType(costumeNameType === 'Official' ? 'Unofficial' : 'Official')}
              />
            }
            label={`呼称タイプ: ${costumeNameType}`}
          />
        </FormGroup>
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          id="title"
          label="Desiner"
          variant="outlined"
          disabled={disabled}
          sx={{ background: 'white' }}
          value={costumeDesigner}
          onChange={(e) => setCostumeDesigner(e.currentTarget.value)}
        />
        <TextField
          fullWidth
          id="title"
          label="DesinerSource"
          variant="outlined"
          disabled={disabled}
          sx={{ background: 'white' }}
          value={costumeDesignerSource}
          onChange={(e) => setCostumeName(e.currentTarget.value)}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          id="title"
          type="text"
          label="CostumeDebutDate"
          variant="outlined"
          disabled={disabled}
          sx={{ background: 'white' }}
          value={costumeDebutDate}
          onChange={(e) => setCostumeDebutDate(e.currentTarget.value)}
        />
        <TextField
          fullWidth
          id="title"
          label="CostumeDebutEvent"
          variant="outlined"
          disabled={disabled}
          sx={{ background: 'white' }}
          value={costumeDebutEvent}
          onChange={(e) => setCostumeDebutEvent(e.currentTarget.value)}
        />
      </Stack>
      <Stack spacing={2}>
        <Stack spacing={2}>
          <Box sx={{ backgroundColor: theme.palette.grey[300] }} display="flex">
            <Typography p={1} variant="h4" sx={{ flexGrow: 1 }}>
              フォトギャラリー
            </Typography>
            <IconButton href="/">
              <PostAddIcon />
            </IconButton>
          </Box>
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            <Grid key="hoge" xs={4} sm={4} md={3} lg={3}>
              <S3Image imgKey={costume.costumeThumbnailKey} />
            </Grid>
          </Grid>
          <Box
            width="100%"
            {...getRootProps()}
            border={1}
            borderRadius={2}
            borderColor="gray"
            bgcolor="lightgray"
            textAlign="center">
            <input {...getInputProps()} />
            <Typography p={4} variant="h1">
              Drop the files here
            </Typography>
          </Box>
        </Stack>
        <Stack>
          <Box sx={{ backgroundColor: theme.palette.grey[300] }} display="flex">
            <Typography p={1} variant="h4" sx={{ flexGrow: 1 }}>
              デザイナーコメント
            </Typography>
            <IconButton href="/">
              <PostAddIcon />
            </IconButton>
          </Box>
        </Stack>
        <Stack>
          <Box sx={{ backgroundColor: theme.palette.grey[300] }} display="flex">
            <Typography p={1} variant="h4" sx={{ flexGrow: 1 }}>
              関連公式情報
            </Typography>
            <IconButton href="/">
              <PostAddIcon />
            </IconButton>
          </Box>
        </Stack>
        <Stack>
          <Box sx={{ backgroundColor: theme.palette.grey[300] }} display="flex">
            <Typography p={1} variant="h4" sx={{ flexGrow: 1 }}>
              関連 YouTube 動画
            </Typography>
            <IconButton href="/">
              <PostAddIcon />
            </IconButton>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  )
}
