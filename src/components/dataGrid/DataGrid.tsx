import { DataGrid as DataGridMui, DataGridProps } from "@mui/x-data-grid";
import { DataBooks } from "../../types/types";

interface Props extends DataGridProps<DataBooks> {
  pageState: {
    data: DataBooks[];
    total: number;
  };
}

export function DataGrid({ pageState, ...props }: Props) {
  return (
    <DataGridMui rows={pageState.data} rowCount={pageState.total} {...props} />
  );
}
