import { NoImageUrl } from '../../const'
import Link from '../Link'

const ASSOCIATE_ID = process.env.NEXT_PUBLIC_ASSOCIATE_ID

interface AlbumCoverProps {
  imgUrl?: string
  href?: string
}

export const AlbumCover = ({ imgUrl, href }: AlbumCoverProps) => {
  return href && href !== '' ? (
    <Link href={href} target="_blank">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        width="100%"
        alt=""
        src={imgUrl || NoImageUrl}
        loading="lazy"
        style={{ aspectRatio: 1, objectFit: 'contain' }}
      />
    </Link>
  ) : (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      width="100%"
      alt=""
      src={imgUrl || NoImageUrl}
      loading="lazy"
      style={{ aspectRatio: 1, objectFit: 'contain' }}
    />
  )
}
