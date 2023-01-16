import * as THREE from 'three';
import { UniverseLayer } from './UniverseLayer';

export class DeviceDotLayer extends UniverseLayer {
  static layerTypeId = 'deviceDot';

  static commonName = 'Device Dot';

  static description =
    'Sphere with arrow to represent device location and orientation';

  geo = new THREE.SphereGeometry(0.1);

  mat = new THREE.MeshBasicMaterial({ color: 0x20a0ff });

  sphere = new THREE.Mesh(this.geo, this.mat);

  arrowPoints = [
    new THREE.Vector2(-0.075, 0.12),
    new THREE.Vector2(0, 0.23),
    new THREE.Vector2(0.075, 0.125),
    new THREE.Vector2(0, 0.14),
  ];

  arrowGeo = new THREE.ShapeGeometry(new THREE.Shape(this.arrowPoints));

  arrowMat = new THREE.MeshBasicMaterial();

  arrow = new THREE.Mesh(this.arrowGeo, this.arrowMat);

  init() {
    this.add(this.sphere);
    this.add(this.arrow);
  }

  destroy(): void {
    this.geo.dispose();
    this.mat.dispose();
  }
}
