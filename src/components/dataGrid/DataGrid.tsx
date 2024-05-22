import { DataGrid as DataGridMui, DataGridProps } from '@mui/x-data-grid';
import { Book, Review } from '../../types/types';
import { Box, Container } from '@mui/material';

interface Props<T> extends DataGridProps {
  pageState: {
    isLoading: boolean;
    data: T[];
    total: number;
    page: number;
    pageSize: number;
  };
}

export function DataGrid({ pageState, ...props }: Readonly<Props<Review | Book>>) {
  return (
    <Box>
      <Container sx={{ width: '100%' }}>
        <DataGridMui
          {...props}
          rows={pageState.data}
          rowCount={pageState.total}
          autoHeight
          checkboxSelection
          paginationMode="server"
          pageSizeOptions={[5, 10, 25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
        />
      </Container>
    </Box>
  );
}
