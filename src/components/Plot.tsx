import useStore from "../state/store";
import { Instance, Instances } from "@react-three/drei";

const Plot = () => {
  const pointData = useStore((state) => state.pointData);
  const sphereScale = useStore((state) => state.sphereScale);
  const sphereColour = useStore((state) => state.sphereColour);

  return (
    <Instances limit={1000}>
      <sphereGeometry />
      <meshStandardMaterial />
      {pointData.map((point, index) => {
        return (
          <Instance
            key={index.toString()}
            scale={sphereScale}
            color={sphereColour}
            position={[point.x, point.y, point.z]}
          />
        );
      })}
    </Instances>
  );
};

export default Plot;
