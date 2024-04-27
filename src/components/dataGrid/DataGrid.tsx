import { DataGrid as DataGridMui } from "@mui/x-data-grid";
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

interface Props {
  pageState: {
    isLoading: boolean;
    data: Data[];
    total: number;
    page: number;
    pageSize: number;
  };
  isLoading: boolean;
  columns: Column[];
}

export function DataGrid({ columns, isLoading, pageState, ...props }: Props) {
  return (
    <DataGridMui
      {...props}
      columns={columns}
      rows={pageState.data}
      loading={isLoading}
      rowCount={pageState.total}
    />
  );
}
