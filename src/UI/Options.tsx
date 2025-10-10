import { useControls } from "leva";
import useStore from "../state/store";
import { Vector3 } from "three";

const Options = () => {
  const data = useControls({
    sphereScale: {
      value: 0.1,
      min: 0.05,
      max: 2,
      onChange: (v) => {},
    },
    sphereColour: {
      value: "#0000ff",
      onChange: (value) => {},
    },
    dataScale: {
      value: 1,
      min: 0.1,
      max: 5000,
      onChange: (scale) => {},
    },
  });

  return null;
};

export default Options;
