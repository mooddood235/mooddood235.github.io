import { useState } from 'react'
import './App.css'
import TypeWriter from 'typewriter-effect'

function App(){
  return (
    <Intro/>  
  )
}
function Intro(){
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
    <div id='intro'>
      Hello, I am
      <div id='name'>Mahmoud Zeidan</div>
      <div id='typewriter_container'>
        I love&nbsp;
        <div id='typewriter'><TypeWriter options={typeWriterOptions}></TypeWriter></div>
      </div>
    </div>
  )
}

export default App
