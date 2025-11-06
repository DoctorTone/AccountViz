import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import useStore from "../state/store";
import { type VizType } from "../state/Config";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";

const Views = () => {
  const vizType = useStore((state) => state.vizType);
  const showAllData = useStore((state) => state.showAllData);
  const setVisualisationType = useStore((state) => state.setVisualisationType);
  const setShowAllData = useStore((state) => state.setShowAllData);
  const [visualType, setType] = useState<VizType>(vizType);
  const [showAll, setShowAll] = useState(showAllData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const visType = event.target.value as VizType;
    setType(visType);
    setVisualisationType(visType);
  };

  const toggleShowAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const toggle = event.target.checked;
    setShowAll(toggle);
    setShowAllData(toggle);
  };

  return (
    <div id="views" className="panel">
      <FormControl>
        <FormLabel id="view-labels">Viz Options</FormLabel>
        <RadioGroup
          aria-labelledby="view-labels"
          defaultValue="in"
          name="view-labels-group"
          value={visualType}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Incomings"
            control={<Radio />}
            label="In/Out"
          />
          <FormControlLabel
            value="Transaction"
            control={<Radio />}
            label="Transaction"
          />
          <FormControlLabel
            value="Categories"
            control={<Radio />}
            label="Categories"
          />
        </RadioGroup>
      </FormControl>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={showAll} onChange={toggleShowAll} />}
          label="View all"
        />
      </FormGroup>
    </div>
  );
};

export default Views;
