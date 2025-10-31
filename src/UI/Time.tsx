import Typography from "@mui/material/Typography";
import useStore from "../state/store";

const Time = () => {
  const month = useStore((state) => state.currentMonth);
  const year = useStore((state) => state.currentYear);

  return (
    <div id="period" className="panel">
      <Typography variant="h6">
        Period: {month} {year.toString()}
      </Typography>
    </div>
  );
};

export default Time;
