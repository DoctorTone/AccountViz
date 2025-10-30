import { useEffect, useState, useMemo } from "react";
// import { useThree, useFrame } from "@react-three/fiber";
import useStore from "../state/store";

const RADIUS = 0.5;
const MIN_AMOUNT = 0.1;
const Visualisation = () => {
  const [outGoings, setOut] = useState(0);
  const [inComings, setIn] = useState(0);
  const selectedRows = useStore((state) => state.selectedRows);
  const vizType = useStore((state) => state.vizType);

  if (!selectedRows.length) {
    return null;
  }

  const categoryTotals = useMemo(() => {
    switch (vizType) {
      case "Incomings":
        {
          const totals = {
            in: 0,
            out: 0,
          };

          for (let i = 0; i < selectedRows.length; ++i) {
            const amount = selectedRows[i].amount;
            if (amount < 0) {
              totals.out += amount;
            } else {
              totals.in += amount;
            }
          }

          return totals;
        }
        break;

      case "Categories":
        {
          const totals = {
            Misc: 0,
            Accountants: 0,
            Consumables: 0,
            "Web hosting": 0,
            Subscriptions: 0,
            "Training material": 0,
            "Computer equipment": 0,
          };

          selectedRows.forEach((row) => {
            totals[row.category] += row.amount;
          });

          return totals;
        }
        break;

      default:
        break;
    }
  }, [selectedRows, vizType]);

  return (
    <>
      <mesh position={[2, inComings / 20, 0]}>
        <cylinderGeometry args={[RADIUS, RADIUS, inComings / 10]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-2, outGoings / 20, 0]}>
        <cylinderGeometry args={[RADIUS, RADIUS, outGoings / 10]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
};

export default Visualisation;
