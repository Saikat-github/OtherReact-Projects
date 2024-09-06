import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/context';
import axios from 'axios'


const LoginPopup = () => {
    const [currentState, setCurrentState] = useState("Login");

    const {url, token, setToken, setShowLogin} = useContext(StoreContext);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        setData((prev) => (
            {...prev, [e.target.name]:e.target.value}
        ))
    };


    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if(currentState==="Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);

        if(response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false)
        } else {
            alert (response.data.message)
        }
    }



    return (
        <div className='login-popup absolute z-10 bg-[#00000090] h-screen w-screen flex justify-center items-center'>
            <form onSubmit={onLogin} className='login-popup-container place-self-center w-80 text-[#808080] bg-white flex flex-col gap-6 px-8 py-6 rounded animate-[fadeIn_0.5s] text-sm'>
                <div className="login-popup-title flex justify-between items-center text-black">
                    <h2 className='text-2xl font-bold'>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className='w-4 cursor-pointer'/>
                </div>
                <div className="login-popup-inputs flex flex-col gap-6">
                    {currentState==="Login" ? <></> : <input name='name' value={data.name} onChange={onChangeHandler} className='outline-red-600 border border-slate-400 rounded p-2' type="text" placeholder='Your Name' required />}
                    <input name='email' value={data.email} onChange={onChangeHandler} className='outline-red-600 border border-slate-400 rounded p-2'  type="email" placeholder='Your email' required />
                    <input name='password' value={data.password} onChange={onChangeHandler} className='outline-red-600 border border-slate-400 rounded p-2' type="password" placeholder='Enter your password' required />
                </div>
                <button type='' className='p-2 rounded text-white bg-rose-600 text-sm cursor-pointer hover:bg-rose-500'>{currentState==="Sign up" ? "Create Account" : "Login"}</button>
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