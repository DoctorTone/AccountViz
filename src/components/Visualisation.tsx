import { useEffect, useState } from "react";
// import { useThree, useFrame } from "@react-three/fiber";
import useStore from "../state/store";

const RADIUS = 0.5;
const Visualisation = () => {
  const [outGoings, setOut] = useState(0);
  const [inComings, setIn] = useState(0);
  const selectedRows = useStore((state) => state.selectedRows);
  const vizType = useStore((state) => state.vizType);
  // const { camera } = useThree();

  useEffect(() => {
    if (!selectedRows.length) return;

    // DEBUG
    console.log("Data = ", selectedRows);

    switch (vizType) {
      case "Incomings":
        {
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
        }
        break;

      case "Transaction":
        {
        }
        break;

      case "Categories":
        {
          const catTypes = {
            Misc: 0,
            Accountants: 0,
            Consumables: 0,
            "Web hosting": 0,
            Subscriptions: 0,
            "Training material": 0,
            "Computer equipment": 0,
          };

          selectedRows.forEach((row) => {
            catTypes[row.category] += row.amount * -1;
          });

          const cats = [];
          for (const [key, value] of Object.entries(catTypes)) {
            if (value > 0) {
              cats.push(key);
            }
          }
          // DEBUG
          console.log("Cats = ", cats);
        }
        break;

      default:
        break;
    }
  }, [selectedRows, vizType]);

  // useFrame(() => {
  //   // DEBUG
  //   console.log("Cam = ", camera.position);
  // });

  return (
    <>
      <mesh position={[2, inComings / 20, 0]}>
        <cylinderGeometry args={[RADIUS, RADIUS, inComings / 10]} />
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
