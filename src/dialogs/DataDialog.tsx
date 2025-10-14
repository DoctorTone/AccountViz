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
  const dataLoaded = useStore((state) => state.dataLoaded);
  const setDataLoaded = useStore((state) => state.setDataLoaded);
  const rows = useStore((state) => state.rows);

  const handleClose = () => {
    setDataLoaded(false);
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
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const rowSelected = (newSelection: GridRowSelectionModel) => {
    const values = Array.from(newSelection.ids);
    let inComing = 0;
    let outGoing = 0;

    for (let i = 0; i < values.length; ++i) {
      const row = rows[values[i] - 1];
      if (row.amount < 0) {
        outGoing += row.amount;
      } else {
        inComing += row.amount;
      }
    }

    console.log("Outgoings = ", outGoing);
    console.log("Incomings = ", inComing);
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
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataDialog;
