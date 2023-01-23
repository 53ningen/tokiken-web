import { Typography } from '@mui/material'
import { SongArtistSource } from '../../spreadsheets'
import Link from '../Link'

interface SongArtistSourceAnnotation {
  sourceUrl?: string
  source: SongArtistSource
}

export const SongArtistSourceAnnotation = ({ sourceUrl, source }: SongArtistSourceAnnotation) => {
  return (
    <Typography variant="caption">
      {sourceUrl && sourceUrl !== '' ? (
        <Link href={sourceUrl} target="_blank">
          {getSourceLabel(source)}
        </Link>
      ) : (
        getSourceLabel(source)
      )}
    </Typography>
  )
}

const getSourceLabel = (source: SongArtistSource) => {
  switch (source) {
    case 'BOOKLET':
      return '✅ ブックレット記載情報'
    case 'JASRAC':
      return '✅ JASRAC 登録情報'
    case 'EXTERNAL':
      return '✅ ウェブ記載情報'
    default:
      return '🎵 情報確認中'
  }
}
