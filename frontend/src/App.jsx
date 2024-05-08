import { useEffect, useState } from 'react'
import './App.css'
import { useRef } from 'react';
import * as THREE from 'three';
import { MathUtils } from 'three';
import { easeOut, motion } from 'framer-motion';
import { lerp } from 'three/src/math/MathUtils.js';

function App({resources}){
  const [cursorPos, setCursorPos] = useState({x:0, y:0});
  const handleMouseMove = (e)=>{
    setCursorPos({x:e.clientX, y:e.clientY});
  }
  return (
    <div id='app' onMouseMove={handleMouseMove}>
      <Three resources={resources}/>
      <Home cursorPos={cursorPos}/>
      <About/>
      <Skills/>
      <Projects/>
    </div>
  )
}
function Projects(){
  const atriumImages = [
    'https://github.com/mooddood235/Atrium/assets/62807754/17e96540-e867-493f-92f1-31be59419331',
    'https://github.com/mooddood235/Atrium/assets/62807754/beb7890d-c105-47b4-bbcb-379d67a44754',
    'https://github.com/mooddood235/Atrium/assets/62807754/27bb77d2-aa7d-4556-aed3-3b83dfd99470',
    'https://github.com/mooddood235/Atrium/assets/62807754/f69eba2e-00cb-4ed3-a765-fbb59e1f73c7',
    'https://github.com/mooddood235/Atrium/assets/62807754/9220260e-4bda-4e71-9172-a84ff2507838',
    'https://github.com/mooddood235/Atrium/assets/62807754/0617baa8-8c7d-452a-8b04-f57d980c4ec2',
    'https://github.com/mooddood235/Atrium/assets/62807754/6506b029-5107-4045-ad1b-a7421d825bbd',
    'https://github.com/mooddood235/Atrium/assets/62807754/375ceb78-53f5-4a02-9ca7-0d98b2238f62',
    'https://github.com/mooddood235/Atrium/assets/62807754/1576cc34-b7f7-4ca6-ad61-4a0bc96b5d27'
  ];
  const myCraftImages = [
    'https://github.com/mooddood235/MyCraft/assets/62807754/c87498ae-8652-4ab9-b1cd-6a7993b832b8',
    'https://github.com/mooddood235/MyCraft/assets/62807754/3dd3f9cb-edd5-4281-a455-71eccd0aeaea',
    'https://github.com/mooddood235/MyCraft/assets/62807754/1d1f1c30-e0cc-4ca7-a645-3cbb73c8d235',
    'https://github.com/mooddood235/MyCraft/assets/62807754/6106f9a3-35de-4df6-a683-ff50a7b6dd2e'
  ];
  const slimeImages = [
    'https://github.com/mooddood235/Slime-Simulation/assets/62807754/72d75da1-f800-4cee-bc67-463bfc6c9b8a',
    'https://github.com/mooddood235/Slime-Simulation/assets/62807754/701ddd40-917a-4b88-897b-87c3b9d8fa8a',
    'https://github.com/mooddood235/Slime-Simulation/assets/62807754/2d6b1f00-5262-465c-8f80-34dfa4810585',
    'https://github.com/mooddood235/Slime-Simulation/assets/62807754/1042c236-61ba-4633-ad0a-c5540bcd6636',
    'https://github.com/mooddood235/Slime-Simulation/assets/62807754/ddfad627-2a1f-4e76-9a21-5a1396393a4a',
    'https://github.com/mooddood235/Slime-Simulation/assets/62807754/6caa3c39-c93a-4ea1-aff3-89cad4c3b95a'
  ];
  const metaBallsImages = [
    'https://github.com/mooddood235/MetaBalls/assets/62807754/b537e09d-5415-4edf-98ff-5cdc92031b7b',
    'https://github.com/mooddood235/MetaBalls/assets/62807754/145beef7-e3c8-47df-860a-4eb0bbb67542',
    'https://github.com/mooddood235/MetaBalls/assets/62807754/be7f5d69-8a34-42a2-8f41-fa22a3ea97b2',
    'https://github.com/mooddood235/MetaBalls/assets/62807754/ef698954-1595-4546-a358-40700da54d51'
  ];
  return (
    <div id='projects'>
      <div id='projects_title'>Projects</div>
      <div id='projects_showcase'>
        <Project name='Atrium' desc='A GPU accelerated path tracer written in GLSL.' images={atriumImages}/>
        <Project name='MyCraft' desc='A Minecraft clone written in Unity.' images={myCraftImages}/>
        <Project name='Slime-Simulation' desc='A GPU accelerated simulation of the Physarum Polycephalum slime mold organism.' images={slimeImages}/>
        <Project name='MetaBalls' desc='A 2D metaball simulation utilizing computer shaders.' images={metaBallsImages}/>
      </div>
    </div>
  )
}
function Project({name, desc, images}){
  function linkClickHandler(){
    window.open(`https://github.com/mooddood235/${name}`);
  }
  return (
    <div className='project'>
      <div className='project_name'>{name}</div>
      <div onClick={linkClickHandler} className='project_link'>
        <div className='fa fa-github'/>
      </div>
      <div className='project_description'>{desc}</div>
      <ProjectImages images={images}/>
    </div>
  )
}
function ProjectImages({images}){
  return (
    <div className='project_images'>
      {images.map((item, index)=>(
        <img key={index} src={item}/>
      ))}
    </div>
  )
}
function Skills(){
  const folderPath = 'src/assets/skills_pictures';
  const languagesFileNames = [
    ['C++.png', 'C++'],
    ['Csharp.png', 'C#'],
    ['C.png', 'C'],
    ['Python.png', 'Python'],
    ['JavaScript.png', 'JavaScript'],
    ['HTML.png', 'HTML'],
    ['CSS.png', 'CSS'],
    ['PostgreSQL.png', 'PostgreSQL'],
    ['Racket.png', 'Racket'],
    ['Haskell.png', 'Haskell']
  ];
  const librariesFileNames = [
    ['OpenGL.png', 'OpenGL'],
    ['GLTF.png', 'GLTF'],
    ['React.webp', 'React'],
    ['NodeJS.png', 'NodeJS'],
    ['Three.png', 'ThreeJS']
  ];
  const toolsFileNames = [
    ['Unity.png', 'Unity'],
    ['Blender.png', 'Blender'],
    ['VS.png', 'VisualStudio'],
    ['VSCode.webp', 'VSCode'],
    ['Git.png', 'Git'],
    ['GitHub.png', 'GitHub']
  ];

  return (
    <div id='skills'>
      <div id='skills_box'>
        <div id='skills_title'>
          Skills
        </div>
        <SkillsSubtitle title='Programming Languages'/>
        <SkillsGallery folderPath={folderPath} fileNames={languagesFileNames}/>
        <SkillsSubtitle title='Libraries and Specifications'/>
        <SkillsGallery folderPath={folderPath} fileNames={librariesFileNames}/>
        <SkillsSubtitle title='Tools and Software'/>
        <SkillsGallery folderPath={folderPath} fileNames={toolsFileNames}/>
      </div>
    </div>
  )
}
function SkillsSubtitle({title}){
  return (
    <div className='skills_subtitle'>
      {title}
    </div>
  )
}
function SkillsGallery({folderPath, fileNames}){
  return (
    <div className='skills_gallery'>
      {fileNames.map((item, index)=>(
        <SkillsGalleryBox key={index} path={folderPath +'/'+ item[0]} name={item[1]}/>
      ))}
    </div>
  )
}
function SkillsGalleryBox({path, name}){
  return (
    <div className='skills_gallery_box'>
        <img src={path}/>
        {name}
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
        <li><NavElement text='ABOUT' scrollTo={window.innerWidth / 2}/></li>
        <li><NavElement text='SKILLS' scrollTo={window.innerWidth}/></li>
        <li><NavElement text='PROJECTS' scrollTo={window.innerWidth * 2}/></li>
      </ul>
    </motion.div>
  )
}
function NavElement({text, scrollTo}){
  const [state, setState] = useState('not-hovered');
  return (
    <motion.div className='nav_element'
      onClick={()=>window.scrollTo(0, scrollTo)}
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
    object.rotation.x = MathUtils.degToRad(-15);
    var rotationZ = MathUtils.degToRad(-15);
    object.visible = false;
    scene.add(object);

    renderer.compile(scene, camera);
    
    var timeStart;
    setTimeout(()=>{
      requestAnimationFrame((timeStamp)=>{
        timeStart = timeStamp / 1000.0;
        object.visible = true;
        requestAnimationFrame(render);
      })
    }, 2000);

    function CreateGeometry(){
      const geometry = new THREE.TorusKnotGeometry(10, 3, 300*4, 20*4, 2,3);
      geometry.computeTangents();
      return geometry;
    }
    THREE.ShaderChunk.meshphysical_frag
    function CreateMaterial(resources){
      var material = new THREE.MeshPhysicalMaterial({
        specularIntensity:1.0,
        color:new THREE.Color(0.0, 0.0, 0.0),
        roughness:0.0,
        envMap:resources.envTexture
      });
      material.onBeforeCompile = function(shader){
        shader.vertexShader = resources.vertexStr;
        shader.fragmentShader = resources.fragmentStr;

        shader.uniforms.time = {value:0.0};
        shader.uniforms.noiseBlend = {value:0.0};
        shader.uniforms.colorBlend = {value:0.0};
        material.userData.shader = shader;
      }
      return material;
    }
    function render(timeStamp){
      timeStamp /= 1000.0;
      const scrollT0 = MathUtils.clamp(window.scrollY / window.innerHeight * (5/4), 0.0, 1.0);
      const scrollT1 = MathUtils.clamp(window.scrollY / window.innerHeight * (5/4) - (3/2), 0.0, 1.0);

      if (material.userData.shader){
        material.userData.shader.uniforms.time.value = timeStamp;
        material.userData.shader.uniforms.noiseBlend.value = scrollT0;
        material.userData.shader.uniforms.colorBlend.value = scrollT0;
      }
      // Phase 1
      object.rotation.y = MathUtils.degToRad(lerp(-15, 15, scrollT0));
      rotationZ += MathUtils.degToRad(Math.sin(timeStamp) * 0.2);
      object.rotation.z = rotationZ;
      object.position.x = lerp(15, -15, scrollT0);
      // Phase 2
      if (scrollT0 === 1.0){
        object.position.x = lerp(-15, 0, easeOut(scrollT1));
        object.rotation.x = MathUtils.degToRad(lerp(-15, 0, scrollT1));
        object.rotation.y = MathUtils.degToRad(lerp(15, 0, scrollT1));
        object.rotation.z = MathUtils.degToRad(lerp(MathUtils.radToDeg(rotationZ), 0.0, scrollT1));
        camera.fov = lerp(60, 10, Math.pow(scrollT1, 4.0));
        camera.updateProjectionMatrix();
      }
      const t = (timeStamp - timeStart) / 2;
      if (t <= 1) object.position.y = lerp(-50, 0, easeOut(t));

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
