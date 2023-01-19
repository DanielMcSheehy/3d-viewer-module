import { ITransform } from "@formant/data-sdk";

export interface ITransformTreeNode {
  name: string;
  transform: ITransform;
  children?: ITransformTreeNode[];
}

export async function load(path: string): Promise<ITransformTreeNode> {
  const response = await fetch(path, { mode: "cors" });
  return response.json();
}
