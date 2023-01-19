import {
  createUniverse,
  definedAndNotNull,
  LayerBuilder,
} from "../../../src/main";
import { ExampleUniverseData } from "../../common/ExampleUniverseData";

createUniverse(
  definedAndNotNull(document.querySelector("#app")),
  new ExampleUniverseData(),
  [
    LayerBuilder.ground(),
    LayerBuilder.map({
      longitude: 0,
      latitude: 0,
    }),
  ]
);
