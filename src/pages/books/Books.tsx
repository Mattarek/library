import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import axios from "axios"; // Dodajemy import axios
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";

const columns = [
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "body",
    headerName: "Body",
    flex: 1,
  },
];

export const Books = () => {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    lastPage: 0,
    pageSize: 5,
  });

  const { token } = useContext<IAuthContext>(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      try {
        const response = await axios.get(
          `https://demo.api-platform.com/admin/books?page=${pageState.page}&itemsPerPage=${pageState.pageSize}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: response.data["hydra:member"].map((book, index) => ({
            ...book,
            id: index + 1,
          })),
          total: response.data["hydra:totalItems"],
          lastPage: parseInt(
            response.data["hydra:view"]["hydra:last"].match(/page=(\d+)/)[1]
          ),
        }));
      } catch (error) {
        console.error("Error fetching books:", error);
        setPageState((old) => ({ ...old, isLoading: false }));
      }
    };

    fetchData();
  }, [pageState.page, pageState.pageSize]);

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
          rows={pageState.data}
          columns={columns}
          loading={pageState.isLoading}
          rowCount={pageState.total}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          onPaginationModelChange={(newPage) => {
            setPageState((old) => ({
              ...old,
              page: newPage.page + 1,
              pageSize: newPage.pageSize,
            }));
          }}
        />
      </Container>
    </Box>
  );
};
