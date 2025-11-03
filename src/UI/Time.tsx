import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import useStore from "../state/store";

const Time = () => {
  const currentPeriod = useStore((state) => state.currentPeriod);
  const selectNextMonth = useStore((state) => state.selectNextMonth);
  const selectPrevMonth = useStore((state) => state.selectPrevMonth);

  return (
    <div id="period" className="panel">
      <Typography variant="h6">Period: {currentPeriod}</Typography>
      <IconButton onClick={() => selectPrevMonth()}>
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton onClick={() => selectNextMonth()}>
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
};

export default Time;
