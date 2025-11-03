import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import useStore from "../state/store";

const Time = () => {
  const currentPeriod = useStore((state) => state.currentPeriod);
  const selectNextMonth = useStore((state) => state.selectNextMonth);
  const selectPrevMonth = useStore((state) => state.selectPrevMonth);

  return (
    <div id="period" className="panel">
      <Typography variant="h6">Period: {currentPeriod}</Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton onClick={() => selectPrevMonth()}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton onClick={() => selectNextMonth()}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default Time;
