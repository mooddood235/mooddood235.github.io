import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import './index.css'
import { api_getshaders } from './api.js';
import { MathUtils } from 'three/src/math/MathUtils.js';

const renderWidth = window.innerWidth;
const renderHeight = window.innerHeight;

GetResources(Main);

function Main(resources){
  const renderer = new THREE.WebGLRenderer({alpha:true}); 
  renderer.setSize(renderWidth, renderHeight);
  ApplyRendererDomElementStyles();
  //document.getElementById('three').appendChild(renderer.domElement);
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, renderWidth / renderHeight, 0.1, 1000 );
  camera.position.z = 5;
  
  const geometry = CreateGeometry();
  var material = CreateMaterial(resources);
  
  const object = new THREE.Mesh( geometry, material );
  object.position.z = -30;
  object.rotation.y = MathUtils.degToRad(-15);
  object.rotation.z = MathUtils.degToRad(-15);
  object.rotation.x = MathUtils.degToRad(-15);
  scene.add( object );

  function render(){
    const time = performance.now() / 1000.0;
    requestAnimationFrame(render);

    if (material.userData.shader)
      material.userData.shader.uniforms.time.value = time;

    object.rotation.z += MathUtils.degToRad(Math.sin(time) * 0.2);

    renderer.render(scene, camera);
  }
  window.addEventListener('resize', function(){
    camera.aspect = renderWidth / renderHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(renderWidth, renderHeight);
  });
  function ApplyRendererDomElementStyles(){
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
  }
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  render();  
}

function CreateGeometry(){
  const geometry = new THREE.TorusKnotGeometry(10, 3, 1500, 300, 2,3);
  //const geometry = new THREE.IcosahedronGeometry(10, 200);
  // var indices = [];
  // for (var i = 0; i < geometry.getAttribute('position').count; i++){
  //   indices.push(i);
  // }
  // geometry.setIndex(indices);
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