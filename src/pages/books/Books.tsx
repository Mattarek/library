import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material/";

import { getBooks } from "../../utils/GetBooks/GetBooks";

import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "title", headerName: "Title", width: 100 },
  { field: "author", headerName: "Author", width: 200 },
  { field: "rating", headerName: "Rating", width: 150 },
  { field: "show", headerName: "Show", width: 150 },
  { field: "edit", headerName: "Edit", width: 150 },
];

export const Books: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [booksData, setBooksData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [siteCount, setSiteCount] = useState<number>();

  useEffect(() => {
    setIsLoading(true);
    const getBooksAsync = async (
      URL: string,
      endpoint: string,
      data: string,
      page: string
    ) => {
      try {
        const processedData = await getBooks(URL, endpoint, data, page);
        if (data === "hydra:member") {
          const arrayWithIdRemoved = processedData.map(
            (obj: { "@id": string }, id: number) => {
              const { "@id": uuid, ...rest } = obj;
              return { id: id + 1, uuid, ...rest };
            }
          );
          console.log(processedData);
          setBooksData(arrayWithIdRemoved);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getBooksAsync(
      "https://demo.api-platform.com",
      "/books",
      "hydra:member",
      `page=${currentPage}`
    );

    setIsLoading(false);
  }, [currentPage]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <Box>
        <DataGrid
          rows={booksData}
          columns={columns}
          loading={isLoading}
          pageSizeOptions={[9, 18, 27]}
          checkboxSelection
          hideFooter
        />
      </Box>

      <Box>
        <Button
          variant="contained"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prevState) => prevState - 1)}
        >
          Previous page
        </Button>

        <Button
          variant="contained"
          disabled={currentPage === 7}
          onClick={() => setCurrentPage((prevState) => prevState + 1)}
        >
          Next page
        </Button>
      </Box>
    </div>
  );
};
