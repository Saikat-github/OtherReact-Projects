import React, { useState } from 'react'
import assets from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../config/firebase';
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { loadChatUser, loadDataFail, loadMessagesId, setChatVisible } from '../../features/chat/chatSlice';
import { toast } from 'react-toastify';


const LeftSidebar = () => {
    const [users, setUsers] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [inputVal, setInputVal] = useState("");

    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const userData = useSelector((state) => state.userData);
    const chatData = useSelector((state) => state.chatData);
    const messageId = useSelector((state) => state.messageId);
    const chatVisible = useSelector((state) => state.chatVisible);

    const dispatch = useDispatch();

    const inputHandler = async (e) => {
        setInputVal(e.target.value)
        try {
            const input = e.target.value.trim()
            if (input) {
                setShowSearch(true);
                const userRef = collection(db, 'users');
                const q = query(userRef, where("username", "==", input.toLowerCase()));
                const querySnap = await getDocs(q);

                if (!querySnap.empty) {
                    let searchedUsers = [];
                    for (let user of querySnap.docs) {
                        const userDataFetched = user.data();
                        if (userDataFetched.id !== userData.id && !chatData.some(item => item.rId === userDataFetched.id)) {
                            searchedUsers.push(userDataFetched);
                        }
                    }
                    setUsers(searchedUsers.length > 0 ? searchedUsers : []);
                    setInputVal("");
                } else {
                    setUsers([]);
                }
            } else {
                setShowSearch(false);
            }
        } catch (error) {
            dispatch(loadDataFail(error.message));
        }
    };

    const addChat = async (user) => {
        if (!user || !userData) return;
        try {
            const messagesRef = collection(db, 'messages');
            const chatsRef = collection(db, "chat");

            const newMessageRef = doc(messagesRef);
            await setDoc(newMessageRef, {
                creatAt: serverTimestamp(),
                messages: []
            });

            const newChatData = {
                messageId: newMessageRef.id,
                lastMessage: "",
                rId: userData.id,
                updatedAt: Date.now(),
                messageSeen: true
            };

            await updateDoc(doc(chatsRef, user.id), {
                chatData: arrayUnion(newChatData)
            });

            await updateDoc(doc(chatsRef, userData.id), {
                chatData: arrayUnion({
                    ...newChatData,
                    rId: user.id
                })
            });
            setShowSearch(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const setChat = async (item) => {
        try {
            dispatch(loadMessagesId(item.messageId));
            dispatch(loadChatUser(item));
            const userChatsRef = doc(db, 'chat', userData.id);
            const userChatsSnapshot = await getDoc(userChatsRef);
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatData.findIndex((c) => c.messageId === item.messageId);
            userChatData.chatData[chatIndex].messageSeen = true;
            await updateDoc(userChatsRef, {
                chatData: userChatData.chatData
            });
            dispatch(setChatVisible(true))
        } catch (error) {
           toast.error(error.message);
           console.error(error); 
        }
    };


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



    return (
        <div className={`ls lg:col-span-1 col-span-4 bg-gray-950 text-white h-[80vh] ${chatVisible ? "hidden lg:block" : "block"}`}>
            <div className="ls-top p-5">
                <div className="ls-nav flex justify-between items-center">
                    <img src={assets.logo} className='logo max-w-32' />
                    <div className="menu relative py-2">
                        <img src={assets.menu_icon} className='w-5 opacity-85 cursor-pointer' onClick={() => setShowProfile((prev) => !prev)} />
                        {showProfile ? <div className="sub-menu absolute right-0 w-36 p-5 rounded-sm bg-white text-black">
                            <p className='text-sm cursor-pointer' onClick={() => navigate('/profile')}>Edit Profile</p>
                            <hr className='h-0.5 bg-gray-500 my-2' />
                            <p onClick={() => logout()} className='text-sm cursor-pointer'>Logout</p>
                        </div> : null}
                    </div>
                </div>
                <div className="ls-search flex items-center gap-3 px-3 py-2 mt-5 bg-blue-900">
                    <img onClick={() => setShowSearch(false)} src={assets.search_icon} className='w-4' />
                    <input onChange={inputHandler} value={inputVal} type="text" placeholder='Search here...' className='bg-transparent border-none outline-none text-white text-xs' />
                </div>
            </div>
            <div className="ls-list flex flex-col h-3/4 overflow-scroll no-scrollbar">
                {(showSearch && users) ? users.map((item, idx) => (
                    <div onClick={() => addChat(item)} key={idx} className="friends flex items-center px-5 py-2 gap-3 cursor-pointer text-sm hover:bg-sky-600 group">
                        <img src={item.avatar} className='w-10 aspect-auto rounded-full' />
                        <div className='flex flex-col'>
                            <p>{item.name}</p>
                            <span className='text-xs text-gray-400 group-hover:text-white'>{item.bio}</span>
                        </div>
                    </div>
                )) :
                    chatData?.map((item, idx) => (
                        <div onClick={() => setChat(item)} key={idx} className="friends flex items-center pl-5 py-2 pr-1 gap-3 cursor-pointer text-sm hover:bg-gray-800 group w-full">
                            <img src={item.userData.avatar} className='w-10 aspect-auto rounded-full' />
                            <div className='flex flex-col w-full'>
                                <p>{item.userData.name}</p>
                                <div className={`w-full flex justify-between ${item.messageSeen || item.messageId === messageId ? "text-xs text-gray-400 group-hover:text-white" : "text-xs text-green-500 group-hover:text-white font-semibold"}`}>
                                    <span>{item.lastMessage}</span>
                                    <span>{convertTime(item.updatedAt)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default LeftSidebar