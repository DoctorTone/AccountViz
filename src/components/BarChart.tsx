import { Cylinder, Text } from "@react-three/drei";
import { BAR_CHART } from "../state/Config";
import useStore from "../state/store";

type CategoryTotals = {
  [key: string]: number[];
};

interface BarChartProps {
  data: CategoryTotals;
  config: {
    offset: number;
    maxValue: number;
    minValue: number;
    invertY: boolean;
  };
}

export const BarChart = ({ data, config }: BarChartProps) => {
  const outColour = useStore((state) => state.outgoingColour);
  const inColour = useStore((state) => state.incomingColour);
  const VATColour = useStore((state) => state.VATColour);
  const textScale = useStore((state) => state.textScale);
  const barChartGap = useStore((state) => state.barChartGap);
  const barChartStart = useStore((state) => state.barChartStart);

  return (
    <>
      {Object.entries(data).map(([key, [total, vat]], index) => {
        // DEBUG
        console.log("Offset = ", config.offset);
        let start = barChartStart;
        let gap = barChartGap;
        let colour = inColour;
        let scale = config.maxValue / BAR_CHART.MAX_HEIGHT;
        if (total < 0 && config.invertY) {
          total *= -1;
          vat *= -1;
          start *= -1;
          gap *= -1;
          colour = outColour;
          scale = -config.minValue / BAR_CHART.MAX_HEIGHT;
        }
        const height = (total - vat) / scale;
        const textHeight = total / scale;
        return (
          <group key={`${key}_out`}>
            <Cylinder
              position={[start + index * gap, height / 2, config.offset * 3]}
              args={[BAR_CHART.RADIUS, BAR_CHART.RADIUS, height]}
            >
              <meshStandardMaterial color={colour} />
            </Cylinder>
            {vat > 0 ? (
              <Cylinder
                position={[
                  start + index * gap,
                  height + vat / scale / 2,
                  config.offset * 3,
                ]}
                args={[BAR_CHART.RADIUS, BAR_CHART.RADIUS, vat / scale]}
              >
                <meshStandardMaterial color={VATColour} />
              </Cylinder>
            ) : null}
            <Text
              position={[
                start + index * gap,
                textHeight + BAR_CHART.TEXT_OFFSET,
                config.offset * 3,
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
