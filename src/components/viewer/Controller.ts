import { Group, Raycaster } from 'three';

export interface IController {
  raycaster: Raycaster;
  handedness: any;
  pulse(intensity: number, duration: number): void;
}
export type Controller = Group & IController;
