import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Authentication, Fleet } from '@formant/data-sdk'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FormantColor } from './formantColor';
import { GroundPlane } from './objects/GroundPlane';
import { Axes } from './objects/Axes';

function App() {
  const [count, setCount] = useState(0)
  const [telemetry, setTelemetry] = useState(null);
  const getDevice = async ()=> {
    await Authentication.waitTilAuthenticated();
    const device = await Fleet.getCurrentDevice();
    console.log(device);
    const data = await device.getLatestTelemetry();
    setTelemetry(data);
    console.log(data);
  }



  useEffect(() => {
    getDevice();

    const root = new THREE.Object3D();
    const scene = new THREE.Scene();
    scene.add(root);
    root.rotateX(-Math.PI / 2);

    scene.background = new THREE.Color(FormantColor.module);
    scene.add(new THREE.AxesHelper());

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 2;
    camera.position.y = 2;
    camera.position.x = 2;
    
    const canvas = document.getElementById('threejs-canvas') || undefined;
    const renderer = new THREE.WebGL1Renderer({
      canvas,
      antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight('#BAC4E2', 1);

    root.add(new GroundPlane());
    root.add(new Axes(false));

    
    scene.add(ambientLight);


    const controls = new OrbitControls(camera, renderer.domElement);

    const animate = () => {
      renderer.render(scene, camera);
      controls.update();
      window.requestAnimationFrame(animate);
    }

    animate();
  },[])

  return (
    <div className="App">
      <canvas id="threejs-canvas" />
    </div>
  )
}

export default App
