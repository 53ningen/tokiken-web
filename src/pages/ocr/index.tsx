import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react'
import Tesseract from 'tesseract.js'
import { ErrorBanner } from '../../components/ErrorBanner'
import Link from '../../components/Link'
import { Meta } from '../../components/Meta'
import { NavBar } from '../../components/NavBar'
import { SectionHeader } from '../../components/SectionHeader'
import { SiteName } from '../../const'
import theme from '../../theme'

const canvasWidth = 300
const canvasHeight = 50
const storageKey = `ocr/serialcodes`
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

export default function OCRPage() {
  const title = '超ときめき♡シリアルコードリーダー'
  const description = '超ときめき♡宣伝部の CD をたくさん買った人のためのツール'

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [serialCodes, setSerialCodes] = useState<{ code: string; checked: boolean }[]>([])
  const [recognizing, setRecognizing] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [allowedCharacters, setAllowedCharacters] = useState('23456789abcdefghijklmnopqrstuvwxyz')
  const [targetStringLength, setTargetStringLength] = useState(12)
  const [codeEditorValue, setCodeEditorValue] = useState('')
  const [selectedCode, setSelectedCode] = useState('')

  useEffect(() => {
    const draw = (videoRef: RefObject<HTMLVideoElement>, canvasRef: RefObject<HTMLCanvasElement>) => {
      const video = videoRef.current
      const canvas = canvasRef.current
      if (video && canvas) {
        const context = canvas.getContext('2d')
        context?.drawImage(video, 100, 300, canvasWidth * 2, canvasHeight * 2, 0, 0, canvas.width, canvas.height)
      }
    }
    const configure = async () => {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        try {
          const obj = JSON.parse(stored)
          if (obj) {
            setSerialCodes(obj as { code: string; checked: boolean }[])
          }
        } catch (e) {
          localStorage.clear()
          window.alert(e)
        }
      }
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            width: 1920,
            height: 1080,
            facingMode: 'environment',
          },
        })
        videoRef.current.srcObject = stream
        while (true) {
          requestAnimationFrame(() => draw(videoRef, canvasRef))
          await sleep(100)
        }
      }
    }
    configure()
  }, [])
  const onCaptureButtonClick = async () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (video && canvas) {
      setRecognizing(true)
      try {
        const context = canvas.getContext('2d')
        context?.drawImage(video, 100, 300, canvasWidth * 2, canvasHeight * 2, 0, 0, canvas.width, canvas.height)
        const img = canvas.toDataURL('image/png')
        const worker = await Tesseract.createWorker('eng')
        worker.setParameters({ tessedit_char_whitelist: allowedCharacters })
        await worker.load()

        const result = await worker.recognize(img)
        const matchedStrings = result.data.text
          .split('\n')
          .map((s) => s.replaceAll(' ', ''))
          .filter((s) => s.length === targetStringLength)
        if (matchedStrings.length === 0) {
          window.alert('シリアルコードの読み取りに失敗しました')
        } else if (serialCodes.find((c) => c.code === matchedStrings[0])) {
          window.alert(`すでに読み取り済みのシリアルコードを検出: ${matchedStrings[0]}`)
        } else {
          const newSerialCodes = [{ code: matchedStrings[0], checked: false }, ...serialCodes]
          updateSerialCodes(newSerialCodes)
        }
        worker.terminate()
      } catch (e) {
        window.alert(`エラーが発生しました: ${e}`)
      } finally {
        setRecognizing(false)
      }
    }
  }
  const updateSerialCodes = (codes: { code: string; checked: boolean }[]) => {
    setSerialCodes(codes)
    localStorage.setItem(storageKey, JSON.stringify(codes))
  }
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error('Failed to copy text to clipboard:', error)
    }
  }
  return (
    <>
      <Meta title={`${title} - ${SiteName}`} description={description} />
      <main>
        <Stack spacing={2} textAlign="center">
          <NavBar items={[{ path: '/ocr', title: 'シリアルコードリーダー' }]} />
          <Stack textAlign="center" py={1}>
            <Typography variant="h3" color={theme.palette.primary.main}>
              {title}
            </Typography>
            <Typography variant="caption">{description}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} px={{ xs: 1, sm: 4, md: 8 }}>
          <Box>
            <ErrorBanner severity="warning" errorMessage="iPhone + Chrome 以外では動作しません" />
          </Box>
          <Box textAlign="center">
            <Typography variant="caption">シリアルコードを枠内におさめ「読み取り」ボタンを押す</Typography>
            <Box>
              <video ref={videoRef} id="video" style={{ display: 'none' }} controls autoPlay playsInline />
              <canvas ref={canvasRef} id="canvas" width={canvasWidth} height={canvasHeight} />
            </Box>
          </Box>
          <Stack direction="row" spacing={2}>
            <TextField
              label="シリアルコード文字種"
              value={allowedCharacters}
              type="text"
              fullWidth
              onChange={(e) => setAllowedCharacters(e.target.value)}
              size="small"
            />
            <TextField
              label="シリアルコード文字数"
              value={targetStringLength}
              type="number"
              fullWidth
              onChange={(e) => setTargetStringLength(parseInt(e.target.value))}
              size="small"
            />
          </Stack>
          <Button fullWidth variant="outlined" disabled={recognizing} onClick={onCaptureButtonClick}>
            {recognizing ? '読み取り中' : '読み取り'}
          </Button>
          <Box pt={4}>
            <SectionHeader title="🎁 読み取ったシリアルコード" />
            <Typography variant="caption">
              <ul style={{ paddingLeft: '2rem', marginBottom: 0 }}>
                <li>
                  「かわいいメモリアル」応募ページは
                  <Link href="https://avex.jp/cho-tokisen/kawaiimemorial/" target="_blank">
                    こちら
                  </Link>
                </li>
                <li>読み取りミスが発生しやすい文字は赤色で表示しています</li>
              </ul>
            </Typography>
          </Box>
          <List disablePadding>
            {serialCodes.map(({ code, checked }) => {
              return (
                <ListItem disablePadding key={code}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked}
                      onChange={() => {
                        const newSerialCodes = [
                          ...serialCodes.map((c) => (c.code === code ? { code, checked: !c.checked } : c)),
                        ]
                        updateSerialCodes(newSerialCodes)
                      }}
                    />
                  </ListItemIcon>
                  <ListItemButton
                    onClick={() => {
                      const newSerialCodes = [
                        ...serialCodes.map((c) => (c.code === code ? { code, checked: !c.checked } : c)),
                      ]
                      updateSerialCodes(newSerialCodes)
                      copyToClipboard(code)
                    }}>
                    <ListItemText primary={<SerialCodeText code={code} />} />
                  </ListItemButton>
                  <ListItemSecondaryAction>
                    <Stack direction="row">
                      <IconButton onClick={() => copyToClipboard(code)}>
                        <ContentCopyIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setCodeEditorValue(code)
                          setSelectedCode(code)
                          setDialogOpen(true)
                        }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          const newSerialCodes = [...serialCodes.filter((c) => c.code !== code)]
                          updateSerialCodes(newSerialCodes)
                        }}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
          <Button
            fullWidth
            variant="outlined"
            disabled={serialCodes.length === 0}
            onClick={() => {
              copyToClipboard(serialCodes.map((c) => c.code).join('\n'))
            }}>
            すべてのシリアルコードをコピー
          </Button>
          <Button
            fullWidth
            variant="contained"
            disabled={serialCodes.length === 0}
            onClick={() => {
              updateSerialCodes([])
            }}>
            すべてのシリアルコードをクリア
          </Button>
          <SerialEditDialog
            open={dialogOpen}
            value={codeEditorValue}
            onChangeValue={(e) => setCodeEditorValue(e.target.value)}
            onClose={() => {
              setDialogOpen(false)
            }}
            onUpdate={() => {
              const newSerialCodes = serialCodes.map((s) =>
                s.code === selectedCode ? { code: codeEditorValue, checked: s.checked } : s
              )
              updateSerialCodes(newSerialCodes)
              setDialogOpen(false)
            }}
          />
        </Stack>
      </main>
    </>
  )
}

interface SerialCodeTextProps {
  code: string
}

const coloredChars = ['0', 'o', '1', '7', 'i', 'j', 'l', '5', 's', '6', 'b', '9', 'q', 'g', 'u', 'v']

const SerialCodeText = ({ code }: SerialCodeTextProps) => {
  return (
    <>
      {Array.from(code).map((c) => {
        return coloredChars.includes(c) ? <span style={{ color: 'red' }}>{c}</span> : c
      })}
    </>
  )
}

interface SerialEditDialogProps {
  open: boolean
  value: string
  onChangeValue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onClose: () => void
  onUpdate: () => void
}

const SerialEditDialog = ({ open, value, onChangeValue, onClose, onUpdate }: SerialEditDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>シリアルコードの修正</DialogTitle>
      <DialogContent>
        <TextField
          value={value}
          autoFocus
          margin="dense"
          label="シリアルコード"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChangeValue}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  )
}
