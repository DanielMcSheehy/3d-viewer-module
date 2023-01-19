import { FormantProvider } from "@formant/ui-sdk";
import * as uuid from "uuid";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { SceneGraphElement, Universe } from "../../../src/main";
import { ExampleUniverseData } from "../../common/ExampleUniverseData";

function ViewerApp() {
  const scene: SceneGraphElement[] = [
    {
      id: uuid.v4(),
      editing: false,
      type: "ground",
      name: "Ground",
      deviceContext: undefined,
      children: [],
      visible: true,
      position: { type: "manual", x: 0, y: 0, z: 0 },
      fieldValues: {},
      data: {},
    },
    {
      id: uuid.v4(),
      editing: false,
      type: "deviceDot",
      name: "Dot",
      deviceContext: undefined,
      children: [],
      visible: true,
      position: { type: "manual", x: 2, y: -2, z: 0 },
      fieldValues: {},
      data: {},
    },
    {
      id: uuid.v4(),
      editing: false,
      type: "deviceDot",
      name: "Dot 2",
      deviceContext: undefined,
      children: [],
      visible: true,
      position: { type: "manual", x: 0, y: 2, z: 0 },
      fieldValues: {},
      data: {},
    },
  ];

  return scene ? (
    <Universe
      initialSceneGraph={scene}
      universeData={new ExampleUniverseData()}
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
