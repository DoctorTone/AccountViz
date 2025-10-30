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
  const valuesOut = Object.values(totalsOut);
  const maxOut = Math.min(...valuesOut) * -1;

  const totalsIn = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value > 0.1)
  );

  // Get max
  const valuesIn = Object.values(totalsIn);
  const maxIn = Math.max(...valuesIn);

  // Get bigger of two
  const max = Math.max(maxIn, maxOut);
  const scale = max / BAR_CHART.MAX_HEIGHT;

  return (
    <>
      {Object.entries(totalsOut).map(([key, value], index) => {
        const height = -value / scale / 2;
        return (
          <>
            <Cylinder
              key={`${key}_out`}
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

      {Object.entries(totalsIn).map(([key, value], index) => {
        const height = value / scale / 2;
        return (
          <>
            <Cylinder
              key={`${key}_in`}
              position={[
                BAR_CHART.INCOMING_START + index * BAR_CHART.GAP,
                height,
                0,
              ]}
              args={[BAR_CHART.RADIUS, BAR_CHART.RADIUS, value / scale]}
            >
              <meshStandardMaterial color={"blue"} />
            </Cylinder>
            <Text
              position={[
                BAR_CHART.INCOMING_START + index * BAR_CHART.GAP,
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
