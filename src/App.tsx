import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import DaySky from "./components/DaySky";
import { CAMERA } from "./state/Config";
import Scene from "./components/Scene";
import SceneHelpers from "./components/SceneHelpers";
import UI from "./UI/UI";
import Lights from "./components/Lights";

function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{
          position: CAMERA.POSITION,
          near: CAMERA.NEAR,
          far: CAMERA.FAR,
          fov: 45,
        }}
      >
        <DaySky />
        <Lights />
        <Scene />
        <SceneHelpers />
        <OrbitControls
          enablePan={true}
          enableRotate={true}
          enableDamping={true}
        />
      </Canvas>
      <UI />
    </>
  );
}

export default App;
