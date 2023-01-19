import { Quaternion } from "three";
import { IQuaternion } from "@formant/data-sdk";

export function quaternion({ x, y, z, w }: IQuaternion): Quaternion {
  return new Quaternion(x, y, z, w);
}
