import { Box, Paper, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ArtistWorkItem, ArtistWorks } from '../../../components/Artist/ArtistWorks'
import Link from '../../../components/Link'
import { Meta } from '../../../components/Meta'
import { NavBar } from '../../../components/NavBar'
import { NoImageUrl, SiteName } from '../../../const'
import { Artist, getArtist, getSong, listArtists, listRecordEditions, listSongArtists } from '../../../Database'

interface ArtistPageProps {
  artist: Artist
  artistWorkItems: ArtistWorkItem[]
}

export default function ArtistPage({ artist, artistWorkItems }: ArtistPageProps) {
  const { artistName: name, artistKana: kana, artistTwitter: twitter, artistWikipediaSlug: wikipediaSlug } = artist
  const path = useRouter().asPath
  const lyricsItems = artistWorkItems.filter((i) => i.role === 'Lyrics')
  const musicItems = artistWorkItems.filter((i) => i.role === 'Music')
  const arrangementItems = artistWorkItems.filter((i) => i.role === 'Arrangement')
  const produceItems = artistWorkItems.filter((i) => i.role === 'Produce')
  const danceItems = artistWorkItems.filter((i) => i.role === 'Dance')
  const otherItems = artistWorkItems.filter((i) => i.role === 'Others')
  return (
    <>
      <Meta title={`${name} - ${SiteName}`} />
      <main>
        <Stack spacing={2}>
          <NavBar
            items={[
              { path: '/artists', title: 'アーティストデータベース' },
              { path: path, title: name },
            ]}
          />
          <Paper>
            <Box px={{ xs: 1, sm: 4, md: 8 }}>
              <Stack spacing={2}>
                <Stack>
                  <Typography variant="caption">{kana}</Typography>
                  <Typography variant="h2">{name}</Typography>
                </Stack>
                <Stack>
                  {wikipediaSlug !== '' && (
                    <Typography variant="caption">
                      <Link href={`https://ja.wikipedia.org/wiki/${wikipediaSlug}`} target="_blank">
                        Wikipedia
                      </Link>
                    </Typography>
                  )}
                  {twitter !== '' && (
                    <Typography variant="caption">
                      <Link href={`https://twitter.com/${twitter}`} target="_blank">
                        Twitter
                      </Link>
                    </Typography>
                  )}
                </Stack>
                <ArtistWorks label="作詞" items={lyricsItems} />
                <ArtistWorks label="作曲" items={musicItems} />
                <ArtistWorks label="編曲" items={arrangementItems} />
                <ArtistWorks label="制作" items={produceItems} />
                <ArtistWorks label="ダンス" items={danceItems} />
                <ArtistWorks label="その他" items={otherItems} />
              </Stack>
            </Box>
          </Paper>
        </Stack>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const artists = await listArtists()
  const names = artists.map((a) => a.artistName)
  const paths = names.map((name) => {
    return {
      params: {
        name,
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ArtistPageProps> = async ({ params }) => {
  const name = params!.name as string
  const artist = await getArtist(name)
  if (!artist) {
    throw Error(`${name} not found`)
  }
  const songArtists = (await listSongArtists()).filter((s) => s.Artist === name)
  const editions = await listRecordEditions()
  const artistWorkItems: ArtistWorkItem[] = []
  for (const a of songArtists) {
    const {
      Song: songName,
      CreditTitle: creditTitle,
      CreditName: creditName,
      Role: role,
      Source: source,
      SourceUrl: sourceUrl,
    } = a
    const song = await getSong(songName)
    const coverUrl =
      editions.find((e) => e.RecordName === song?.EarliestRecord && e.CoverUrl !== NoImageUrl)?.CoverUrl || NoImageUrl
    artistWorkItems.push({
      songName,
      coverUrl,
      creditTitle,
      creditName,
      role,
      source,
      sourceUrl,
    } as ArtistWorkItem)
  }
  return {
    props: {
      artist,
      artistWorkItems,
    },
  }
}
