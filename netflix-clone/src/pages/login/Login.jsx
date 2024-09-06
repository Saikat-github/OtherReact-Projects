import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const Login = ({signState, setSignState}) => {


  return (
    <div className='login h-screen bg-[url("./background_banner.jpg")] py-5 sm:px-10 px-2'>
      <Link to='/'><img src={logo} alt="" className='login-logo sm:w-32 w-16'/></Link>
      <div className="login-form w-full max-w-sm bg-[rgba(0,0,0)] bg-opacity-75 rounded-sm sm:p-14 p-8 m-auto sm:my-0 my-16">
        <h1 className='text-3xl mb-7
        '>{signState ? "Sign In" : "Sign Up" }</h1>
        <form action="">
          {!signState ? <input className='text-sm w-full py-2 mb-6 px-4 bg-stone-500 bg-opacity-75 rounded-sm outline-none' type="text" placeholder='Your Name' /> : <></>}
          <input className='text-sm w-full py-2 mb-6 px-4 bg-stone-500 bg-opacity-75 rounded-sm outline-none' type="email" placeholder='Your Email' />
          <input className='text-sm w-full py-2 mb-6 px-4 bg-stone-500 bg-opacity-75 rounded-sm outline-none' type="password" placeholder='Enter Password' />
          <button className='w-full rounded-sm px-auto py-3 text-sm bg-[#e50914] mb-2 hover:bg-opacity-90'>{signState ? "Sign In" : "Sign Up" }</button>
          <div className="form-help text-xs flex justify-between text-gray-400">
            <div className="remember flex gap-2">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch text-xs mt-10 text-gray-400">
          {signState ? <p className='my-2'>New to Netflix? <span className='text-white font-semibold hover:underline cursor-pointer' onClick={() => setSignState((prev) => !prev)}>Sign Up Now</span></p> :           <p className=''>Already have account? <span className='text-white font-semibold hover:underline cursor-pointer' onClick={() => setSignState((prev) => !prev)}>Sign in Now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login