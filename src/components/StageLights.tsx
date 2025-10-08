import { ContactShadows } from "@react-three/drei";

export const StageLights = () => {
  return (
    <>
      {/* Ambient fill light */}
      <ambientLight intensity={0.3} />

      {/* Key light (main directional) */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Fill light from the side/back */}
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />

      {/* Contact shadows on the ground */}
      {/* <ContactShadows
        position={[0, -0.99, 0]}
        opacity={0.4}
        width={10}
        height={10}
        blur={2}
        far={5}
        resolution={1024}
        frames={1} // static shadows
      /> */}
    </>
  );
};
