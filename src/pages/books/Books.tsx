import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Box, Container } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Rating from "@mui/material/Rating";
import { DataGrid } from "../../components/DataGrid/DataGrid";
import { useFetch } from "../../utils/useFetch";
import { BookData, DataBooks } from "../../types/types";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    headerName: "Title",
    headerClassName: "super-app-theme--header",
    field: "title",
    resizable: false,
    sortable: true,
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "Author",
    headerClassName: "super-app-theme--header",
    field: "author",
    resizable: false,
    sortable: true,
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "Rating",
    headerClassName: "super-app-theme--header",
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
    headerClassName: "super-app-theme--header",
    renderCell: ({ id }: { id: string | number }) => (
      <NavLink to={`${id}/view`}>
        <VisibilityIcon /> View
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
    headerClassName: "super-app-theme--header",
    renderCell: ({ id }: { id: string | number }) => (
      <NavLink to={`${id}/edit`}>
        <EditIcon /> Edit
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

  useEffect(() => {
    if (fetchedData?.["hydra:member"]) {
      const modifiedData = fetchedData["hydra:member"].map((item: BookData) => {
        console.log("item: ", item);
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

  console.log(pageState);
  return (
    <Box>
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
              backgroundColor: "rgba(32, 32, 32, 0.55)",
            },
            ".MuiDataGrid-columnSeparator": {
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
