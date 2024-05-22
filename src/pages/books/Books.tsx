import {
  useEffect,
  useState,
} from 'react';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Rating,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '../../components/DataGrid/DataGrid';
import { useFetch } from '../../utils/useFetch';
import {
  Book,
  Response,
} from '../../types/types';

const columns: GridColDef[] = [
  {
    headerName: 'Title',
    field: 'title',
    resizable: false,
    sortable: true,
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: 'Author',
    field: 'author',
    resizable: false,
    sortable: true,
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: 'Rating',

    field: 'rating',
    resizable: false,
    sortable: true,
    minWidth: 150,
    flex: 1,
    renderCell: ({
      row,
    }: {
      row: Book;
    }) => (
      <Rating
        value={row.rating}
        readOnly
      />
    ),
  },
  {
    headerName: 'View',
    renderCell: ({
      id,
    }: {
      id: string | number;
    }) => (
      <NavLink to={`${id}/view`}>
        <Button
          startIcon={<VisibilityIcon />}
        >
          View
        </Button>
      </NavLink>
    ),
    resizable: false,
    sortable: false,
    field: 'view',
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: 'Edit',
    renderCell: ({
      id,
    }: {
      id: string | number;
    }) => (
      <NavLink to={`${id}/edit`}>
        <Button
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </NavLink>
    ),
    resizable: false,
    sortable: false,
    field: 'edit',
    minWidth: 150,
    flex: 1,
  },
];

export const Books = () => {
  const [pageState, setPageState] =
    useState<{
      isLoading: boolean;
      data: Book[];
      total: number;
      page: number;
      pageSize: number;
    }>({
      isLoading: false,
      data: [],
      total: 0,
      page: 1,
      pageSize: 5,
    });

  const handlePageState = (newPage: {
    page: number;
    pageSize: number;
  }) => {
    setPageState(prev => ({
      ...prev,
      page: newPage.page + 1,
      pageSize: newPage.pageSize,
    }));
  };

  const { data, isLoading } = useFetch<
    Response<Book>
  >(
    'get',
    `https://demo.api-platform.com/admin/books`,
    `?page=${pageState.page}&itemsPerPage=${pageState.pageSize}`
  );

  useEffect(() => {
    if (
      !data?.['hydra:member'] ||
      !data?.['hydra:totalItems']
    )
      return;
    const modifiedData = data[
      'hydra:member'
    ].map(item => ({
      ...item,
      id: item['@id'].replace(
        /^\/admin\//,
        '/'
      ),
    }));

    setPageState(prev => ({
      ...prev,
      total: data['hydra:totalItems'],
      data: modifiedData,
    }));
  }, [data]);

  return (
    <DataGrid
      columns={columns}
      pageState={pageState}
      loading={isLoading}
      onPaginationModelChange={
        handlePageState
      }
    />
  );
};
