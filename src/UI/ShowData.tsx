import Button from "@mui/material/Button";
import useStore from "../state/store";

const ShowData = () => {
  const setDataLoaded = useStore((state) => state.setDataLoaded);
  const visualisationEnabled = useStore((state) => state.visualisationEnabled);

  return (
    <div id="showData" className="panel">
      <Button
        disabled={!visualisationEnabled}
        onClick={() => setDataLoaded(true)}
        variant="contained"
      >
        Show Data
      </Button>
    </div>
  );
};

export default ShowData;
