import DashboardIcon from '@mui/icons-material/Dashboard'
import TableRowsIcon from '@mui/icons-material/TableRows'
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Meta } from '../../components/Meta'
import { NavBar } from '../../components/NavBar'
import RecordEditionCollection from '../../components/Record/RecordEditionCollection'
import { RecordEditionTable } from '../../components/Record/RecordEditionTable'
import { TabPanel } from '../../components/TabPanel'
import { SiteName } from '../../const'
import { listRecordEditions, RecordEdition } from '../../spreadsheets'
import theme from '../../theme'

interface RecordsPageProps {
  editions: RecordEdition[]
}

const tabs = ['collection', 'table']

export default function RecordsPage({ editions }: RecordsPageProps) {
  const title = '超ときめき♡レコードデータベース'
  const description = '超ときめき♡宣伝部がリリースしたレコードのデータ'
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
      <Meta title={`${title} - ${SiteName}`} description={description} />
      <main>
        <Stack spacing={2}>
          <NavBar items={[{ path: '/records', title: 'レコードデータベース' }]} />
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
            <RecordEditionCollection records={editions} />
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <RecordEditionTable editions={editions} />
          </TabPanel>
        </Stack>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<RecordsPageProps> = async () => {
  const records = await listRecordEditions()
  return {
    props: {
      editions: records,
    },
  }
}
