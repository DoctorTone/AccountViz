import Button from "@mui/material/Button";
import useStore from "../state/store";

const ShowData = () => {
  const setDataLoaded = useStore((state) => state.setDataLoaded);

  return (
    <div id="showData" className="panel">
      <Button onClick={() => setDataLoaded(true)} variant="contained">
        Show Data
      </Button>
    </div>
  );
};

export default ShowData;
