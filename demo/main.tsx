import * as React from "react";
import { createRoot } from "react-dom/client";
import { FormantProvider } from "@formant/ui-sdk";
import { Authentication, Fleet, App } from "@formant/data-sdk";
import { LiveUniverseData } from "@formant/universe-connector";
import { defined, LayerRegistry, TeleportLayer, Universe } from "../src/main";
import { SimulatedUniverseData } from "./SimulatedUniverseData";
import { createScene } from "./createScene";
import { TestLayer } from "./TestLayer";
import configTest from "./configTest.json";

// get query parameter demo
const urlParams = new URLSearchParams(window.location.search);
const demo = urlParams.get("demo");
// let moduleConfiguration = configTest;

LayerRegistry.register(TeleportLayer);
LayerRegistry.register(TestLayer);



function ViewerApp() {
  const [config, setConfig] = React.useState(configTest);
  const [authToken, setAuthToken] = React.useState('');
  const data = new LiveUniverseData();

  React.useEffect(() => {
    const getDevice = async () => {
      await Authentication.waitTilAuthenticated().finally(
        () => {
          console.log(Authentication.token)
          setAuthToken(defined(Authentication.token));
        }
      );
      const device = await Fleet.getCurrentDevice();
      console.log(device);
      console.log(device.getConfiguration());

      console.log(await device.getTelemetry('base_station.location', new Date(Date.now() - 2000), new Date()));
      console.log(await device.getTelemetry('eko.localization.odom', new Date(Date.now() - 2000), new Date()));


      // const moduleConfiguration = JSON.parse(defined(await App.getCurrentModuleConfiguration()));

      // setConfig(moduleConfiguration);
      setConfig(configTest);
      // console.log(moduleConfiguration)
    };
    getDevice();
  }, [])
  // const data =
  //    demo === "true" ? new SimulatedUniverseData(config) : new LiveUniverseData();

  window.setInterval(() => {
    data.setTime(new Date());
  }, 60 / 12);

  return (

    authToken ? (<Universe
      initialSceneGraph={createScene(config)}
      universeData={data}
      mode="edit"
      onSceneGraphChange={(_) => {
        // console.log(JSON.stringify(_));
        // console.log(_);
      }}
    />) : (<div>...</div>)

  );
}

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(
    <FormantProvider>
      <ViewerApp />
    </FormantProvider>
  );
}
