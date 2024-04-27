import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { DataGrid } from "../../components/dataGrid/DataGrid";
import { useEffect, useState } from "react";
import { useFetch } from "../../utils/useFetch";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

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
  page: number;
  pageSize: number;
  total: number;
}

const columns = [
  {
    headerName: "Title",
    field: "title",
    sortable: true,
    width: 200,
  },
  {
    headerName: "Author",
    field: "author",
    width: 200,
    sortable: true,
  },
  {
    headerName: "Rating",
    renderCell: ({ row }: { row: Data }) => (
      <Rating value={row.rating} readOnly />
    ),
    sortable: true,
    field: "rating",
    width: 200,
  },
  {
    headerName: "View",
    renderCell: ({ id }: { id: string }) => (
      <Link to={id}>
        <VisibilityIcon /> View
      </Link>
    ),
    sortable: false,
    field: "view",
    width: 200,
  },
  {
    headerName: "Edit",
    renderCell: ({ id }: { id: string }) => (
      <Link to={`${id}/edit`}>
        <EditIcon /> Edit
      </Link>
    ),
    sortable: false,
    field: "edit",
    width: 200,
  },
];

export const Books = () => {
  const [pageState, setPageState] = useState<PrevState>({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 5,
  });

  const { data: fetchedData, isLoading } = useFetch(
    `https://demo.api-platform.com/admin/books`,
    `?page=${pageState.page}&itemsPerPage=${pageState.pageSize}`
  );

  useEffect(() => {
    if (fetchedData["hydra:member"]) {
      const modifiedData = fetchedData["hydra:member"].map((item) => {
        return {
          id: item["@id"],
          "@id": <EditIcon />,
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
          isLoading={isLoading}
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
        />
      </Container>
    </Box>
  );
};
