import { Box, Paper, Stack, Typography } from '@mui/material'
import { Storage } from 'aws-amplify'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import { LoginButton } from '../../components/LoginButton'
import { Meta } from '../../components/Meta'
import { NavBar } from '../../components/NavBar'
import { SiteName } from '../../const'
import { useAuth } from '../../context/AuthContext'

export default function UploadPage() {
  const title = `超ときめき♡アップローダー`
  const description = `アップローダー`
  const { isLoggedIn, initialized } = useAuth()
  const uploadFile = async (f: File[]) => {
    const file = f[0]
    const fileId = `${uuidv4()}`
    const res = await Storage.put(`${file.name}`, file, {
      level: 'private',
      contentType: file.type,
    })
    return res.key
  }
  const [uploading, setUploading] = useState(false)
  const onDrop = useCallback(async (fs: File[]) => {
    try {
      setUploading(true)
      const tasks = fs.map((f) => uploadFile([f]))
      const keys = await Promise.all(tasks)
      keys.forEach((k) => console.log(k))
      window.alert('アップロード完了です！')
      setUploading(false)
    } catch (e) {
      console.error(e)
    } finally {
    }
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  return (
    <>
      <Meta title={`${title} - ${SiteName}`} description={description} />
      <main>
        <Stack spacing={2}>
          <NavBar items={[{ path: '/uploads', title: 'アップローダー' }]} />
          <Paper elevation={0}>
            <Box px={{ xs: 1, sm: 4, md: 8 }}>
              {initialized && isLoggedIn() ? (
                uploading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    height="500px"
                    border={1}
                    borderRadius={2}
                    borderColor="gray"
                    bgcolor="lightgray"
                    textAlign="center">
                    アップロード中です
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    height="500px"
                    {...getRootProps()}
                    border={1}
                    borderRadius={2}
                    borderColor="gray"
                    bgcolor="lightgray"
                    textAlign="center">
                    <input {...getInputProps()} />
                    <Typography p={4} variant="h1">
                      ここをクリックしてアップロードするファイルを選択
                    </Typography>
                  </Box>
                )
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="500px">
                  <LoginButton defaultUsername="guest@tokiken.com" />
                </Box>
              )}
            </Box>
          </Paper>
        </Stack>
      </main>
    </>
  )
}
