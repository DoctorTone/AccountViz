import { useEffect, useState } from "react";
// import { useThree, useFrame } from "@react-three/fiber";
import useStore from "../state/store";

const RADIUS = 0.5;
const Visualisation = () => {
  const [outGoings, setOut] = useState(0);
  const [inComings, setIn] = useState(0);
  const selectedRows = useStore((state) => state.selectedRows);
  // const { camera } = useThree();

  useEffect(() => {
    if (!selectedRows.length) return;

    let totalIn = 0;
    let totalOut = 0;

    for (let i = 0; i < selectedRows.length; ++i) {
      const amount = selectedRows[i].amount;
      if (amount < 0) {
        totalOut += amount;
      } else {
        totalIn += amount;
      }
    }

    setOut(totalOut * -1);
    setIn(totalIn);
  }, [selectedRows]);

  // useFrame(() => {
  //   // DEBUG
  //   console.log("Cam = ", camera.position);
  // });

  return (
    <>
      <mesh position={[2, 5, 0]}>
        <cylinderGeometry args={[RADIUS, RADIUS, 10]} />
        <meshStandardMaterial color="green" />
      </mesh>
      <mesh position={[-2, outGoings / 20, 0]}>
        <cylinderGeometry args={[RADIUS, RADIUS, outGoings / 10]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
};

export default Visualisation;
