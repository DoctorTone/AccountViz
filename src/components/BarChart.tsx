import { Cylinder, Text } from "@react-three/drei";
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
        const height = -value / scale / 2;
        return (
          <>
            <Cylinder
              key={key}
              position={[
                BAR_CHART.OUTGOING_START + index * -BAR_CHART.GAP,
                height,
                0,
              ]}
              args={[BAR_CHART.RADIUS, BAR_CHART.RADIUS, -value / scale]}
            >
              <meshStandardMaterial color={"red"} />
            </Cylinder>
            <Text
              position={[
                BAR_CHART.OUTGOING_START + index * -BAR_CHART.GAP,
                height * 2 + BAR_CHART.TEXT_OFFSET,
                0,
              ]}
              color={"black"}
              fontSize={0.5}
            >
              {key}
            </Text>
          </>
        );
      })}
    </>
  );
};
