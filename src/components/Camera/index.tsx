import * as THREE from 'three';
import Sizes from '../../utils/Sizes';
import ThreeComponent from '../ThreeComponent';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


export default class Camera {
    private threeComponent;
    private sizes: Sizes;
    public instance!: THREE.PerspectiveCamera;
    private scene;
    private canvas;
    public controls!: OrbitControls;

    constructor() {
        this.threeComponent = new ThreeComponent();

        this.sizes = this.threeComponent.sizes;
        this.scene = this.threeComponent.scene;
        this.canvas = this.threeComponent.canvas;
        console.log(this.canvas);

        this.setInstance();
        this.setOrbitControls();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        )

        this.instance.position.set(6, 4, 8);
        this.scene.add(this.instance);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }
}
