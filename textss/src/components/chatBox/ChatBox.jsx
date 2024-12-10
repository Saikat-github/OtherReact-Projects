import React, { useEffect, useState } from 'react'
import assets from '../../assets/assets'
import { useDispatch, useSelector } from 'react-redux'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { loadMessages, setChatVisible } from '../../features/chat/chatSlice';
import { db } from '../../config/firebase';
import { toast } from 'react-toastify';
import { Timestamp } from "firebase/firestore";
import { upload } from '../../lib/upload';

const ChatBox = () => {
  const userData = useSelector((state) => state.userData);
  const messagesId = useSelector((state) => state.messagesId);
  const chatUser = useSelector((state) => state.chatUser);
  const messages = useSelector((state) => state.messages);
  const chatVisible = useSelector((state) => state.chatVisible);
  


  const [input, setInput] = useState("");
  const dispatch = useDispatch();


  const sendMessage = async () => {
    console.log(userData)
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, 'messages', messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date()
          })
        })

        const userIDs = [chatUser.rId, userData.id];
        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, 'chat', id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatData.findIndex((c) => c.messageId === messagesId);
            userChatData.chatData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatData[chatIndex].rId === userData.id) {
              userChatData.chatData[chatIndex].messageSeen = false
            }
            await updateDoc(userChatsRef, {
              chatData: userChatData.chatData
            })
          }
        })
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error)
    }
    setInput("");
  }

  //send image function
  const sendImage = async (e) => {
    try {
      const fileUrl = await upload(e.target.files[0]);
      if (fileUrl && messagesId) {
        await updateDoc(doc(db, 'messages', messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            image: fileUrl,
            createdAt: new Date()
          })
        })


        const userIDs = [chatUser.rId, userData.id];
        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, 'chat', id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatData.findIndex((c) => c.messageId === messagesId);
            userChatData.chatData[chatIndex].lastMessage = "Image";
            userChatData.chatData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatData[chatIndex].rId === userData.id) {
              userChatData.chatData[chatIndex].messageSeen = false
            }
            await updateDoc(userChatsRef, {
              chatData: userChatData.chatData
            })
          }
        })
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  //convert timestamp
  const convertTime = (timestamp) => {
    const date = new Date(timestamp);
    const istTime = date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    return istTime;
  }

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, 'messages', messagesId), (res) => {
        const loadedMessages = res.data().messages.map(message => ({
          ...message,
          createdAt: message.createdAt instanceof Timestamp
            ? message.createdAt.toDate().getTime() // Convert to timestamp (number)
            : message.createdAt
        }));
        dispatch(loadMessages(loadedMessages.reverse()));
      });
      return () => {
        unSub();
      };
    }
  }, [messagesId]);



  return chatUser ? (
    <div className={`chat-box lg:col-span-2 col-span-4 relative bg-black h-[80vh] ${chatVisible ? "block" : "hidden lg:block"}`}>
      <div className="chat-user px-4 py-2 flex items-center
       gap-3 border-b">
        <img src={assets.arrow_icon} onClick={() => dispatch(setChatVisible(false))} className='w-6 cursor-pointer md:hidden inline' alt="" />
        <img src={chatUser.userData.avatar} className='w-10 rounded-full' />
        <p className='flex text-lg font-semibold items-center gap-1 text-white'>{chatUser.userData.name}
          {Date.now() - chatUser.userData.lastSeen <= 70000 ?
            <img src={assets.green_dot} className='w-4' /> :
            null}
        </p>
        <img src={assets.help_icon} className='w-6 rounded-full' />
      </div>


      {/* Chat messages */}
      <div className="chat-msg h-3/4 overflow-y-scroll flex flex-col-reverse gap-4 pt-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`s-msg flex items-end justify-end gap-1 px-4 ${msg.sId === userData.id ? "flex-row" : "flex-row-reverse"}`}>
            {msg.image ? <img src={msg.image} className='w-32' /> : <p className={`msg mb-3 text-xs max-w-52  text-white ${msg.sId === userData.id ? "rounded-t-md rounded-l-md bg-sky-600" : "rounded-t-md rounded-r-md bg-gray-700"} p-2`}>{msg.text}</p>}
            <div className='text-center text-[9px]'>
              <img className='w-7 aspect-auto rounded-full' src={msg.sId === userData.id ? userData.avatar : chatUser.userData.avatar} alt="" />
              <p className='text-white'>{convertTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input flex items-center gap-3 px-4 py-2 bg-gray-950 absolute bottom-0 right-0 left-0 m-2">
        <input onChange={(e) => setInput(e.target.value)} type="text" placeholder='Send a message' className='flex-1 border-none outline-none bg-gray-950 text-white' value={input} name='input' />
        <input onChange={sendImage} type="file" id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor="image" className='flex '>
          <img className='w-6 h-6 cursor-pointer bg-white rounded-md' src={assets.gallery_icon} alt="" />

        </label>
        <img onClick={sendMessage} className='w-8 cursor-pointer' src={assets.send_button} alt="" />
      </div>
    </div>
  ) :
    <div className={`chat-welcome chat-box col-span-2 relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white h-[80vh] hidden lg:flex flex-col justify-center items-center gap-8}`}>
      <img src={assets.logo_icon} className='w-32' />
      <p className='text-center text-3xl'>Chat anytime, anywhere</p>
    </div>
}

export default ChatBox