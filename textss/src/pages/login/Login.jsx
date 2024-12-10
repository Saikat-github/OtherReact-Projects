import React from 'react'
import assets from '../../assets/assets'
import { useState } from 'react';
import { login, signUp, resetPass } from '../../config/firebase.js';
import { useForm } from 'react-hook-form';

const Login = () => {
  const [currState, setCurrState] = useState("Login");
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const [data, setData] = useState({
  //   username: "",
  //   email: "",
  //   password: ""
  // })

  // const onChangeHandler = (e) => {
  //   setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // }

  const onSubmitHandler = async (data) => {
    setLoading(true);
    setError(null);
    try {
      if (currState === "Signup") {
        await signUp(data);
      } else {
        await login(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      reset()
    }

  };

  return (
    <div className="login min-h-screen bg-[url(/background2.jpg)] bg-no-repeat bg-cover flex items-center md:justify-evenly flex-col md:flex-row justify-start pt-10 md:pt-0 gap-4 md:gap-0">
      <img src={assets.logo_big} className='logo w-[20vw] max-w-[200px]' />
      <form className='bg-slate-500 p-6 flex flex-col gap-4 rounded-md bg-opacity-80' onSubmit={handleSubmit(onSubmitHandler)}>
        <h2 className='font-semibold text-2xl'>{currState}</h2>

        {error && <p className='text-red-700 text-xs'>*{error}</p>}
        {currState === "Signup" ? <input {...register("username", {
          required: true
        })} type="text" className="text-sm form-input px-3 py-2 border border-gray-400 rounded-sm outline-none bg-slate-200" placeholder='Username' /> : null}

        <input name='email' type="email" className="text-sm form-input px-3 py-2 border border-gray-400 rounded-sm outline-none bg-slate-200" placeholder='Email address' {...register("email", {
          required: true
        })} />

        <input name='password' type="password" className="text-sm form-input px-3 py-2 rounded-sm outline-none bg-slate-200" placeholder='Password' {...register("password", {
          required: true
        })} />

        <button disabled={isSubmitting} type='submit' className='p-2 bg-sky-700 text-white text-sm border-none hover:bg-opacity-75 rounded-sm transition flex items-center justify-center gap-2'>{currState === "Signup" ? "Create Account" : "Login Now"}
          {loading && <div className='w-4 h-4 border-2 border-dashed rounded-full animate-spin'></div>}
        </button>

        <div className="login-turn flex gap-2 text-white text-xs">
          <input type="checkbox" required />
          <p>Agree to the terms of use & privacy policy</p>
        </div>
        <div className="login-forgot flex flex-col gap-1">
          <p className="login-toggle text-xs">{currState === "Signup" ? "Already have an account" : "Don't have an account ?"} <span className='cursor-pointer text-sky-800 font-semibold hover:underline' onClick={() => setCurrState((prev) => prev === "Signup" ? "Login" : "Signup")}>Click here</span>
          </p>
          {
            currState !== "Signup"
              ? <p className='text-xs'>Forget Password ? <span className='cursor-pointer text-sky-800 font-semibold hover:underline' onClick={() => resetPass(data.email)}>Reset here</span></p> :
              null
          }
        </div>


      </form>
    </div>
  )
}

export default Login