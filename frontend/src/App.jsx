import { useState } from 'react'
import './App.css'
import TypeWriter from 'typewriter-effect'

function App(){
  return (
    <div id='app'>
      <Home/>
    </div>
  )
}
function Home(){
  return (
    <div id='home'>
      <div id='name'>
        Mahmoud<br/>
        Zeidan
        <div id='shadow'>
          Mahmoud<br/>
          Zeidan
        </div>
      </div>
    </div>
  )
}

export default App
