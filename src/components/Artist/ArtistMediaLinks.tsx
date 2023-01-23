import { Stack } from '@mui/material'
import { AiFillHome } from 'react-icons/ai'
import { FaInstagramSquare, FaTiktok, FaTwitterSquare, FaWikipediaW } from 'react-icons/fa'
import { Artist, hasValue } from '../../Database'
import theme from '../../theme'
import Link from '../Link'

interface ArtistMediaLinksProps {
  artist: Artist
}

export const ArtistMediaLinks = ({ artist }: ArtistMediaLinksProps) => {
  hasValue(artist.artistTwitter)
  return (
    <Stack direction="row" spacing={2} color={theme.palette.info.main}>
      <MediaLink
        value={artist.artistWikipediaSlug}
        href={`https://ja.wikipedia.org/wiki/${artist.artistWikipediaSlug}`}>
        <FaWikipediaW fontSize={30} />
      </MediaLink>
      <MediaLink value={artist.artistTwitter} href={`https://twitter.com/${artist.artistTwitter}`}>
        <FaTwitterSquare fontSize={30} />
      </MediaLink>
      <MediaLink value={artist.artistInstagram} href={`https://www.instagram.com/${artist.artistInstagram}`}>
        <FaInstagramSquare fontSize={30} />
      </MediaLink>
      <MediaLink value={artist.artistTikTok} href={`https://www.tiktok.com/@${artist.artistTikTok}`}>
        <FaTiktok fontSize={30} />
      </MediaLink>
      <MediaLink value={artist.artistWebsite} href={artist.artistWebsite}>
        <AiFillHome fontSize={28} />
      </MediaLink>
    </Stack>
  )
}

interface MediaLinkProps {
  value?: string
  href: string
  children: JSX.Element
}

const MediaLink = ({ value, href, children }: MediaLinkProps) => {
  return (
    <>
      {hasValue(value) && (
        <Link href={href} target="_blank" color="inherit">
          {children}
        </Link>
      )}
    </>
  )
}
