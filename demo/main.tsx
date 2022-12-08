import * as React from "react";
import { createRoot } from "react-dom/client";
import { FormantProvider } from "@formant/ui-sdk";
import { Authentication, Fleet } from '@formant/data-sdk'
import { LayerRegistry, TeleportLayer, Universe } from "../src/main";
import { SimulatedUniverseData } from "./SimulatedUniverseData";
import { createScene } from "./createScene";
import { TestLayer } from "./TestLayer";


LayerRegistry.register(TeleportLayer);
LayerRegistry.register(TestLayer);

const getDevice = async () => {
  await Authentication.waitTilAuthenticated();
  const device = await Fleet.getCurrentDevice();
  console.log(device);
  console.log(device.getAvailableCommands());
  const data = await device.getLatestTelemetry();
  console.log(data);
}

function App() {
  const data = new SimulatedUniverseData();
  console.log(data);
  getDevice();
  window.setInterval(() => {
    data.setTime(new Date());
  }, 60 / 12);
  return (
    <Universe
      initialSceneGraph={createScene()}
      universeData={data}
      mode="edit"
      vr
      onSceneGraphChange={(_) => {
        console.log(JSON.stringify(_));
        console.log(_)
      }}
    />
  );
}

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(
    <FormantProvider>
      <App />
    </FormantProvider>
  );
}
