import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import './index.css'
import { api_getshaders } from './api.js';

GetResources(Main);

function Main(resources){
  const renderer = new THREE.WebGLRenderer({alpha:true}); 
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('three').appendChild(renderer.domElement);
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;
  
  const geometry = CreateGeometry();
  var material = CreateMaterial(resources);
  
  const sphere = new THREE.Mesh( geometry, material );
  sphere.position.y = -5;
  sphere.position.z = 0;
  scene.add( sphere );

  function render(){
    requestAnimationFrame(render);
    if (material.userData.shader)
      material.userData.shader.uniforms.time.value = performance.now() / 1000.0;
    renderer.render(scene, camera);
  }
  window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  render();  
}
function CreateGeometry(){
  const geometry = new THREE.IcosahedronGeometry(4.5, 150);
  var indices = [];
  for (var i = 0; i < geometry.getAttribute('position').count; i++){
    indices.push(i);
  }
  geometry.setIndex(indices);
  geometry.computeTangents();
  return geometry;
}
function CreateMaterial(resources){
  var material = new THREE.MeshPhysicalMaterial({
    specularIntensity:1.0,
    roughness:0.0,
    color:new THREE.Color(0.1, 0.1, 0.1),
    envMap:resources.envTexture
  });
  material.onBeforeCompile = function(shader){
    shader.vertexShader = resources.vertexStr;
    shader.uniforms.time = {value:0.0};
    material.userData.shader = shader;
  }
  return material;
}
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