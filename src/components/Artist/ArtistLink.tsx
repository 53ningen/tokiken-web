import { SongArtist } from '../../Database'
import Link from '../Link'

interface ArtistLinkProps {
  artist: SongArtist
}

export const ArtistLink = ({ artist }: ArtistLinkProps) => {
  return (
    <Link href={`/artists/${artist.Artist}`} mr={1}>
      {artist.CreditName}
    </Link>
  )
}
