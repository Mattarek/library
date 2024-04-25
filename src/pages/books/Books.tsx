import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [itemPerSite, setItemPerSite] = useState(25);
  const [page, setPage] = useState(1);
  const { token } = useContext<IAuthContext>(AuthContext);
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `https://demo.api-platform.com/admin/books?page=${page}&itemsPerPage=${itemPerSite}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBooks(
        response.data["hydra:member"].map((book, index) => ({
          ...book,
          id: index + 1,
        }))
      );
      setTotalItems(response.data["hydra:totalItems"]);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page]); // Fetch books whenever page changes

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "author", headerName: "Author", width: 200 },
  ];

  return (
    <DataGrid
      rows={books}
      columns={columns}
      paginationMode="server"
      rowCount={totalItems}
      pagination
      autoHeight
      initialState={{
        pagination: { paginationModel: { pageSize: 8 } },
      }}
      pageSizeOptions={[8, 12, 24]}
    />
  );
};
