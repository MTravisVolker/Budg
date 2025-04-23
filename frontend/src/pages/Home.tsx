import { useState } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'
import { addWeeks, subWeeks } from 'date-fns'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Home = () => {
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: subWeeks(new Date(), 2),
      endDate: addWeeks(new Date(), 4),
      key: 'selection'
    }
  ])

  // Example columns - replace with actual data from API
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 130 },
    { field: 'dueDate', headerName: 'Due Date', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
  ]

  // Example data - replace with actual data from API
  const rows = [
    { id: 1, name: 'Rent', amount: 1200, dueDate: '2024-03-01', status: 'Upcoming' },
    { id: 2, name: 'Electric', amount: 150, dueDate: '2024-03-05', status: 'Upcoming' },
  ]

  const handleDateRangeChange = (ranges: RangeKeyDict) => {
    if (ranges.selection?.startDate && ranges.selection?.endDate) {
      setDateRange([ranges.selection])
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h4" component="h1">
          Financial Overview
        </Typography>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Date Range
          </Typography>
          <DateRange
            editableDateInputs={true}
            onChange={handleDateRangeChange}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
          />
        </Paper>

        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Paper>
      </Box>
    </DndProvider>
  )
}

export default Home 