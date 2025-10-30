import { GizmoHelper, GizmoViewport, Grid } from "@react-three/drei";
import { GRID } from "../state/Config";

const gridConfig = {
  cellColor: "#ababab",
  sectionColor: "#555555",
  cellThickness: 1,
};

const SceneHelpers = () => {
  return (
    <>
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
          labelColor="white"
        />
      </GizmoHelper>
      <Grid
        position={[0, 0, 0]}
        args={[GRID.WIDTH, GRID.HEIGHT]}
        {...gridConfig}
      />
    </>
  );
};

export default SceneHelpers;
