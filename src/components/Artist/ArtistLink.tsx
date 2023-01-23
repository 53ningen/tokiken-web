import { Credit } from '../../spreadsheets'
import Link from '../Link'

interface ArtistLinkProps {
  artist: Credit
}

export const ArtistLink = ({ artist }: ArtistLinkProps) => {
  return (
    <Link href={`/artists/${artist.artistId}`} mr={1}>
      {artist.creditName}
    </Link>
  )
}
