import { DataGrid as DataGridMui } from "@mui/x-data-grid";
import { ComponentProps, Dispatch } from "react";

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
  page: number;
  pageSize: number;
  total: number;
}

interface Props extends ComponentProps<typeof DataGridMui> {
  columns: Column[];
  isLoading: boolean;
  pageState: {
    data: Data[];
    total: number;
    page: number;
    pageSize: number;
  };
  setPageState: (newPageState: {
    data: Data[];
    total: number;
    page: number;
    pageSize: number;
  }) => void;
}

export function DataGrid({
  columns,
  setPageState,
  isLoading,
  pageState,
  ...props
}: Readonly<Props>) {
  return (
    <DataGridMui
      columns={columns}
      rows={pageState.data}
      loading={isLoading}
      rowCount={pageState.total}
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
