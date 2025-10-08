import { Canvas } from "@react-three/fiber";
import {
  Sky,
  Stage,
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  Grid,
  Box,
} from "@react-three/drei";
import { CAMERA } from "./state/Config";
import Plot from "./components/Plot";
import useStore from "./state/store";
import OptionsDialog from "./components/OptionsDialog";
import Settings from "./UI/Settings";
import Options from "./UI/Options";
import { Leva } from "leva";

function App() {
  const dataLoaded = useStore((state) => state.dataLoaded);

  return (
    <>
      <Canvas
        shadows
        camera={{
          position: CAMERA.POSITION,
          near: CAMERA.NEAR,
          far: CAMERA.FAR,
        }}
      >
        <Sky
          distance={450000}
          sunPosition={[0, 1, 1]}
          inclination={0}
          azimuth={0.25}
        />
        <Stage adjustCamera={false} shadows={false} environment="city">
          {dataLoaded && <Plot />}
        </Stage>

        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
            labelColor="white"
          />
        </GizmoHelper>
        <Grid position={[0, 0, 0]} args={[10.5, 10.5]} />
        <OrbitControls
          enablePan={true}
          enableRotate={true}
          enableDamping={true}
        />
      </Canvas>
      <OptionsDialog />
      <Options />
      <Settings />
      <div style={{ position: "fixed", top: 10, left: 10 }}>
        <Leva fill collapsed={true} />
      </div>
    </>
  );
}

export default App;
