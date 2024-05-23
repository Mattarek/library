import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Rating } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from '../../components/DataGrid/DataGrid';
import { useFetch } from '../../utils/useFetch';
import { ReviewList, Response } from '../../types/types';
import { GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    headerName: 'User',
    field: 'user',

    valueGetter: (_, row) => row.user.name,
    sortable: true,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: 'Book',
    valueGetter: (_, row) => `${row.book.title} - ${row.book.author}`,
    field: 'book.author',
    sortable: true,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: 'Published at',
    valueGetter: (_, row) => `${row.publishedAt.slice(0, 10)}`,
    field: 'publishedAt',
    flex: 1,
    minWidth: 150,
    sortable: true,
  },
  {
    headerName: 'Rating',
    renderCell: ({ row }) => <Rating value={row.rating} readOnly />,
    sortable: true,
    field: 'rating',
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: 'View',
    renderCell: param => (
      <NavLink to={`${param.id}/view`}>
        <Button startIcon={<VisibilityIcon />}>View</Button>
      </NavLink>
    ),
    sortable: false,
    field: 'view',
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: 'Edit',
    renderCell: param => (
      <NavLink to={`${param.id}/edit`}>
        <Button startIcon={<EditIcon />}>Edit</Button>
      </NavLink>
    ),
    sortable: false,
    field: 'edit',
    minWidth: 150,
    flex: 1,
  },
];

export const Reviews = () => {
  const [pageState, setPageState] = useState<{
    isLoading: boolean;
    data: ReviewList[];
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

  const { data, isLoading } = useFetch<Response<ReviewList>>(
    'get',
    `https://demo.api-platform.com/admin/reviews`,
    `?page=${pageState.page}&itemsPerPage=${pageState.pageSize}`
  );

  useEffect(() => {
    if (!data?.['hydra:member'] || !data?.['hydra:totalItems']) return;
    const modifiedData = data['hydra:member'].map(item => {
      return {
        ...item,
        id: item['@id'].replace(/^\/admin\//, '/'),
      };
    });

    setPageState(prev => {
      return {
        ...prev,
        total: data['hydra:totalItems'],
        data: modifiedData,
      };
    });
  }, [data]);

  const handlePageState = (newPage: { page: number; pageSize: number }) => {
    setPageState(prev => ({
      ...prev,
      page: newPage.page + 1,
      pageSize: newPage.pageSize,
    }));
  };

  return (
    <DataGrid
      columns={columns}
      pageState={pageState}
      loading={isLoading}
      onPaginationModelChange={handlePageState}
    />
  );
};
