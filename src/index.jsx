import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

GetResources((resources)=>{
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App resources={resources}/>
  )
})
function GetResources(cb){
  const loader = new RGBELoader();
  loader.load('/studio.hdr', (envTexture) =>{
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    fetch('./src/vertex.glsl')
    .then(response=>response.text())
    .then(vertexStr=>{
      fetch('./src/fragment.glsl')
      .then(response=>response.text())
      .then(fragmentStr=>{
        cb({vertexStr, fragmentStr, envTexture});
      })
    });
  },
  (xhr)=>{},
  (error)=>console.error(error));
}