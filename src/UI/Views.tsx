import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import useStore from "../state/store";
import { type VizType } from "../state/Config";

const Views = () => {
  const vizType = useStore((state) => state.vizType);
  const setVisualisationType = useStore((state) => state.setVisualisationType);
  const [visualType, setType] = useState<VizType>(vizType);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const visType = event.target.value as VizType;
    setType(visType);
    setVisualisationType(visType);
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
    </div>
  );
};

export default Views;
