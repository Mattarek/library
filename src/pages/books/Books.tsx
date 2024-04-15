import { useState } from "react";
import useApiAllPages from "../../utils/GetBooks";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

interface Book {
  "@id": string;
  "@type": string[];
  author: string;
  book: string;
  condition: string;
  rating: number;
  reviews: string;
  title: string;
}

const BooksPage = () => {
  const baseUrl = `https://demo.api-platform.com/books`;
  const { allPagesData, isLoading, error } = useApiAllPages(baseUrl);
  const [sorted, setSorted] = useState([{ field: "rating", sort: "desc" }]);

  const handleSortModelChange = (newModel) => {
    setSorted(newModel);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "rating", headerName: "Rating", width: 150 },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const rows: GridRowsProp = allPagesData.flatMap((pageData) =>
    pageData["hydra:member"].map((book: Book) => ({
      id: book["@id"].split("/books/")[1].slice(0, -1),
      title: book.title,
      rating: book.rating,
    }))
  );

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      sortingOrder={["desc", "asc"]}
      initialState={{
        sorting: {
          sortModel: [
            {
              field: "rating",
              sort: "desc",
            },
          ],
        },
      }}
    />
  );
};

export default BooksPage;
