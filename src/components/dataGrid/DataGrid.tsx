import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

export default function PageSizeCustomOptions() {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });

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
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[10, 30, 50, 70, 100]}
          pagination
          page={pageState.page - 1}
          pageSize={pageState.pageSize}
          paginationMode="server"
          onPageChange={(newPage) => {
            setPageState((old) => ({ ...old, page: newPage + 1 }));
          }}
          onPageSizeChange={(newPageSize) =>
            setPageState((old) => ({ ...old, pageSize: newPageSize }))
          }
          columns={columns}
        />
      </Container>
    </Box>
  );
}
