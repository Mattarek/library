import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

export default function PageSizeCustomOptions() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });

  return (
    <div style={{ height: 600, width: "50%" }}>
      <DataGrid
        {...data}
        initialState={{
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 8 } },
        }}
        pageSizeOptions={[8, 12, 24]} // aby pageSizeOptions sie pojawiło, pageSize z paginationModel musi być jedną z tych opcji
      />
    </div>
  );
}
