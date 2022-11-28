import React from 'react';
import Sizes from '../../utils/Sizes';
import Time from '../../utils/TIme';
import * as THREE from 'three';
import Camera from '../Camera'
import Renderer from '../Renderer'
import { FormantColor } from '../../formantColor';

let instance: null | ThreeComponent = null;

export default class ThreeComponent {
  public canvas: any;
  public sizes!: Sizes;
  public scene!: THREE.Scene;
  public camera!: Camera;
  public renderer!: Renderer;
  public time!: Time;

  constructor(_canvas?: any) {
    if (instance) {
      return instance;
    }
    instance = this;

    this.canvas = _canvas;
    this.sizes = new Sizes();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();

    this.scene.background = new THREE.Color(FormantColor.module);

    this.sizes.on('resize', () => {
      // arrow function to not lose context
      this.resize();
    })

    this.time.on('tick', () => {
      this.update()
    })
  }

  resize() {
    this.camera?.resize();
    this.renderer?.resize();
  }

  update() {
    this.camera?.update();
    this.renderer?.update();
  }


  destroy() {
    this.sizes?.off('resize');
    this.camera?.controls.dispose()
    this.renderer?.instance.dispose()
  }
}

