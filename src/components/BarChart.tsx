import { Cylinder, Text } from "@react-three/drei";
import { BAR_CHART } from "../state/Config";

type CategoryTotals = {
  [key: string]: number[];
};

interface BarChartProps {
  data: CategoryTotals;
}

export const BarChart = ({ data }: BarChartProps) => {
  const totalsOut = Object.fromEntries(
    Object.entries(data).filter(([_, [total, vat]]) => total < -0.1)
  );

  // Get max (of negative values)
  let maxOut = 0;
  Object.entries(data).forEach(([key, [total, vat]]) => {
    if (total < maxOut) {
      maxOut = total;
    }
  });
  maxOut *= -1;

  const totalsIn = Object.fromEntries(
    Object.entries(data).filter(([_, [total, vat]]) => total > 0.1)
  );

  // Get max
  let maxIn = 0;
  Object.entries(data).forEach(([key, [total, vat]]) => {
    if (total > maxIn) {
      maxIn = total;
    }
  });

  // Get bigger of two
  const max = Math.max(maxIn, maxOut);
  const scale = max / BAR_CHART.MAX_HEIGHT;

  return (
    <>
      {Object.entries(totalsOut).map(([key, [total, vat]], index) => {
        const newVat = -vat;
        const newTotal = -total;
        const height = (newTotal - newVat) / scale;
        const textHeight = newTotal / scale;
        return (
          <>
            <Cylinder
              key={`${key}_out`}
              position={[
                BAR_CHART.OUTGOING_START + index * -BAR_CHART.GAP,
                height / 2,
                0,
              ]}
              args={[BAR_CHART.RADIUS, BAR_CHART.RADIUS, height]}
            >
              <meshStandardMaterial color={"red"} />
            </Cylinder>
            {newVat > 0 ? (
              <Cylinder
                position={[
                  BAR_CHART.OUTGOING_START + index * -BAR_CHART.GAP,
                  height + newVat / scale / 2,
                  0,
                ]}
                args={[BAR_CHART.RADIUS, BAR_CHART.RADIUS, newVat / scale]}
              >
                <meshStandardMaterial color={"green"} />
              </Cylinder>
            ) : null}
            <Text
              position={[
                BAR_CHART.OUTGOING_START + index * -BAR_CHART.GAP,
                textHeight + BAR_CHART.TEXT_OFFSET,
                0,
              ]}
              color={"black"}
              fontSize={0.5}
            >
              {`${key} £${-total.toFixed(2)}`}
            </Text>
          </>
        );
      })}

      {Object.entries(totalsIn).map(([key, [total, vat]], index) => {
        const height = total / scale / 2;
        return (
          <>
            <Cylinder
              key={`${key}_in`}
              position={[
                BAR_CHART.INCOMING_START + index * BAR_CHART.GAP,
                height,
                0,
              ]}
              args={[BAR_CHART.RADIUS, BAR_CHART.RADIUS, total / scale]}
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
              {`${key} £${total.toFixed(2)}`}
            </Text>
          </>
        );
      })}
    </>
  );
};
