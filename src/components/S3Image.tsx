import { Storage } from 'aws-amplify'
import { DetailedHTMLProps, FC, ImgHTMLAttributes, useEffect, useState } from 'react'

type S3ImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  imgKey?: string
  level?: 'public' | 'protected' | 'private'
}

export const S3Image: FC<S3ImageProps> = ({ imgKey, level, ...props }) => {
  const [signedUrl, setSignedUrl] = useState<string>()
  useEffect(() => {
    const getImage = async () => {
      if (imgKey) {
        const res = await Storage.get(imgKey, { level })
        setSignedUrl(res)
      }
    }
    getImage()
  }, [imgKey, level])
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
