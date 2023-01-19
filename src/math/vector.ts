import { Vector3 } from "three";
import { IVector3 } from "@formant/data-sdk";

export function vector({ x, y, z }: IVector3): Vector3 {
  return new Vector3(x, y, z);
}
