import { useControls } from "leva";
import useStore from "../state/store";

const Options = () => {
  const setOutColour = useStore((state) => state.setOutColour);
  const setInColour = useStore((state) => state.setInColour);
  const setVATColour = useStore((state) => state.setVATColour);

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
  });

  return null;
};

export default Options;
