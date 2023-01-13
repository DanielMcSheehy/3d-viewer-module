import * as React from "react";
import { createRoot } from "react-dom/client";
import { FormantProvider } from "@formant/ui-sdk";
import { Authentication, Fleet, App } from "@formant/data-sdk";
import { LiveUniverseData } from "@formant/universe-connector";
import { defined, LayerRegistry, Universe } from "../src/main";
import { SimulatedUniverseData } from "./SimulatedUniverseData";
import { createScene } from "./createScene";
import { TestLayer } from "./TestLayer";
import configTest from "./configTest.json";

// get query parameter demo
const urlParams = new URLSearchParams(window.location.search);
const demo = urlParams.get("demo");
// let moduleConfiguration = configTest;

// LayerRegistry.register(TeleportLayer);
LayerRegistry.register(TestLayer);



function ViewerApp() {
  const [config, setConfig] = React.useState(configTest);
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const getDevice = async () => {
      await Authentication.waitTilAuthenticated().then(
        () => {
          console.log(Authentication.token)
          setAuthenticated(Authentication.isAuthenticated);
        }
      );
      const device = await Fleet.getCurrentDevice();
      console.log(device);
      console.log(device.getConfiguration());

      console.log(await device.getTelemetry('base_station.location', new Date(Date.now() - 2000), new Date()));
      console.log(await device.getTelemetry('eko.localization.odom', new Date(Date.now() - 2000), new Date()));
      console.log(JSON.parse(defined(await App.getCurrentModuleConfiguration())));


      // const moduleConfiguration = JSON.parse(defined(await App.getCurrentModuleConfiguration()));

      // setConfig(moduleConfiguration);
      setConfig(configTest);
      // console.log(moduleConfiguration)
    };
    getDevice();
  }, [])
  // const data =
  //    demo === "true" ? new SimulatedUniverseData(config) : new LiveUniverseData();

  return (

    authenticated ? (<Universe
      initialSceneGraph={createScene(config)}
      universeData={new LiveUniverseData()}
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
