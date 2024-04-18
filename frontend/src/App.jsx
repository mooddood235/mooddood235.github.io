import { useEffect, useState } from 'react'
import './App.css'
import { useRef } from 'react';
import * as THREE from 'three';
import { MathUtils } from 'three';
import { motion } from 'framer-motion';

function App({resources}){
  const [state, setState] = useState({page:'home'});
  const [cursorPos, setCursorPos] = useState({x:0, y:0});
  const handleMouseMove = (e)=>{
    setCursorPos({x:e.clientX, y:e.clientY});
  }
  return (
    <div id='app' onMouseMove={handleMouseMove}>
      <Nav/>
      {state.page === 'home' ? <Home cursorPos={cursorPos} resources={resources}/> : null}
    </div>
  )
}
function Nav(){
  const keyframes = [
    {height:'5em'},
    {color:'black'},
    {height:'2em'}
  ]

  return (
    <motion.div id='nav'
      initial={{height:'0em'}}
      animate={{height:'6.5vh'}}
      transition={{delay:2, duration:2.5}}
    >
      <NavElement text='HOME'/>
    </motion.div>
    
  )
}
function NavElement({text}){
  return (
    <motion.div className='nav_element'
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:2.1, duration:0.5}}
    >
      {text}
    </motion.div>
  )
}
function Home({cursorPos, resources}){
  const topOffset = (cursorPos.y / window.innerHeight) * 2.0 - 1.0;
  const leftOffset = (cursorPos.x / window.innerWidth) * 2.0 - 1.0;
  const strength = 2.0;

  const shadowStyle = {
    top:`${10 + topOffset * strength}%`,
    left:`${-10 + leftOffset * strength}%`
  }
  return (
    <div id='home'>
      <motion.div id='name'
        animate={{marginRight:'40%'}}
        transition={{delay:2, duration:2}}
      >
        Mahmoud<br/>
        Zeidan
        <div id='shadow' style={shadowStyle}>
          Mahmoud<br/>
          Zeidan
        </div>
      </motion.div>
      <Three resources={resources}/>
    </div>
  )
}
function Three({resources}){
  const canvasRef = useRef(null);
  
  useEffect(()=>{  
    const renderer = new THREE.WebGLRenderer({alpha:true}); 
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;
    
    const geometry = CreateGeometry();
    var material = CreateMaterial(resources);
    
    const object = new THREE.Mesh( geometry, material );
    object.position.z = -30;
    object.position.x = 15;
    object.rotation.y = MathUtils.degToRad(-15);
    object.rotation.z = MathUtils.degToRad(-15);
    object.rotation.x = MathUtils.degToRad(-15);
    scene.add( object );
  
    render();
  
    function CreateGeometry(){
      const geometry = new THREE.TorusKnotGeometry(10, 3, 1500, 300, 2,3);
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
    function render(){
      const time = performance.now() / 1000.0;
      requestAnimationFrame(render);
  
      if (material.userData.shader)
        material.userData.shader.uniforms.time.value = time;
  
      object.rotation.z += MathUtils.degToRad(Math.sin(time) * 0.2);
  
      renderer.render(scene, camera);
    }
    window.addEventListener('resize', function(){
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }, []);
  return (
    <div id='three' ref={canvasRef}/>
  )
}

export default App
