import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './reset.css';


ReactDOM.createRoot(document.getElementById('universe-3d-viewer') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <canvas id="threejs-canvas" />
  </React.StrictMode>
)
