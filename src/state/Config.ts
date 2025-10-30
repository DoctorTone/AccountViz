import { Vector3 } from "three";

export const CAMERA = {
  POSITION: new Vector3(0, 11, 14.5),
  NEAR: 0.01,
  FAR: 1000,
};

export const GRID = {
  WIDTH: 90,
  HEIGHT: 30,
};

export const BAR_CHART = {
  OUTGOING_START: -1,
  INCOMING_START: 1,
  MAX_HEIGHT: 10,
  GAP: 4,
  RADIUS: 0.5,
  TEXT_OFFSET: 0.5,
};

export const gridConfig = {
  cellColor: "#ababab",
  sectionColor: "#999",
  cellThickness: 1,
};

export type VizType = "Incomings" | "Transaction" | "Categories";

export const ExpensesList = [
  "Misc",
  "Accountants",
  "Consumables",
  "Web hosting",
  "Subscriptions",
  "Training material",
  "Computer equipment",
];
