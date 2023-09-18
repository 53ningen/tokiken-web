import { Storage } from 'aws-amplify'
import { DetailedHTMLProps, FC, ImgHTMLAttributes, useEffect, useState } from 'react'

type S3ImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  imgKey?: string
  level?: 'public' | 'protected' | 'private'
}

export const S3Image: FC<S3ImageProps> = ({ imgKey, level, ...props }) => {
  const [signedUrl, setSignedUrl] = useState<string>()
  useEffect(() => {
    const now = new Date()
    const formattedTime = now.toISOString().slice(0, 13).replace(/[-:]/g, '')
    const expires = 3600 // 1 hour
    const storageKey = `images/${formattedTime}/${imgKey}`
    if (signedUrl) {
      return
    }
    const cachedUrl = sessionStorage.getItem(storageKey)
    if (cachedUrl) {
      setSignedUrl(cachedUrl)
      return
    }
    const getImage = async () => {
      if (imgKey && !signedUrl) {
        const res = await Storage.get(imgKey, { level, expires })
        sessionStorage.setItem(storageKey, res)
        setSignedUrl(res)
      }
    }
    getImage()
  }, [imgKey, level, signedUrl])
  return (
    <>
      {signedUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={signedUrl} alt="" {...props} />
      ) : (
        <></>
      )}
    </>
  )
}
