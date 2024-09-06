import React, { useContext, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'

const Home = () => {

  return (
    <div className='dark:bg-gray-950 dark:text-white'>
    <Sidebar />
    <Feed/>
    </div>
  )
}

export default Home