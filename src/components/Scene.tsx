import { Stage } from "@react-three/drei";
import useStore from "../state/store";
import Visualisation from "./Visualisation";

const Scene = () => {
  const visualisationEnabled = useStore((state) => state.visualisationEnabled);

  return (
    <Stage adjustCamera={false} center={{ disable: true }} shadows={"contact"}>
      {visualisationEnabled && <Visualisation />}
    </Stage>
  );
};

export default Scene;
