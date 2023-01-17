import * as uuid from "uuid";
import { SceneGraphElement } from "../src/main";

export function createDemoScene(): SceneGraphElement[] {
  return [
    {
      id: uuid.v4(),
      editing: false,
      type: "ground",
      name: "Ground",
      deviceContext: undefined,
      children: [],
      visible: true,
      position: { type: "manual", x: 0, y: 0, z: 0 },
      fieldValues: {},
      data: {},
    },
    {
      id: uuid.v4(),
      editing: false,
      type: "deviceDot",
      name: "Dot",
      deviceContext: undefined,
      children: [],
      visible: true,
      position: { type: "manual", x: 2, y: -2, z: 0 },
      fieldValues: {},
      data: {},
    },
    {
      id: uuid.v4(),
      editing: false,
      type: "deviceDot",
      name: "Dot 2",
      deviceContext: undefined,
      children: [],
      visible: true,
      position: { type: "manual", x: 0, y: 2, z: 0 },
      fieldValues: {},
      data: {},
    },
  ];
}
