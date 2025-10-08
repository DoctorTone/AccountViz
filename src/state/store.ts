import { create } from "zustand";
import { SPHERE, type RawData } from "./Config";
import type { Vector3 } from "three";

interface DataState {
  rawData: RawData[];
  setData: (data: RawData[]) => void;
  pointData: Vector3[];
  setPointData: (data: Vector3[]) => void;
  dataLoaded: boolean;
  setDataLoaded: (status: boolean) => void;
  axisOptions: string[];
  setAxisOptions: (options: string[]) => void;
  selectedAxes: string[];
  setAxes: (axes: string[]) => void;
  sphereScale: number;
  setSphereScale: (scale: number) => void;
  sphereColour: string;
  setSphereColour: (colour: string) => void;
  dataScale: number;
  setDataScale: (scale: number) => void;
}

const useStore = create<DataState>((set) => ({
  rawData: [],
  pointData: [],
  dataLoaded: false,
  setData: (data) => set(() => ({ rawData: [...data] })),
  setDataLoaded: (status) => set(() => ({ dataLoaded: status })),
  setPointData: (data) =>
    set(() => ({ pointData: [...data], dataLoaded: true })),
  axisOptions: [],
  setAxisOptions: (options) => set(() => ({ axisOptions: options })),
  selectedAxes: [],
  setAxes: (axes) => set(() => ({ selectedAxes: axes })),
  sphereScale: SPHERE.SCALE,
  setSphereScale: (scale) => set(() => ({ sphereScale: scale })),
  sphereColour: "#0000ff",
  setSphereColour: (colour) => set(() => ({ sphereColour: colour })),
  dataScale: 1,
  setDataScale: (scale) => set(() => ({ dataScale: scale })),
}));

export default useStore;
