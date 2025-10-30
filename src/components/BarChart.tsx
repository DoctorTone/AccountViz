import { Cylinder } from "@react-three/drei";

type CategoryTotals = {
  [key: string]: number;
};

interface BarChartProps {
  data: CategoryTotals;
}

export const BarChart = ({ data }: BarChartProps) => {
  const totalsOut = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value < -0.1)
  );

  // Get max (of negative values)
  const values = Object.values(totalsOut);
  const max = Math.min(...values) * -1;
  const scale = max / 10;
  // DEBUG
  console.log("Totals = ", totalsOut);
  console.log("Max = ", max);
  return (
    <>
      {Object.entries(totalsOut).map(([_, value], index) => {
        return (
          <Cylinder
            position={[index * 4, -value / scale / 2, 0]}
            args={[0.5, 0.5, -value / scale]}
          >
            <meshStandardMaterial color={"red"} />
          </Cylinder>
        );
      })}
    </>
  );
};
