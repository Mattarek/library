import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios, { AxiosResponse } from "axios";

export function DataGridDemo() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>("");

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      editable: false,
    },
    {
      field: "author",
      headerName: "Author",
      width: 150,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,

  ];

  useEffect(() => {
    const getData = async (link: string, parameter: string) => {
      axios
        .get(link)
        .then(
          (response: AxiosResponse<{ parameter: Book[] }>): Book[] =>
            response.data[parameter]
        )
        .then(setBooks)
        .catch(setError);
    };
    getData("https://demo.api-platform.com", "hydra:member");
  }, []);

  return <Box sx={{ height: 400, width: "100%" }}>{books && books["@id"]}</Box>;
}
