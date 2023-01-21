import { Box, Paper } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { Song } from '../../Database'
import Link from '../Link'

interface SongTableProps {
  songs: Song[]
}

export const SongTable = ({ songs }: SongTableProps) => {
  const columns: GridColDef[] = [
    {
      field: 'Name',
      headerName: '曲名',
      width: 250,
      editable: true,
      disableColumnMenu: true,
      renderCell: (p: GridRenderCellParams<string>) => <Link href={`/songs/${p.value}`}>{p.value}</Link>,
    },
    {
      field: 'Kana',
      headerName: 'かな',
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: 'EarliestRecord',
      headerName: '初出レコード',
      width: 200,
      disableColumnMenu: true,
      renderCell: (p: GridRenderCellParams<string>) => <Link href={`/records/${p.value}`}>{p.value}</Link>,
    },
    { field: 'EarliestCatalogNumber', headerName: '初出盤', width: 200, disableColumnMenu: true },
    { field: 'JASRACCode', headerName: 'JASRAC 作品コード', width: 200, disableColumnMenu: true },
    { field: 'ISWC', headerName: 'ISWC', width: 180, disableColumnMenu: true },
  ]
  return (
    <Paper style={{ height: '100vh', display: 'flex' }}>
      <Box px={{ xs: 1, md: 2 }} style={{ flexGrow: 1 }}>
        <DataGrid
          rows={songs}
          columns={columns}
          getRowId={(r) => r.Name}
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
