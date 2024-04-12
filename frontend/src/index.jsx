import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import * as THREE from 'three';
import './index.css'
import { api_getshaders } from './api.js';

api_getshaders((data)=>main(data.vertexStr, data.fragStr));

function main(vertexStr, fragStr){
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  
  const geometry = new THREE.IcosahedronGeometry(3, 50);
  const material = new THREE.ShaderMaterial({
    vertexShader:vertexStr,
    fragmentShader:fragStr
  });
  const sphere = new THREE.Mesh( geometry, material );
  scene.add( sphere );
  
  camera.position.z = 5;
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  function render(){
    requestAnimationFrame(render);
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  render();  
}

