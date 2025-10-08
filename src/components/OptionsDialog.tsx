import { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Papa from "papaparse";
import type { RawData } from "../state/Config";
import type { ChangeEvent } from "react";
import { Vector3 } from "three";
import useStore from "../state/store";

const OptionsDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [fileStatus, setFileStatus] = useState("No data loaded");
  const [xOption, setXOption] = useState("");
  const [yOption, setYOption] = useState("");
  const [zOption, setZOption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setData = useStore((state) => state.setData);
  const rawData = useStore((state) => state.rawData);
  const setPointData = useStore((state) => state.setPointData);
  const axisOptions = useStore((state) => state.axisOptions);
  const setAxisOptions = useStore((state) => state.setAxisOptions);
  const setAxes = useStore((state) => state.setAxes);
  const dataScale = useStore((state) => state.dataScale);

  const handleClose = () => {
    setDialogOpen(false);
    // Get selected points from point data
    let points: Vector3[] = [];
    // DEBUG
    // console.log("Raw = ", rawData);
    points = rawData.map((value) => {
      const point = new Vector3(
        (value[xOption] as number) * dataScale,
        (value[yOption] as number) * dataScale,
        (value[zOption] as number) * dataScale
      );
      return point;
    });
    // DEBUG
    // console.log("Points = ", points);
    setPointData(points);
    setAxes([xOption, yOption, zOption]);
    // DEBUG
    // console.log("Axes = ", [xOption, yOption, zOption]);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: function (results) {
          // DEBUG
          // console.log(results.data); // parsed CSV data ready for 3D visualization
          setData(results.data as RawData[]);
          setFileStatus("Data loaded - select axes");
          const options = Object.keys(results.data[0] as string[]);
          setAxisOptions(options);
          setAxes([options[0], options[1], options[2]]);
          // DEBUG
          // console.log("Axes = ", options);
        },
      });
    }
  };

  const setXAxis = (event: any, newValue: string | null) => {
    if (!newValue) return;

    setXOption(newValue);
  };

  const setYAxis = (event: any, newValue: string | null) => {
    if (!newValue) return;

    setYOption(newValue);
  };
  const setZAxis = (event: any, newValue: string | null) => {
    if (!newValue) return;

    setZOption(newValue);
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={dialogOpen}
        maxWidth={"md"}
        fullWidth={true}
      >
        <DialogTitle>Graphica - The 3D Dataverse</DialogTitle>
        <DialogContent dividers>
          <Button variant="contained" sx={{ mr: 1 }} onClick={handleFileUpload}>
            Load file
          </Button>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          <Button variant="contained">Load sample</Button>
          <Grid container spacing={6} sx={{ mt: 1, mb: 1 }}>
            <Grid size={4}>
              <FormControl sx={{ mb: 2 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Chart Type
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="scatter"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="scatter"
                    control={<Radio />}
                    label="Scatter"
                  />
                  <FormControlLabel
                    value="bar"
                    control={<Radio />}
                    label="Bar"
                  />
                  <FormControlLabel
                    value="line"
                    control={<Radio />}
                    label="Line"
                  />
                </RadioGroup>
              </FormControl>
              <Autocomplete
                value={xOption}
                options={axisOptions}
                sx={{ width: "100%", mb: 2 }}
                renderInput={(params) => (
                  <TextField {...params} label="X-Axis" />
                )}
                onChange={setXAxis}
              />
              <Autocomplete
                value={yOption}
                options={axisOptions}
                sx={{ width: "100%", mb: 2 }}
                renderInput={(params) => (
                  <TextField {...params} label="Y-Axis" />
                )}
                onChange={setYAxis}
              />
              <Autocomplete
                value={zOption}
                options={axisOptions}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Z-Axis" />
                )}
                onChange={setZAxis}
              />
            </Grid>
            <Grid size={8}>
              <Box>
                <img src="./images/3D.jpg" className="w-100" />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6">{fileStatus}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OptionsDialog;
