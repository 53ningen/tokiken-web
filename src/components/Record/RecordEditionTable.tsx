import { Box, Paper } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { RecordEdition } from '../../Database'
import Link from '../Link'

interface RecordEditionTableProps {
  editions: RecordEdition[]
}

export const RecordEditionTable = ({ editions }: RecordEditionTableProps) => {
  const columns: GridColDef[] = [
    {
      field: 'RecordName',
      headerName: 'タイトル',
      width: 300,
      editable: true,
      disableColumnMenu: true,
      renderCell: (p: GridRenderCellParams<string>) => (
        <Link href={`/records/${p.value?.replace('/', ';')}#${p.id}`}>{p.value}</Link>
      ),
    },
    { field: 'Edition', headerName: '盤名', width: 250, editable: true, disableColumnMenu: true },
    { field: 'Type', headerName: '形態', width: 130, sortable: true, disableColumnMenu: true },
    { field: 'ReleaseDate', headerName: 'リリース日', width: 130, disableColumnMenu: true },
    { field: 'Label', headerName: 'レーベル名', width: 200, disableColumnMenu: true },
    { field: 'CatalogNumber', headerName: '品番', width: 180, disableColumnMenu: true },
  ]

  return (
    <Paper style={{ height: '100vh', display: 'flex' }}>
      <Box px={{ xs: 1, md: 2 }} style={{ flexGrow: 1 }}>
        <DataGrid
          rows={editions}
          columns={columns}
          getRowId={(r) => r.CatalogNumber}
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
