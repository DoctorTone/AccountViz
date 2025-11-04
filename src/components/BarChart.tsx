import { Cylinder, Text } from "@react-three/drei";
import { BAR_CHART } from "../state/Config";
import useStore from "../state/store";

type CategoryTotals = {
  [key: string]: number[];
};

interface BarChartProps {
  data: CategoryTotals;
  offset: number;
}

export const BarChart = ({ data, offset }: BarChartProps) => {
  const outColour = useStore((state) => state.outgoingColour);
  const inColour = useStore((state) => state.incomingColour);
  const VATColour = useStore((state) => state.VATColour);
  const textScale = useStore((state) => state.textScale);
  const totalsOut = Object.fromEntries(
    Object.entries(data).filter(([_, [total, __]]) => total < -0.1)
  );

  // Get max (of negative values)
  let maxOut = 0;
  Object.entries(data).forEach(([_, [total, __]]) => {
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
          <group key={`${key}_out`}>
            <Cylinder
              position={[
                BAR_CHART.OUTGOING_START + index * -BAR_CHART.GAP,
                height / 2,
                offset * 3,
              ]}
              args={[BAR_CHART.RADIUS, BAR_CHART.RADIUS, height]}
            >
              <meshStandardMaterial color={outColour} />
            </Cylinder>
            {newVat > 0 ? (
              <Cylinder
                position={[
                  BAR_CHART.OUTGOING_START + index * -BAR_CHART.GAP,
                  height + newVat / scale / 2,
                  offset * 3,
                ]}
                args={[BAR_CHART.RADIUS, BAR_CHART.RADIUS, newVat / scale]}
              >
                <meshStandardMaterial color={VATColour} />
              </Cylinder>
            ) : null}
            <Text
              position={[
                BAR_CHART.OUTGOING_START + index * -BAR_CHART.GAP,
                textHeight + BAR_CHART.TEXT_OFFSET,
                offset * 3,
              ]}
              scale={textScale}
              color={"black"}
              fontSize={0.5}
            >
              {`${key} £${-total.toFixed(2)} `}
              {newVat > 0 && `(£${newVat.toFixed(2)})`}
            </Text>
          </group>
        );
      })}

      {Object.entries(totalsIn).map(([key, [total, vat]], index) => {
        const height = (total - vat) / scale;
        const textHeight = total / scale;
        return (
          <group key={`${key}_in`}>
            <Cylinder
              position={[
                BAR_CHART.INCOMING_START + index * BAR_CHART.GAP,
                height / 2,
                0,
              ]}
              args={[BAR_CHART.RADIUS, BAR_CHART.RADIUS, height]}
            >
              <meshStandardMaterial color={inColour} />
            </Cylinder>
            {vat > 0 ? (
              <Cylinder
                position={[
                  BAR_CHART.INCOMING_START + index * BAR_CHART.GAP,
                  height + vat / scale / 2,
                  0,
                ]}
                args={[BAR_CHART.RADIUS, BAR_CHART.RADIUS, vat / scale]}
              >
                <meshStandardMaterial color={VATColour} />
              </Cylinder>
            ) : null}
            <Text
              position={[
                BAR_CHART.INCOMING_START + index * BAR_CHART.GAP,
                textHeight + BAR_CHART.TEXT_OFFSET,
                0,
              ]}
              scale={textScale}
              color={"black"}
              fontSize={0.5}
            >
              {`${key} £${total.toFixed(2)} `}
              {vat > 0 && `(£${vat.toFixed(2)})`}
            </Text>
          </group>
        );
      })}
    </>
  );
};
