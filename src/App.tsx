import { useState, useEffect } from 'react'
import './App.css'
import { Authentication, Fleet } from '@formant/data-sdk'
import ThreeComponent from './components/ThreeComponent';
import React from 'react';


function App() {
  const [telemetry, setTelemetry] = useState(null);
  const getDevice = async () => {
    await Authentication.waitTilAuthenticated();
    const device = await Fleet.getCurrentDevice();
    console.log(device);
    const data = await device.getLatestTelemetry();
    setTelemetry(data);
    console.log(data);
  }



  useEffect(() => {
    getDevice();
    console.log(document.getElementById('threejs-canvas'))
    const threeComponent = new ThreeComponent(document.getElementById('threejs-canvas'));
  }, [])

  return <></>
}

export default App
