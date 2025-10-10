import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import useStore from "../state/store";

const DataDialog = () => {
  const dataLoaded = useStore((state) => state.dataLoaded);
  const setDataLoaded = useStore((state) => state.setDataLoaded);

  const handleClose = () => {
    setDataLoaded(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={dataLoaded}
      maxWidth={"md"}
      fullWidth={true}
    >
      <DialogTitle>Accounts Data</DialogTitle>
      <DialogContent dividers>Data dialog</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataDialog;
