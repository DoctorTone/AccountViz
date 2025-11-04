import { useControls } from "leva";
import useStore from "../state/store";
import { Vector3 } from "three";

const Options = () => {
  const data = useControls({
    OutColour: {
      value: "#ff0000",
      onChange: (v) => {},
    },
    InColour: {
      value: "#0000ff",
      onChange: (value) => {},
    },
    VATColour: {
      value: "yellow",
      onChange: (scale) => {},
    },
  });

  return null;
};

export default Options;
