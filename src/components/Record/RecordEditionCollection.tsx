import SortIcon from '@mui/icons-material/Sort'
import { Box, Button, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useState } from 'react'
import { RecordEdition } from '../../spreadsheets'
import { RecordEditionCollectionCard } from './RecordEditionCollectionCard'

interface RecordEditionCollectionProps {
  records: RecordEdition[]
}

type SortType = 'ASC' | 'DSCE'
type FilterType = 'NONE' | 'SINGLE' | 'ALBUM' | 'MINI_ALBUM'

export default function RecordEditionCollection({ records: data }: RecordEditionCollectionProps) {
  const [records, setRecords] = useState(data)
  const [sort, setSort] = useState<SortType>('ASC')
  const [filter, setFilter] = useState<FilterType>('NONE')

  const toggleSort = () => {
    setRecords([...records].reverse())
    setSort(sort === 'ASC' ? 'DSCE' : 'ASC')
  }
  const changeFilter = (nextFilter?: FilterType) => {
    if (!nextFilter) {
      return
    }
    let filtered: RecordEdition[] = []
    switch (nextFilter) {
      case 'SINGLE':
        filtered = data.filter((d) => d.recordType === nextFilter)
        break
      case 'ALBUM':
        filtered = data.filter((d) => d.recordType === 'ALBUM' || d.recordType === 'MINI_ALBUM')
        break
      case 'NONE':
        filtered = data
        break
    }
    const sorted = [...filtered].sort(
      (a, b) =>
        (new Date(a.editionReleaseDate).getTime() - new Date(b.editionReleaseDate).getTime()) *
        (sort === 'ASC' ? 1 : -1)
    )
    setRecords(sorted)
    setFilter(nextFilter)
  }
  return (
    <Stack spacing={2} px={{ xs: 1, sm: 4, md: 8 }}>
      <Box textAlign="right">
        <ToggleButtonGroup
          value={filter}
          exclusive
          color="info"
          size="small"
          sx={{ backgroundColor: 'white', height: 30, p: 0 }}
          onChange={(_, next) => changeFilter(next)}>
          <ToggleButton value="NONE" aria-label="left aligned">
            ALL
          </ToggleButton>
          <ToggleButton value="SINGLE">SINGLE</ToggleButton>
          <ToggleButton value="ALBUM">ALBUM</ToggleButton>
        </ToggleButtonGroup>
        <Button
          sx={{ ml: 2, height: 28 }}
          color="info"
          size="small"
          variant="contained"
          startIcon={<SortIcon />}
          onClick={toggleSort}>
          {sort === 'ASC' ? 'リリース順' : '新しい順'}
        </Button>
      </Box>
      <Grid container spacing={{ xs: 1, sm: 2 }} width="100%">
        {records.map((r) => {
          return (
            <Grid key={r.catalogNumber} xs={6} sm={4} md={3} lg={2}>
              <Box>
                <RecordEditionCollectionCard edition={r} />
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  )
}
