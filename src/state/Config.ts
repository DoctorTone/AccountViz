import { Vector3 } from "three";

export const CAMERA = {
  POSITION: new Vector3(0, 11, 27.5),
  NEAR: 0.01,
  FAR: 1000,
};

export const GRID = {
  WIDTH: 90,
  HEIGHT: 45,
};

export const BAR_CHART = {
  OUTGOING_START: -2,
  INCOMING_START: 2,
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

export type Expenses =
  | "Misc"
  | "Accountants"
  | "Consumables"
  | "Web hosting"
  | "Subscriptions"
  | "Training material"
  | "Computer equipment"
  | "Invoices";

export type DataRow = {
  id: number;
  date: string;
  transaction: string;
  amount: number;
  description: string;
  vat: boolean;
  category: Expenses;
};

export const ExpensesList = [
  "Misc",
  "Accountants",
  "Consumables",
  "Web hosting",
  "Subscriptions",
  "Training material",
  "Computer equipment",
  "Invoices",
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
