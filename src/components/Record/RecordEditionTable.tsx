import { Box, Paper } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { RecordEdition } from '../../spreadsheets'
import Link from '../Link'

interface RecordEditionTableProps {
  editions: RecordEdition[]
}

export const RecordEditionTable = ({ editions }: RecordEditionTableProps) => {
  const columns: GridColDef[] = [
    {
      field: 'recordName',
      headerName: 'タイトル',
      width: 300,
      editable: true,
      disableColumnMenu: true,
      renderCell: (p: GridRenderCellParams<string>) => (
        <Link href={`/records/${editions.find((e) => e.recordName === p.value)?.recordId}#${p.id}`}>{p.value}</Link>
      ),
    },
    { field: 'editionName', headerName: '盤名', width: 250, editable: true, disableColumnMenu: true },
    { field: 'recordType', headerName: '形態', width: 130, sortable: true, disableColumnMenu: true },
    { field: 'editionReleaseDate', headerName: 'リリース日', width: 130, disableColumnMenu: true },
    { field: 'recordLabel', headerName: 'レーベル名', width: 200, disableColumnMenu: true },
    { field: 'catalogNumber', headerName: '品番', width: 180, disableColumnMenu: true },
  ]

  return (
    <Paper style={{ height: '100vh', display: 'flex' }}>
      <Box px={{ xs: 1, md: 2 }} style={{ flexGrow: 1 }}>
        <DataGrid
          rows={editions}
          columns={columns}
          getRowId={(r) => r.catalogNumber}
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
