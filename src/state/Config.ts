import { Vector3 } from "three";

const CAMERA = {
  POSITION: new Vector3(0, 1, 6),
  NEAR: 0.01,
  FAR: 10000,
};

const SPHERE = {
  SCALE: 0.1,
};

export type RawData = {
  [key: string]: unknown;
};

export { CAMERA, SPHERE };
