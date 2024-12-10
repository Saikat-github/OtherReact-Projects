import React, { useEffect } from 'react'
import { ChatBox, LeftSidebar, RightSidebar } from '../../components'
import { useSelector } from 'react-redux'

const Chat = () => {
  const loading = useSelector((state) => state.loading);

  return (
    <div className=" flex justify-center min-h-screen bg-[url(/background2.jpg)] bg-no-repeat bg-cover">
      {loading ? <div className='my-auto w-16 h-16 border-8 rounded-full border-x-white border-t-white border-b-transparent animate-spin '></div> :
        <div className="chat-container w-full mx-10 grid grid-cols-4 h-screen my-10">
          <LeftSidebar />
          <ChatBox />
          <RightSidebar />
        </div>}
    </div>
  )
}

export default Chat