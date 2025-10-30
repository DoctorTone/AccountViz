import { Cylinder } from "@react-three/drei";
import { BAR_CHART } from "../state/Config";

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
  const scale = max / BAR_CHART.MAX_HEIGHT;
  // DEBUG
  console.log("Totals = ", totalsOut);
  console.log("Max = ", max);
  return (
    <>
      {Object.entries(totalsOut).map(([key, value], index) => {
        return (
          <Cylinder
            key={key}
            position={[index * BAR_CHART.GAP, -value / scale / 2, 0]}
            args={[BAR_CHART.RADIUS, BAR_CHART.RADIUS, -value / scale]}
          >
            <meshStandardMaterial color={"red"} />
          </Cylinder>
        );
      })}
    </>
  );
};
