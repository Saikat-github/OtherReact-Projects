import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/login/Login'
import Chat from './pages/chat/Chat'
import ProfileUpdate from './pages/profileUpdate/ProfileUpdate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { loadChatDataSuccess, loadDataFail, loadUserDataSuccess } from './features/chat/chatSlice'
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../config/firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from './config/firebase'


const App = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData)
  const chatData = useSelector((state) => state.chatData)



  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();
          dispatch(loadUserDataSuccess(userData));
          if (userData.avatar && userData.name) {
            navigate("/chat")
          } else {
            navigate("/profile");
          }
          await updateDoc(userRef, {
            lastSeen: Date.now()
          })
          setInterval(async () => {
            if (auth.currentUser) {
              await updateDoc(userRef, {
                lastSeen: Date.now(),
              })
            }
          }, 60000);
        } catch (error) {
          console.error(error);
          dispatch(loadDataFail(error.message));
        }
      } else {
        navigate("/")
      }
    });
  }, []);



  useEffect(() => {
    if (userData) {
      const chatRef = doc(db, 'chat', userData.id);
      const unSub = onSnapshot(chatRef, async (res) => {
        const chatItems = await res.data().chatData;
        const tempData = [];
        for (const item of chatItems) {
          const userRef = doc(db, 'users', item.rId);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();
          tempData.push({ ...item, userData });


        }
        dispatch(loadChatDataSuccess(tempData.sort((a, b) => b.updatedAt - a.updatedAt)))
      });
      return () => {
        unSub();
      }
    }
  }, [userData])


  return (
    <div className='font-Poppins '>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/profile' element={<ProfileUpdate />} />
      </Routes>

    </div>
  )
}

export default App