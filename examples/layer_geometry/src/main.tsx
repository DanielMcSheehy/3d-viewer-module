import {
  createUniverse,
  DataSourceBuilder,
  definedAndNotNull,
  LayerBuilder,
} from "../../../src/main";
import { ExampleUniverseData } from "../../common/ExampleUniverseData";

createUniverse(
  definedAndNotNull(document.querySelector("#app")),
  new ExampleUniverseData(),
  [
    LayerBuilder.ground(),
    LayerBuilder.geometry({
      dataSources: [DataSourceBuilder.telemetry("geo", "json")],
    }),
  ]
);
