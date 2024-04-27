import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { DataGrid } from "../../components/dataGrid/DataGrid";
import { useEffect, useState } from "react";
import { useFetch } from "../../utils/useFetch";

const columns = [
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "body",
    headerName: "Body",
    width: 200,
  },
];
interface Data {
  "@id": string;
  "@type": string[];
  author: string;
  book: string;
  condition: string;
  id: number;
  rating: number;
  title: string;
}

interface PrevState {
  data: [] | Data[];
  isLoading: boolean;
  lastPage: number;
  page: number;
  pageSize: number;
  total: number;
}

export const Books = () => {
  const [pageState, setPageState] = useState<PrevState>({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    lastPage: 0,
    pageSize: 5,
  });

  const { data: fetchedData, isLoading } = useFetch(
    `https://demo.api-platform.com/admin/books`,
    `?page=${pageState.page}&itemsPerPage=${pageState.pageSize}`
  );

  useEffect(() => {
    if (fetchedData && fetchedData["hydra:member"]) {
      const modifiedData = fetchedData["hydra:member"].map((item) => {
        return {
          id: item["@id"], // Zmiana '@id' na 'id'
          ...item,
        };
      });

      setPageState((prevPageState) => ({
        ...prevPageState,
        total: fetchedData["hydra:totalItems"],
        data: modifiedData,
      }));
    }
  }, [fetchedData]);

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
          columns={columns}
          data={pageState} // Użyj zmodyfikowanych danych
          isLoading={isLoading}
          setPageState={setPageState}
        />
      </Container>
    </Box>
  );
};
