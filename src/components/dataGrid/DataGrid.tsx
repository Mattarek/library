import {DataGrid as DataGridMui, DataGridProps} from '@mui/x-data-grid'
import {Book, ReviewList} from '../../types/types'
import {Box, Container} from '@mui/material'

interface Props<T> extends DataGridProps {
  pageState: {
    isLoading: boolean
    data: T[]
    total: number
    page: number
    pageSize: number
  }
}

export function DataGrid({pageState, ...props}: Readonly<Props<ReviewList | Book>>) {
  return (
    <Box>
      <Container sx={{width: '100%'}}>
        <DataGridMui
          getRowId={row => row['@id'].replace(/^\/admin\//, '/')}
          rows={pageState.data}
          rowCount={pageState.total}
          autoHeight
          checkboxSelection
          paginationMode="server"
          pageSizeOptions={[5, 10, 25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          {...props}
        />
      </Container>
    </Box>
  )
}
