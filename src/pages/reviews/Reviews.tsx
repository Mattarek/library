import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Box, Container } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Rating from "@mui/material/Rating";
import { DataGrid } from "../../components/DataGrid/DataGrid";
import { useFetch } from "../../utils/useFetch";
import { State } from "../../types/types";

const columns = [
  {
    headerName: "User",
    headerClassName: "super-app-theme--header",
    field: "user",

    valueGetter: (_, row) => row.user.name,
    sortable: true,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "Book",
    headerClassName: "super-app-theme--header",
    valueGetter: (_, row) => `${row.book.title} - ${row.book.author}`,
    field: "book.author",
    sortable: true,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "Published at",
    headerClassName: "super-app-theme--header",
    valueGetter: (_, row) => `${row.publishedAt}`,
    field: "publishedAt",
    flex: 1,
    minWidth: 150,
    sortable: true,
  },
  {
    headerName: "Rating",
    headerClassName: "super-app-theme--header",
    renderCell: ({ row }: { row: Data }) => (
      <Rating value={row.rating} readOnly />
    ),
    sortable: true,
    field: "rating",
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "View",
    headerClassName: "super-app-theme--header",
    renderCell: ({ id }: { id: string }) => (
      <NavLink to={`${id}/view`}>
        <VisibilityIcon /> View
      </NavLink>
    ),
    sortable: false,
    field: "view",
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "Edit",
    headerClassName: "super-app-theme--header",
    renderCell: ({ id }: { id: string }) => (
      <NavLink to={`${id}/edit`}>
        <EditIcon /> Edit
      </NavLink>
    ),
    sortable: false,
    field: "edit",
    minWidth: 150,
    flex: 1,
  },
];

export const Reviews = () => {
  const [pageState, setPageState] = useState<State>({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 5,
  });

  const { response: fetchedData, isLoading } = useFetch(
    "get",
    `https://demo.api-platform.com/admin/reviews`,
    `?page=${pageState.page}&itemsPerPage=${pageState.pageSize}`
  );

  useEffect(() => {
    if (fetchedData?.["hydra:member"]) {
      const modifiedData = fetchedData["hydra:member"].map((item) => {
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
          setPageState={setPageState}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          onPaginationModelChange={(newPage: {
            page: number;
            pageSize: number;
          }) => {
            setPageState((prevState) => ({
              ...prevState,
              page: newPage.page + 1,
              pageSize: newPage.pageSize,
            }));
          }}
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
