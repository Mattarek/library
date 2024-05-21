import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button, Container } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Rating from "@mui/material/Rating";
import { GridColDef } from "@mui/x-data-grid";

import { DataGrid } from "../../components/DataGrid/DataGrid";
import { FormikSearchForm } from "../../components/Form/FormikSearchForm";

import { useFetch } from "../../utils/useFetch";
import { BookData, DataBooks } from "../../types/types";

const columns: GridColDef[] = [
  {
    headerName: "Title",
    field: "title",
    resizable: false,
    sortable: true,
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "Author",
    field: "author",
    resizable: false,
    sortable: true,
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "Rating",

    field: "rating",
    resizable: false,
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
      <NavLink to={`${id}/view`}>
        <Button startIcon={<VisibilityIcon />}>View</Button>
      </NavLink>
    ),
    resizable: false,
    sortable: false,
    field: "view",
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "Edit",
    renderCell: ({ id }: { id: string | number }) => (
      <NavLink to={`${id}/edit`}>
        <Button startIcon={<EditIcon />}>Edit</Button>
      </NavLink>
    ),
    resizable: false,
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
    setPageState((prev) => ({
      ...prev,
      page: newPage.page + 1,
      pageSize: newPage.pageSize,
    }));
  };

  const { response: fetchedData, isLoading } = useFetch<BookData>(
    "get",
    `https://demo.api-platform.com/admin/books`,
    `?page=${pageState.page}&itemsPerPage=${pageState.pageSize}`
  );

  useEffect(() => {
    if (fetchedData?.["hydra:member"]) {
      const modifiedData = fetchedData["hydra:member"].map((item: BookData) => {
        return {
          ...item,
          id: item["@id"].replace(/^\/admin\//, "/"),
        };
      });

      setPageState((prevPageState) => {
        return {
          ...prevPageState,
          total: fetchedData["hydra:totalItems"],
          data: modifiedData,
        };
      });
    }
  }, [fetchedData]);


  console.log(pageState)
  return (
    <Box>
      <FormikSearchForm />
      <Container sx={{ width: "100%" }}>
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
          sx={{
            "& .super-app-theme--header": {
              backgroundColor: "rgba(255, 255, 255, 0.965)",
            },
            "& .MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "a:link": {
              textDecoration: "none",
              color: "black",
            },
            "a:visited": {
              color: "black",
            },
          }}
        />
      </Container>
    </Box>
  );
};
