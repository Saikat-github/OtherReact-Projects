import React from 'react'
import Home from './pages/home/Home'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Player from './pages/player/Player'
import { useState } from 'react'



const App = () => {
  const [signState, setSignState] = useState(false);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login signState={signState} setSignState={setSignState}/>} />
        <Route path='/player' element={<Player />} />
      </Routes>
    </div>
  )
}

export default App