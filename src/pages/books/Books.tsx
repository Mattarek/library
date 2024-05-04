import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Rating from "@mui/material/Rating";
import { DataGrid } from "../../components/DataGrid/DataGrid";
import { useFetch } from "../../utils/useFetch";
import { DataBooks } from "../../types/types";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    headerName: "Title",
    field: "title",
    sortable: true,
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "Author",
    field: "author",
    sortable: true,
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "Rating",
    field: "rating",
    sortable: true,
    minWidth: 150,
    flex: 1,
    renderCell: ({ row }: { row: DataBooks }) => (
      <Rating value={row.rating} readOnly />
    ),
  },
  {
    headerName: "View",
    renderCell: ({ id }: { id: string | number }) => (
      <Link to={`${id}/view`}>
        <VisibilityIcon /> View
      </Link>
    ),
    sortable: false,
    field: "view",
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "Edit",
    renderCell: ({ id }: { id: string | number }) => (
      <Link to={`${id}/edit`}>
        <EditIcon /> Edit
      </Link>
    ),
    sortable: false,
    field: "edit",
    minWidth: 150,
    flex: 1,
  },
];

export const Books = () => {
  const [pageState, setPageState] = useState<{
    isLoading: boolean;
    data: DataBooks[];
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

  const handlePageState = (newPage: { page: number; pageSize: number }) => {
    setPageState((prevState) => ({
      ...prevState,
      page: newPage.page + 1,
      pageSize: newPage.pageSize,
    }));
  };

  const { response: fetchedData, isLoading } = useFetch(
    "get",
    `https://demo.api-platform.com/admin/books`,
    `?page=${pageState.page}&itemsPerPage=${pageState.pageSize}`
  );

  console.log(fetchedData);
  useEffect(() => {
    if (fetchedData?.["hydra:member"]) {
      const modifiedData = fetchedData["hydra:member"].map((item) => {
        return {
          ...item,
          id: item["@id"].replace(/^\/admin\//, "/"),
        };
      });

      setPageState((prevPageState) => {
        console.log(modifiedData);
        return {
          ...prevPageState,
          total: fetchedData["hydra:totalItems"],
          data: modifiedData,
        };
      });
    }
  }, [fetchedData]);

  console.log(pageState);
  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            Server-side Pagination demo
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: 100, marginBottom: 100 }}>
        <DataGrid
          autoHeight
          paginationMode="server"
          pageSizeOptions={[5, 10, 25, 50, 100]}
          columns={columns}
          pageState={pageState}
          loading={isLoading}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          onPaginationModelChange={handlePageState}
        />
      </Container>
    </Box>
  );
};
