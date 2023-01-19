import * as uuid from "uuid";
import {
  createUniverse,
  definedAndNotNull,
  PositioningBuilder,
  SceneBuilder,
} from "../../../src/main";
import { ExampleUniverseData } from "../../common/ExampleUniverseData";

const builder = new SceneBuilder("test_device");
builder.addGround();
builder.addDeviceMarker({ positioning: PositioningBuilder.fixed(2, -2, 0) });
builder.addDeviceMarker({ positioning: PositioningBuilder.fixed(0, 2, 0) });
const scene = builder.build();

console.log(scene);

createUniverse(
  definedAndNotNull(document.querySelector("#app")),
  new ExampleUniverseData(),
  scene
);
