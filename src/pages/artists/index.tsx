import DashboardIcon from '@mui/icons-material/Dashboard'
import TableRowsIcon from '@mui/icons-material/TableRows'
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ArtistCollection from '../../components/Artist/ArtistCollection'
import { ArtistTable } from '../../components/Artist/ArtistTable'
import { Meta } from '../../components/Meta'
import { NavBar } from '../../components/NavBar'
import { TabPanel } from '../../components/TabPanel'
import { SiteName } from '../../const'
import { Artist, listArtists } from '../../Database'

interface ArtistsPageProps {
  artists: Artist[]
}

const tabs = ['collection', 'table']

export default function ArtistsPage({ artists }: ArtistsPageProps) {
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
  }
  return (
    <>
      <Meta title={`アーティストデータベース - ${SiteName}`} />
      <main>
        <Stack spacing={2}>
          <NavBar items={[{ path: '/artists', title: 'アーティストデータベース' }]} />
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
            <ArtistCollection artists={artists} />
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <ArtistTable artists={artists} />
          </TabPanel>
        </Stack>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<ArtistsPageProps> = async () => {
  try {
    const artists = await listArtists()
    return {
      props: {
        artists,
      },
    }
  } catch (e) {
    return {
      props: {
        artists: [],
      },
    }
  }
}
