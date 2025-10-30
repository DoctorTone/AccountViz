import { Cylinder } from "@react-three/drei";

type CategoryTotals = {
  [key: string]: number;
};

interface BarChartProps {
  data: CategoryTotals;
}

export const BarChart = ({ data }: BarChartProps) => {
  let totalsOut = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value < -0.1)
  );

  // DEBUG
  console.log("Totals = ", totalsOut);
  return (
    <>
      {Object.entries(totalsOut).map(([_, value], index) => {
        return (
          <Cylinder position-x={index * 2} args={[1, 1, -value]}>
            <meshStandardMaterial color={"red"} />
          </Cylinder>
        );
      })}
    </>
  );
};
