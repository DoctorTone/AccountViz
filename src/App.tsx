import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  Grid,
} from "@react-three/drei";
import DaySky from "./components/DaySky";
import { CAMERA } from "./state/Config";
import useStore from "./state/store";
import OptionsDialog from "./components/OptionsDialog";
import Settings from "./UI/Settings";
import Options from "./UI/Options";
import { Leva } from "leva";
import Scene from "./components/Scene";
import SceneHelpers from "./components/SceneHelpers";

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
        <DaySky />
        <Scene />
        <SceneHelpers />
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
