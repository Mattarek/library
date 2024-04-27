import { DataGrid as DataGridMui } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

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

interface Column {
  field: string;
  headerName: string;
  width: number;
}

interface PrevState {
  data: Data[];
  isLoading: boolean;
  lastPage: number;
  page: number;
  pageSize: number;
  total: number;
}

interface Props {
  columns: Column[];
}

export function DataGrid({ columns, setPageState, isLoading, data, ...props }) {
  console.log(data);
  return (
    <DataGridMui
      columns={columns}
      rows={data.data}
      loading={isLoading}
      rowCount={data.total}
      autoHeight
      paginationMode="server"
      pageSizeOptions={[5, 10, 25, 50]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      onPaginationModelChange={(newPage) => {
        setPageState((prevState: PrevState) => ({
          ...prevState,
          page: newPage.page + 1,
          pageSize: newPage.pageSize,
        }));
      }}
      {...props}
    />
  );
}
