import React, { useState } from 'react'
import { assets } from '../../assets/assets';
import { useDispatch } from 'react-redux';
import { setShowLogin } from '../../features/cartItems/CartSlice';

const LoginPopup = () => {
    const [currentState, setCurrentState] = useState("Sign up");

    const dispatch = useDispatch()


    return (
        <div className='login-popup absolute z-10 bg-[#00000090] h-screen w-screen flex justify-center items-center'>
            <form action="" className='login-popup-container place-self-center w-80 text-[#808080] bg-white flex flex-col gap-6 px-8 py-6 rounded animate-[fadeIn_0.5s] text-sm'>
                <div className="login-popup-title flex justify-between items-center text-black">
                    <h2 className='text-2xl font-bold'>{currentState}</h2>
                    <img onClick={() => dispatch(setShowLogin())} src={assets.cross_icon} alt="" className='w-4 cursor-pointer'/>
                </div>
                <div className="login-popup-inputs flex flex-col gap-6">
                    {currentState==="Login" ? <></> : <input className='outline-red-600 border border-slate-400 rounded p-2' type="text" placeholder='Your Name' required />}
                    <input className='outline-red-600 border border-slate-400 rounded p-2'  type="email" placeholder='Your email' required />
                    <input className='outline-red-600 border border-slate-400 rounded p-2' type="password" placeholder='Enter your password' required />
                </div>
                <button className='p-2 rounded text-white bg-rose-600 text-sm cursor-pointer hover:bg-rose-500'>{currentState==="Sign up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition flex items-start gap-2">
                    <input className='mt-1' type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                    {currentState==="Login" ? <p>Create a new account? <span className='text-rose-600 font-semibold cursor-pointer' onClick={() => setCurrentState("Sign up")}>Click here</span></p> : <p>Already have an account? <span className='text-rose-600 font-semibold cursor-pointer' onClick={() => setCurrentState("Login")}>Login here</span></p> }
            </form>
        </div>
    )
}

export default LoginPopup