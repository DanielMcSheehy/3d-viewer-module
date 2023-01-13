import * as React from "react";
import { createRoot } from "react-dom/client";
import { FormantProvider } from "@formant/ui-sdk";
import { Authentication, App } from "@formant/data-sdk";
import { LiveUniverseData } from "@formant/universe-connector";
import { defined, Universe } from "../src/main";
import { createScene } from "./createScene";
import { SimulatedUniverseData } from "./SimulatedUniverseData";
import configTest from "./configTest.json";

// get query parameter demo
const urlParams = new URLSearchParams(window.location.search);
const demo = urlParams.get("demo");


function ViewerApp() {
  const [config, setConfig] = React.useState(null);
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const authenticate = async () => {
      await Authentication.waitTilAuthenticated().then(
        () => {
          setAuthenticated(Authentication.isAuthenticated);
        }
      );
      const moduleConfiguration = JSON.parse(defined(await App.getCurrentModuleConfiguration()));

      setConfig(moduleConfiguration);
    };
    authenticate();
  }, [])
  // const data =
  //    demo === "true" ? new SimulatedUniverseData(config) : new LiveUniverseData();

  return (

    (authenticated && config) ? (<Universe
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
