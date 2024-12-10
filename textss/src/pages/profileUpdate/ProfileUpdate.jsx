import React, { useEffect, useState } from 'react'
import assets from '../../assets/assets'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { toast } from 'react-toastify';
import {upload, deleteFileByUrl} from '../../lib/upload';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserDataSuccess } from '../../features/chat/chatSlice';
import { useForm } from 'react-hook-form';

const ProfileUpdate = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  const [image, setImage] = useState();
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState(userData?.avatar);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: userData?.name || "",
      bio: userData?.bio || "",
    }
  });


  const profileUpdate = async (data) => {
    try {
      if (!prevImage && !data.avatar[0]) {
        toast.error("Upload Profile Picture");
        return;
      }
      const file = data.avatar[0] ? data.avatar[0] : null;
      const docRef = doc(db, 'users', uid);
      if (file) {
        await deleteFileByUrl(userData?.avatar);
        const imgUrl = await upload(file);
        setPrevImage(imgUrl);
        await updateDoc(docRef, {
          avatar: imgUrl,
          bio: data.bio,
          name: data.name
        })
      } else {
        await updateDoc(docRef, {
          bio: data.bio,
          name: data.name,
        })
      }
      const snap = await getDoc(docRef);
      dispatch(loadUserDataSuccess(snap.data()));
      navigate("/chat")
    } catch (error) {
      console.error(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/")
      } else {
        setUid(user.uid)
      }
    })
  }, [])



  return (
    <div className="profile min-h-screen bg-[url(/background2.jpg)] bg-no-repeat bg-cover flex justify-center items-center">
      <div className="profile-container bg-slate-500 bg-opacity-80 h-1/2 lg:w-1/2 w-full m-10 md:my-0 rounded-md flex flex-col-reverse sm:flex-row sm:p-10 py-10 justify-between items-center">
        <form className='flex flex-col gap-5 w-1/2' onSubmit={handleSubmit(profileUpdate)}>
          <h3 className='text-2xl font-semibold'>Profile Datails</h3>
          <label htmlFor="avatar" className='flex text-sm text-gray-500 items-center gap-2'>
            <img src={image ? URL.createObjectURL(image) : (prevImage ? prevImage : assets.logo_icon)} className='w-12 h-12 rounded-full' />
            <span className='text-black'>upload profile image</span>
          </label>
          <input type="file" id='avatar' accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("avatar", { onChange: (e) => setImage(e.target.files[0]) })} hidden />


          <input type="text" placeholder='Your name' className='text-sm border-2 rounded px-4 py-1' {...register("name", {
            required: true
          })} />
          <textarea placeholder='Write profile bio' className='text-sm border-2 rounded-sm px-4 py-1' {...register("bio", {
            required: true
          })}></textarea>
          <button type='submit' className='border border-sky-700 px-4 py-1 roundedl text-white bg-sky-600 hover:bg-opacity-90'>Save</button>
        </form>
        <img src={image ? URL.createObjectURL(image) : (prevImage ? prevImage : assets.logo_icon)} className='h-44 w-44 rounded-full' />
      </div>
    </div>
  )
}

export default ProfileUpdate