import { useState } from 'react'
import './App.css'
import TypeWriter from 'typewriter-effect'

function App(){
  return (
    <Intro/>
  )
}
function Intro(){
  return (
    <div id='intro'>
      <IntroInfo/>
      <IntroPicture/>
    </div>
  )
}
function IntroInfo(){
  const typeWriterOptions = {
    strings:[
      'computer graphics.',
      'web development.',
      'programming languages.'
    ],
    autoStart:true,
    loop:true
  }
  return (
    <div id='intro_info'>
      Hello, I am
      <div id='name'>Mahmoud Zeidan</div>
      <div id='typewriter_container'>
        I love&nbsp;
        <div id='typewriter'><TypeWriter options={typeWriterOptions}></TypeWriter></div>
      </div>
    </div>
  )
}
function IntroPicture(){
  return (
    <div id='intro_picture'>
      <img src='./src/assets/picture_placeholder.png'></img>
    </div>
  )
}

export default App
