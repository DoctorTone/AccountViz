import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Views = () => {
  return (
    <div id="views" className="panel">
      <FormControl>
        <FormLabel id="view-labels">View</FormLabel>
        <RadioGroup
          aria-labelledby="view-labels"
          defaultValue="in"
          name="view-labels-group"
        >
          <FormControlLabel value="in" control={<Radio />} label="In/Out" />
          <FormControlLabel
            value="types"
            control={<Radio />}
            label="Transaction"
          />
          <FormControlLabel
            value="cats"
            control={<Radio />}
            label="Categories"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Views;
