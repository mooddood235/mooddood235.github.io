import { useState } from 'react'
import './App.css'
import {motion} from "framer-motion"

function App(){
  const [state, setState] = useState({page:'home'});
  const [cursorPos, setCursorPos] = useState({x:0, y:0});
  const handleMouseMove = (e)=>{
    setCursorPos({x:e.clientX, y:e.clientY});
  }
  return (
    <div id='app' onMouseMove={handleMouseMove}>
      <Nav/>
      {state.page === 'home' ? <Home cursorPos={cursorPos}/> : null}
    </div>
  )
}
function Nav(){
  return (
    <div id='nav'>
      <div className='nav_element'>
        HOME
      </div>
    </div>
  )
}
function Home({cursorPos}){
  const topOffset = (cursorPos.y / window.innerHeight) * 2.0 - 1.0;
  const leftOffset = (cursorPos.x / window.innerWidth) * 2.0 - 1.0;
  const strength = 2.0;

  const shadowStyle = {
    top:`${10 + topOffset * strength}%`,
    left:`${-10 + leftOffset * strength}%`
  }
  console.log(topOffset, leftOffset);
  return (
    <div id='home'>
      <div id='name'>
        Mahmoud<br/>
        Zeidan
        <div id='shadow' style={shadowStyle}>
          Mahmoud<br/>
          Zeidan
        </div>
      </div>
    </div>
  )
}

export default App
