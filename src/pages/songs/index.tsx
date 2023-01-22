import DashboardIcon from '@mui/icons-material/Dashboard'
import TableRowsIcon from '@mui/icons-material/TableRows'
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Meta } from '../../components/Meta'
import { NavBar } from '../../components/NavBar'
import { SongCollection, SongCollectionItem } from '../../components/Song/SongCollection'
import { SongTable } from '../../components/Song/SongTable'
import { TabPanel } from '../../components/TabPanel'
import { NoImageUrl, SiteName } from '../../const'
import { listRecordEditions, listSongArtists, listSongs, RecordEdition, Song, SongArtist } from '../../Database'
import theme from '../../theme'

const inter = Inter({ subsets: ['latin'] })

interface RecordsPageProps {
  songs: Song[]
  songCollectionItems: SongCollectionItem[]
}

const tabs = ['collection', 'table']

export default function RecordsPage({ songs, songCollectionItems }: RecordsPageProps) {
  const title = '超ときめき♡楽曲データベース'
  const description = '超ときめき♡宣伝部の楽曲のデータ'
  const router = useRouter()
  const query = router.query
  const [currentTab, setCurrentTab] = useState(0)
  useEffect(() => {
    ;(() => {
      const initTabValue = tabs.findIndex((t) => t === query.display?.toString())
      setCurrentTab(initTabValue === -1 ? 0 : initTabValue)
    })()
  }, [query])
  const tabsOnChange = (index: number) => {
    router.push({
      query: { display: tabs[index] },
    })
    setCurrentTab(index)
  }
  return (
    <>
      <Meta title={`${title} - ${SiteName}`} description={description} />
      <main>
        <Stack spacing={2}>
          <NavBar items={[{ path: '/songs', title: '楽曲データベース' }]} />
          <Stack textAlign="center" py={1}>
            <Typography variant="h3" color={theme.palette.primary.main}>
              {title}
            </Typography>
            <Typography variant="caption">{description}</Typography>
          </Stack>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs variant="fullWidth" value={currentTab} onChange={(_, v) => tabsOnChange(v)}>
              <Tab
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <DashboardIcon />
                    <Typography>Collection</Typography>
                  </Stack>
                }
                sx={{ backgroundColor: 'white' }}
              />
              <Tab
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TableRowsIcon />
                    <Typography>Table</Typography>
                  </Stack>
                }
                sx={{ backgroundColor: 'white' }}
              />
            </Tabs>
          </Box>
          <TabPanel value={currentTab} index={0}>
            <SongCollection items={songCollectionItems} />
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <SongTable songs={songs} />
          </TabPanel>
        </Stack>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<RecordsPageProps> = async () => {
  const songs: Song[] = await listSongs()
  const editions: RecordEdition[] = await listRecordEditions()
  const songArtists: SongArtist[] = await listSongArtists()

  const songCollectionItems: SongCollectionItem[] = []
  for (const song of songs) {
    const { Name, Kana } = song
    const CoverUrl =
      editions.find((e) => e.RecordName === song.EarliestRecord && e.CoverUrl !== NoImageUrl)?.CoverUrl || NoImageUrl
    const artists = songArtists.filter((s) => s.Song === song.Name)
    const LyricsArtists = artists.filter((a) => a.Role === 'Lyrics').map((a) => a.CreditName)
    const MusicArtists = artists.filter((a) => a.Role === 'Music').map((a) => a.CreditName)
    const ArrangementArtists = artists.filter((a) => a.Role === 'Arrangement').map((a) => a.CreditName)
    songCollectionItems.push({
      name: Name,
      kana: Kana,
      coverUrl: CoverUrl,
      lyricsArtists: LyricsArtists,
      musicArtists: MusicArtists,
      arrangementArtists: ArrangementArtists,
    })
  }

  return {
    props: {
      songs,
      songCollectionItems,
    },
  }
}
