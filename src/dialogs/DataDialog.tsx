import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
  DataGrid,
  type GridColDef,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import useStore from "../state/store";

const DataDialog = () => {
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>();
  const dataLoaded = useStore((state) => state.dataLoaded);
  const setDataLoaded = useStore((state) => state.setDataLoaded);
  const rows = useStore((state) => state.rows);
  const saveSelectedRows = useStore((state) => state.saveSelectedRows);

  const handleClose = () => {
    setDataLoaded(false);
    if (selectionModel) {
      const selectedRows = Array.from(selectionModel.ids);
      const selectedData = [];
      for (let i = 0; i < selectedRows.length; ++i) {
        const row = (selectedRows[i] as number) - 1;
        selectedData.push(rows[row]);
      }
      saveSelectedRows(selectedData);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "transaction", headerName: "Type", width: 130 },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 90,
    },
    {
      field: "description",
      headerName: "Description",
      width: 160,
    },
    {
      field: "vat",
      headerName: "VAT",
      width: 50,
      valueGetter: () => "Hello",
    },
    {
      field: "category",
      headerName: "Category",
      width: 75,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const rowSelected = (newSelection: GridRowSelectionModel) => {
    setSelectionModel(newSelection);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={dataLoaded}
      maxWidth={"md"}
      fullWidth={true}
    >
      <DialogTitle>Accounts Data</DialogTitle>
      <DialogContent dividers>
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowSelectionModelChange={rowSelected}
            sx={{ border: 0 }}
          />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Visualise
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataDialog;
