import { Vector3 } from "three";

export const CAMERA = {
  POSITION: new Vector3(0, 11, 14.5),
  NEAR: 0.01,
  FAR: 1000,
};

export const GRID = {
  WIDTH: 35,
  HEIGHT: 20,
};

export const BAR_CHART = {
  OUTGOING_START: -1,
  MAX_HEIGHT: 10,
  GAP: 4,
  RADIUS: 0.5,
  TEXT_OFFSET: 0.5,
};

export type VizType = "Incomings" | "Transaction" | "Categories";
