import React, { useContext, useState, useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Video from './pages/video/Video'
import { SetContext } from './contexts/setContext'

const App = () => {
const {themeMode} = useContext(SetContext);

useEffect(() => {
  document.querySelector('html').classList.remove('light', 'dark');
  document.querySelector('html').classList.add(themeMode)
}, [themeMode]);

  return (
    <div className='font-Roboto dark:bg-gray-950 dark:text-white'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/video/:categoryId/:videoId' element={<Video />} />
      </Routes>
    </div>
  )
}

export default App
