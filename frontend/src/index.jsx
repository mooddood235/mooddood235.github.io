import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import './index.css'
import { api_getshaders } from './api.js';
import { MathUtils } from 'three/src/math/MathUtils.js';


GetResources((resources)=>{
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App resources={resources}/>
  )
})
function GetResources(cb){
  api_getshaders(function(data0){
    const loader = new RGBELoader();
    loader.load('/src/assets/studio.hdr', 
    (envTexture)=>{
      envTexture.mapping = THREE.EquirectangularReflectionMapping;
      cb({...data0, envTexture})
    },
    (xhr)=>{},
    (error)=>console.error(error))
  })
}