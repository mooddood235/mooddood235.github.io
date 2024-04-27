import { useEffect, useState } from 'react'
import './App.css'
import { useRef } from 'react';
import * as THREE from 'three';
import { MathUtils } from 'three';
import { easeOut, motion } from 'framer-motion';
import { lerp } from 'three/src/math/MathUtils.js';

function App({resources}){
  const [state, setState] = useState({
    page:'HOME'
  });
  const [cursorPos, setCursorPos] = useState({x:0, y:0});
  const handleMouseMove = (e)=>{
    setCursorPos({x:e.clientX, y:e.clientY});
  }
  return (
    <div id='app' onMouseMove={handleMouseMove}>
      <Three resources={resources}/>
      <Home cursorPos={cursorPos}/>
      <About/>
    </div>
  )
}
function About(){
  return (
    <div id='about'>
      <div id='about_content'>
        <div id='about_title'>About Me</div>
        <div id='about_textblock'>
        Greetings! I'm <JetBrainsBold text='Mahmoud Zeidan'/>, currently pursuing my fifth year in Computer Science at
        the University of Toronto. My love for logic, mathematics, and art finds its home in the world
        of Computer Science, where I merge and manifest my passions into complex and innovative projects.
        Whether I'm diving into the the world of <JetBrainsBold text='graphics rendering'/>
        , <JetBrainsBold text='game development'/>, <JetBrainsBold text='web development'/>,
        or <JetBrainsBold text='programming languages'/>, I'm always on the lookout for new challenges and avenues of exploration.
        <br/><br/>
        Curious about my endeavors? Feel free to explore my projects page and GitHub. 
        </div>
      </div>
    </div>
  )
}
function JetBrainsBold({text}){
  return <div className='jetbrains_bold'>{text}</div>
}
function Home({cursorPos}){
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
        <Nav/>
      </motion.div>
    </div>
  )
}
function Nav(){
  return (
    <motion.div id='nav'
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{delay:2, duration:2}}
    >
      <ul>
        <li><NavElement text='ABOUT'/></li>
        <li><NavElement text='SKILLS'/></li>
        <li><NavElement text='PROJECTS'/></li>
      </ul>
    </motion.div>
  )
}
function NavElement({text}){
  const [state, setState] = useState('not-hovered');
  return (
    <motion.div className='nav_element'
      onHoverStart={()=>setState('hovered')}
     onHoverEnd={()=>setState('not-hovered')}
     animate={{marginLeft:state==='hovered'?'1em':'0em'}}
    >
      {text}
      <motion.div className='underline'
        initial={{width:'0%'}}
        animate={{width:state==='hovered'?'100%':'0%'}}
      >
      </motion.div>
    </motion.div>
  )
}
function Three({resources}){
  const canvasRef = useRef(null);
  
  useEffect(()=>{  
    var state = 'hidden';

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
    object.visible = false;
    scene.add(object);
    renderer.compile(scene, camera);
  
    var timeStart;
    var rotationZ;
    render();

    function CreateGeometry(){
      const geometry = new THREE.TorusKnotGeometry(10, 3, 800 * 2, 55 * 2, 2,3);
      geometry.computeTangents();
      return geometry;
    }
    function CreateMaterial(resources){
      var material = new THREE.MeshPhysicalMaterial({
        specularIntensity:1.0,
        roughness:0.0,
        color:new THREE.Color(0.0, 0.0, 0.0),
        envMap:resources.envTexture,
        wireframe:false
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

      if (state === 'hidden' && time >= 3.0){
        rotationZ = MathUtils.degToRad(-15);
        object.rotation.x = MathUtils.degToRad(-15);
        object.visible = true;
        state = 'moveObject';
        timeStart = time;
      }
      if (state === 'moveObject'){
        if (material.userData.shader) material.userData.shader.uniforms.time.value = time;

        const scrollT = window.scrollY / (document.documentElement.scrollHeight / 2);

        object.rotation.y = MathUtils.degToRad(lerp(-15, 15, scrollT));
        rotationZ += MathUtils.degToRad(Math.sin(time) * 0.2);
        object.rotation.z = rotationZ;
        
        object.position.x = lerp(15, -19, scrollT);

        const t = (time - timeStart) / 2;
        if (t <= 1) object.position.y = lerp(-50, 0, easeOut(t));
      }
      renderer.render(scene, camera);
      requestAnimationFrame(render);
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
