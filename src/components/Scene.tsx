import useStore from "../state/store";
import Visualisation from "./Visualisation";

const Scene = () => {
  const visualisationEnabled = useStore((state) => state.visualisationEnabled);

  return <>{visualisationEnabled && <Visualisation />}</>;
};

export default Scene;
