import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, TextField, Box } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import useApiAllPages from "../../utils/GetBooks";

const BooksPage = () => {
  const baseUrl = `https://demo.api-platform.com/books`;
  const { allPagesData, isLoading, error } = useApiAllPages(baseUrl);
  const [filterValues, setFilterValues] = useState({
    title: "",
    author: "",
    publicationDate: "",
  });

  const handleFilterSubmit = (values) => {
    const trimmedValues = {};
    for (const key in values) {
      trimmedValues[key] = values[key].trim();
    }
    setFilterValues(trimmedValues);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "author", headerName: "Author", width: 200 },
    { field: "rating", headerName: "Rating", width: 150 },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredRows: GridRowsProp = allPagesData.flatMap((pageData) =>
    pageData["hydra:member"]
      .filter((book) => {
        if (
          !filterValues.title ||
          book.title.toLowerCase().includes(filterValues.title.toLowerCase())
        ) {
          if (
            !filterValues.author ||
            book.author
              .toLowerCase()
              .includes(filterValues.author.toLowerCase())
          ) {
            if (
              !filterValues.publicationDate ||
              book.publicationDate === filterValues.publicationDate
            ) {
              return true;
            }
          }
        }
        return false;
      })
      .map((book) => ({
        id: book["@id"].split("/books/")[1].slice(0, -1),
        title: book.title,
        author: book.author,
        publicationDate: book.publicationDate,
        rating: book.rating,
      }))
  );

  console.log(filteredRows);
  return (
    <>
      <Formik
        initialValues={{
          title: "",
          author: "",
          publicationDate: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleFilterSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <div style={{ marginRight: "10px" }}>
              <Field
                as={TextField}
                name="title"
                label="Title"
                variant="outlined"
                margin="normal"
                fullWidth
              />
            </div>
            <div style={{ marginRight: "10px" }}>
              <Field
                as={TextField}
                name="author"
                label="Author"
                variant="outlined"
                margin="normal"
                fullWidth
              />
            </div>
            <div style={{ marginRight: "10px" }}>
              <Field
                as={TextField}
                name="publicationDate"
                label="Publication Date"
                type="date"
                variant="outlined"
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Search
            </Button>
          </Form>
        )}
      </Formik>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          autoHeight
          rows={filteredRows}
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
      </div>
    </>
  );
};

export default BooksPage;
