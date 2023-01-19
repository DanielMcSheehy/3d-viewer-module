import { FormantProvider } from "@formant/ui-sdk";
import * as React from "react";
import { IUniverseData } from "@formant/universe-core";
import { createRoot } from "react-dom/client";
import { SceneGraphElement, Universe } from "./main";

function ViewerApp(props: { data: IUniverseData; scene: SceneGraphElement[] }) {
  return (
    <Universe
      initialSceneGraph={props.scene}
      universeData={props.data}
      mode="edit"
    />
  );
}

export function createUniverse(
  el: Element,
  data: IUniverseData,
  scene: SceneGraphElement[]
) {
  const root = createRoot(el);
  root.render(
    <FormantProvider>
      <ViewerApp data={data} scene={scene} />
    </FormantProvider>
  );
}
