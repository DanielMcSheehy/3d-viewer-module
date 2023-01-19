import * as uuid from "uuid";
import {
  createUniverse,
  definedAndNotNull,
  SceneGraphElement,
} from "../../../src/main";
import { ExampleUniverseData } from "../../common/ExampleUniverseData";

const scene: SceneGraphElement[] = [
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

createUniverse(
  definedAndNotNull(document.querySelector("#app")),
  new ExampleUniverseData(),
  scene
);
