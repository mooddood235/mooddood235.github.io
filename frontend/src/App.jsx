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
      <Skills/>
      <Projects/>
    </div>
  )
}
function Projects(){
  const atriumImages = [
    'https://github.com/mooddood235/Atrium/assets/62807754/beb7890d-c105-47b4-bbcb-379d67a44754',
    'https://github.com/mooddood235/Atrium/assets/62807754/6506b029-5107-4045-ad1b-a7421d825bbd'
  ];

  return (
    <div id='projects'>
      <div id='projects_showcase'>
        <Project title='Atrium' images={atriumImages}/>
        <Project title='MyCraft' images={[]}/>
        <Project title='PotentialPotato' images={[]}/>
      </div>
    </div>
  )
}
function Project({title, images}){
  return (
    <div className='project'>
      <div className='project_title'>{title}</div>
      <ProjectImageShowcase images={images}/>
    </div>
  )
}
function ProjectImageShowcase({images}){
  return (
    <div className='project_image_showcase'>
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
