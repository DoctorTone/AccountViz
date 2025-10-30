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
  type GridEditSingleSelectCellProps,
  GridEditSingleSelectCell,
  useGridApiContext,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import useStore from "../state/store";
import Checkbox from "@mui/material/Checkbox";

const DataDialog = () => {
  const [selection, setSelection] = useState<GridRowSelectionModel>();
  const dataLoaded = useStore((state) => state.dataLoaded);
  const setDataLoaded = useStore((state) => state.setDataLoaded);
  const rows = useStore((state) => state.rows);
  const updateRow = useStore((state) => state.updateRow);
  const saveSelectedRows = useStore((state) => state.saveSelectedRows);

  const handleClose = () => {
    if (!selection) {
      // DEBUG
      console.log("No data selected!");
      return;
    }
    setDataLoaded(false);
    const selected = Array.from(selection.ids);
    const selectedRows = rows.filter((row) => selected!.includes(row.id));
    saveSelectedRows(selectedRows);
  };

  const CustomTypeEditComponent = (params: GridEditSingleSelectCellProps) => {
    const apiRef = useGridApiContext();

    const handleValueChange = async (event: any, newValue: string) => {
      await apiRef.current.setEditCellValue(
        {
          id: params.id,
          field: params.field,
          value: newValue,
        },
        event
      );
      // Commit cell
      apiRef.current.stopCellEditMode({ id: params.id, field: params.field });
    };

    return (
      <GridEditSingleSelectCell onValueChange={handleValueChange} {...params} />
    );
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
      width: 75,
      renderCell: () => <Checkbox />,
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Misc", "Accountants", "Consumables", "Web hosting"],
      renderEditCell: (params) => <CustomTypeEditComponent {...params} />,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const rowUpdate = (newRow: any, oldRow: any) => {
    // DEBUG
    console.log("Row updated");
    updateRow(newRow);
    return newRow;
  };

  const handleSelectionChange = (model: GridRowSelectionModel) => {
    setSelection(model);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={dataLoaded}
      maxWidth={"lg"}
      fullWidth={true}
    >
      <DialogTitle>Accounts Data</DialogTitle>
      <DialogContent dividers>
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            disableRowSelectionOnClick
            rows={rows}
            editMode="cell"
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            processRowUpdate={rowUpdate}
            onProcessRowUpdateError={(err) => console.error(err)}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
            rowSelectionModel={selection}
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
