import { useControls } from "leva";
import useStore from "../state/store";
import { Vector3 } from "three";

const Options = () => {
  const setSphereScale = useStore((state) => state.setSphereScale);
  const setSphereColour = useStore((state) => state.setSphereColour);
  const setPointData = useStore((state) => state.setPointData);
  const setDataScale = useStore((state) => state.setDataScale);

  const data = useControls({
    sphereScale: {
      value: 0.1,
      min: 0.05,
      max: 2,
      onChange: (v) => {
        setSphereScale(v);
      },
    },
    sphereColour: {
      value: "#0000ff",
      onChange: (value) => {
        setSphereColour(value);
      },
    },
    dataScale: {
      value: 1,
      min: 0.1,
      max: 5000,
      onChange: (scale) => {
        const pointData = useStore.getState().pointData;
        const dataScale = useStore.getState().dataScale;

        if (pointData.length === 0) return;

        let points: Vector3[] = [];
        points = pointData.map((point) => {
          point.multiplyScalar(1 / dataScale);
          point.multiplyScalar(scale);
          return point;
        });

        setPointData(points);
        setDataScale(scale);
      },
    },
  });

  return null;
};

export default Options;
