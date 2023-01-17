import * as React from "react";
import { createRoot } from "react-dom/client";
import { FormantProvider } from "@formant/ui-sdk";
import { Authentication, App } from "@formant/data-sdk";
import { TelemetryUniverseData } from "@formant/universe-connector";
import { defined, SceneGraphElement, Universe } from "../src/main";
import { createScene } from "./createScene";
import { SimulatedUniverseData } from "./SimulatedUniverseData";
import configTest from "./configTest.json";
import { debug } from "console";
import { createDemoScene } from "./createDemoScene";

// get query parameter demo
const urlParams = new URLSearchParams(window.location.search);
const demo = urlParams.get("demo");

function ViewerApp() {
  // const [config, setConfig] = React.useState(null);
  const [authenticated, setAuthenticated] = React.useState(true);

  /*  React.useEffect(() => {
    const authenticate = async () => {
      await Authentication.waitTilAuthenticated().then(() => {
        setAuthenticated(Authentication.isAuthenticated);
      });
    };
    authenticate();
  }, []);*/

  const scene = createDemoScene();

  return authenticated && scene ? (
    <Universe
      initialSceneGraph={scene}
      universeData={
        new SimulatedUniverseData({
          longitude: 0,
          latitudue: 0,
        })
      }
      mode="edit"
      onSceneGraphChange={(_) => {
        // console.log(JSON.stringify(_));
        // console.log(_);
      }}
    />
  ) : (
    <div>...</div>
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
