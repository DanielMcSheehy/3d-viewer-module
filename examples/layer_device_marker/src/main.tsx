import {
  createUniverse,
  definedAndNotNull,
  PositioningBuilder,
  LayerBuilder,
} from "../../../src/main";
import { ExampleUniverseData } from "../../common/ExampleUniverseData";

createUniverse(
  definedAndNotNull(document.querySelector("#app")),
  new ExampleUniverseData(),
  [
    LayerBuilder.ground(),
    LayerBuilder.deviceMarker({
      positioning: PositioningBuilder.fixed(2, -2, 0),
    }),
    LayerBuilder.deviceMarker({
      positioning: PositioningBuilder.fixed(0, 2, 0),
    }),
  ]
);
