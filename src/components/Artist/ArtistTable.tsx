import { Box, Paper } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { Artist } from '../../spreadsheets'
import Link from '../Link'

interface ArtistTableProps {
  artists: Artist[]
}

export const ArtistTable = ({ artists }: ArtistTableProps) => {
  const columns: GridColDef[] = [
    {
      field: 'artistName',
      headerName: '名前',
      width: 250,
      editable: true,
      disableColumnMenu: true,
      renderCell: (p: GridRenderCellParams<string>) => <Link href={`/artists/${p.id}`}>{p.value}</Link>,
    },
    {
      field: 'artistKana',
      headerName: 'かな',
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: 'artistLyricsCount',
      headerName: '作詞曲数',
      width: 90,
      disableColumnMenu: true,
      valueGetter: (p) => parseInt(p.value),
    },
    {
      field: 'artistMusicCount',
      headerName: '作曲数',
      width: 90,
      disableColumnMenu: true,
      valueGetter: (p) => parseInt(p.value),
    },
    {
      field: 'artistArrangementCount',
      headerName: '編曲数',
      width: 90,
      disableColumnMenu: true,
      valueGetter: (p) => parseInt(p.value),
    },
    {
      field: 'artistProduceCount',
      headerName: '制作曲数',
      width: 90,
      disableColumnMenu: true,
      valueGetter: (p) => parseInt(p.value),
    },
    {
      field: 'artistDanceCount',
      headerName: 'ダンス曲数',
      width: 90,
      disableColumnMenu: true,
      valueGetter: (p) => parseInt(p.value),
    },
  ]
  return (
    <Paper style={{ height: '100vh', display: 'flex' }}>
      <Box px={{ xs: 1, md: 2 }} style={{ flexGrow: 1 }}>
        <DataGrid
          rows={artists}
          columns={columns}
          getRowId={(r) => r.artistId}
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
