import { Box, Paper } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { SongWithCreditsAndEditions } from '../../spreadsheets'
import Link from '../Link'

interface SongTableProps {
  songs: SongWithCreditsAndEditions[]
}

export const SongTable = ({ songs }: SongTableProps) => {
  const columns: GridColDef[] = [
    {
      field: 'songName',
      headerName: '曲名',
      width: 250,
      editable: true,
      disableColumnMenu: true,
      renderCell: (p: GridRenderCellParams<string>) => (
        <Link href={`/songs/${songs.find((s) => s.songName === p.value)?.songId}`}>{p.value}</Link>
      ),
    },
    {
      field: 'songKana',
      headerName: 'かな',
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: 'songEarliestRecordId',
      headerName: '初出レコード',
      width: 200,
      disableColumnMenu: true,
      renderCell: (p: GridRenderCellParams<string>) => (
        <Link href={`/records/${p.value}`}>
          {songs.find((s) => s.songId === p.id)?.recordEditions.at(0)?.recordName || ''}
        </Link>
      ),
    },
    { field: 'songEarliestCatalogNumber', headerName: '初出盤', width: 200, disableColumnMenu: true },
    { field: 'songJASRACCode', headerName: 'JASRAC 作品コード', width: 200, disableColumnMenu: true },
    { field: 'songISWCCode', headerName: 'ISWC', width: 180, disableColumnMenu: true },
  ]
  return (
    <Paper style={{ height: '100vh', display: 'flex' }}>
      <Box px={{ xs: 1, md: 2 }} style={{ flexGrow: 1 }}>
        <DataGrid
          rows={songs}
          columns={columns}
          getRowId={(r) => r.songId}
          showCellRightBorder
          showColumnRightBorder
          pageSize={100}
          hideFooterSelectedRowCount
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    </Paper>
  )
}
