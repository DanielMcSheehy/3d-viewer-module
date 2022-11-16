import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Authentication, Fleet } from '@formant/data-sdk'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 50;
    camera.position.y = 50;
    camera.position.x = 50;
    
    const canvas = document.getElementById('threejs-canvas') || undefined;
    const renderer = new THREE.WebGL1Renderer({
      canvas,
      antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight('#BAC4E2', 1);
    scene.background = new THREE.Color('#2d3855');
    scene.add(new THREE.AxesHelper());
    scene.add(new THREE.GridHelper(100, 100, '#BAC4E2'));
    scene.add(ambientLight);

    const boxMesh = new THREE.Mesh(
      new THREE.BoxGeometry(16,16,16),
      new THREE.MeshNormalMaterial()
    )
    scene.add(boxMesh);

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
