import { Storage } from 'aws-amplify'
import { DetailedHTMLProps, FC, ImgHTMLAttributes, useEffect, useState } from 'react'
import Link from './Link'

type S3ImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  imgKey?: string
  level?: 'public' | 'protected' | 'private'
  enableLink?: boolean
}

export const S3Image: FC<S3ImageProps> = ({ imgKey, level, enableLink = false, ...props }) => {
  const [targetKey, setTargetKey] = useState<string>()
  const [signedUrl, setSignedUrl] = useState<string>()
  useEffect(() => {
    const now = new Date()
    const formattedTime = now.toISOString().slice(0, 13).replace(/[-:]/g, '')
    const expires = 3600 // 1 hour
    const storageKey = `images/${formattedTime}/${imgKey}`
    if (signedUrl && targetKey === storageKey) {
      return
    }
    const cachedUrl = sessionStorage.getItem(storageKey)
    if (cachedUrl) {
      setSignedUrl(cachedUrl)
      setTargetKey(storageKey)
      return
    }
    const getImage = async () => {
      if (imgKey) {
        const res = await Storage.get(imgKey, { level, expires })
        sessionStorage.setItem(storageKey, res)
        setSignedUrl(res)
        setTargetKey(storageKey)
      }
    }
    getImage()
  }, [imgKey, level, signedUrl, targetKey])
  if (signedUrl) {
    if (enableLink) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Link href={signedUrl}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={signedUrl} alt="" {...props} />
          </Link>
        </div>
      )
    } else {
      return (
        <div style={{ textAlign: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={signedUrl} alt="" {...props} />
        </div>
      )
    }
  } else {
    return <></>
  }
}
