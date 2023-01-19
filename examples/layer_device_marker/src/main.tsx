import {
  createUniverse,
  definedAndNotNull,
  PositioningBuilder,
  SceneBuilder,
} from "../../../src/main";
import { ExampleUniverseData } from "../../common/ExampleUniverseData";

createUniverse(
  definedAndNotNull(document.querySelector("#app")),
  new ExampleUniverseData(),
  [
    SceneBuilder.ground(),
    SceneBuilder.deviceMarker({
      positioning: PositioningBuilder.fixed(2, -2, 0),
    }),
    SceneBuilder.deviceMarker({
      positioning: PositioningBuilder.fixed(2, -2, 0),
    }),
  ]
);
