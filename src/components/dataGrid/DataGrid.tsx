import {
  DataGrid as DataGridMui,
  DataGridProps,
  GridColDef,
} from "@mui/x-data-grid";
import { DataBooks } from "../../types/types";

interface Props extends DataGridProps<DataBooks> {
  pageState: {
    data: DataBooks[];
    total: number;
  };
  loading: boolean;
  columns: GridColDef<DataBooks>[];
}

export function DataGrid({ pageState, ...props }: Props) {
  return (
    <DataGridMui {...props} rows={pageState.data} rowCount={pageState.total} />
  );
}
