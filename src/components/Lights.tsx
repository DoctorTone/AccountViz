import { Environment } from "@react-three/drei";

const Lights = () => {
  return (
    <>
      <Environment preset="sunset" environmentIntensity={0.3} />
      <ambientLight intensity={0.5} />
      <pointLight intensity={20} position={[0, 6, 8]} />
    </>
  );
};

export default Lights;
