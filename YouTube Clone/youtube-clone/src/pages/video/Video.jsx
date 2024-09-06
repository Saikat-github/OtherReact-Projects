import React, { useContext } from 'react'
import PlayVideo from '../../components/play-video/PlayVideo'
import Recommended from '../../components/recommended/Recommended'
import { useParams } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'


const Video = () => {
  const {videoId, categoryId} = useParams();
  

  return (
    <div className="play-container sm:px-10 py-4 flex flex-col lg:flex-row">
      <Sidebar />
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId}/>
    </div>
  )
}

export default Video