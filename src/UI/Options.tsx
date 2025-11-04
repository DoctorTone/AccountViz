import { useControls } from "leva";
import useStore from "../state/store";

const Options = () => {
  const setOutColour = useStore((state) => state.setOutColour);
  const setInColour = useStore((state) => state.setInColour);
  const setVATColour = useStore((state) => state.setVATColour);
  const setTextScale = useStore((state) => state.setTextScale);

  const data = useControls({
    OutColour: {
      value: "#ff0000",
      onChange: (colour) => {
        setOutColour(colour);
      },
    },
    InColour: {
      value: "#0000ff",
      onChange: (colour) => {
        setInColour(colour);
      },
    },
    VATColour: {
      value: "yellow",
      onChange: (colour) => {
        setVATColour(colour);
      },
    },
    TextScale: {
      value: 1,
      min: 0.1,
      max: 2,
      step: 0.1,
      onChange: (scale) => {
        setTextScale(scale);
      },
    },
  });

  return null;
};

export default Options;
