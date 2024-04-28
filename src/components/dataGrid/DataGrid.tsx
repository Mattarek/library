import { DataGrid as DataGridMui, GridColDef } from "@mui/x-data-grid";
import { DataBooks } from "../../types/types";

interface Props {
  pageState: {
    isLoading: boolean;
    data: DataBooks[];
    total: number;
    page: number;
    pageSize: number;
  };
  isLoading: boolean;
  columns: GridColDef<DataBooks>[];
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
