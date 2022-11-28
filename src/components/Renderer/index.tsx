import * as THREE from 'three';
import { FormantColor } from '../../formantColor';
import Sizes from '../../utils/Sizes';
import Camera from '../Camera';
import ThreeComponent from '../ThreeComponent';

export default class Renderer {
    private threeComponent;
    public instance!: THREE.WebGLRenderer;
    private sizes: Sizes;
    private canvas;
    private camera: Camera;
    private scene: THREE.Scene;

    constructor() {
        this.threeComponent = new ThreeComponent();
        this.sizes = this.threeComponent.sizes;
        this.canvas = this.threeComponent.canvas;
        this.camera = this.threeComponent.camera;
        this.scene = this.threeComponent.scene;
        this.setInstance();
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer(
            {
                canvas: this.canvas,
                antialias: true
            }
        );
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio);
        this.instance.setClearColor(FormantColor.module)
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.instance.render(this.scene, this.camera.instance)
    }

}