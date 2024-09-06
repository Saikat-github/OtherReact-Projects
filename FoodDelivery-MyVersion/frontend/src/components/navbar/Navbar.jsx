import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setShowLogin, getTotalAmt } from '../../features/cartItems/CartSlice'
import { food_list } from '../../assets/assets'



const Navbar = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const totalAmt = useSelector((state) => state.totalAmt)


  const dispatch = useDispatch();






  return (
    <div className='py-10 flex justify-between items-center bg-white px-[10%] font-Outfit sticky top-0 z-10'>
      <div className="logo">
        <Link to="/"><img src={assets.logo} alt="" className='h-6 sm:h-8 md:h-10 cursor-pointer' /></Link>
      </div>
      <div className="nav-options list-none lg:flex gap-6 text-slate-700 hidden">
        <Link to="/" className='pb-2 border-b-2 border-white hover:cursor-pointer hover:border-slate-700'>Home</Link>
        <a href='#menu' className='pb-2 border-b-2 border-white hover:cursor-pointer hover:border-slate-700'>Menu</a>
        <a href='#app-download' className='pb-2 border-b-2 border-white hover:cursor-pointer hover:border-slate-700'>Mobile App</a>
        <a href='#footer' className='pb-2 border-b-2 border-white hover:cursor-pointer hover:border-slate-700'>Contact Us</a>
      </div>
      <div className="nav-actions flex items-center gap-4 sm:gap-10">
        <img src={assets.search_icon} alt="search-icon" className='h-4 sm:h-8' />
        <div className="cart">
          <Link to="/cart"><img src={assets.basket_icon} alt="" className='h-6 sm:h-8 cursor-pointer' /></Link>
          <div className={totalAmt > 0 ? "relative w-2 h-2 bg-red-500 rounded-full top-[-34px] right-[-10px]" : "hidden"}></div>
        </div>
        <button onClick={() => dispatch(setShowLogin())} className='bg-transparent text-slate-700 text-sm md:text-lg  border-2 border-red-600 py-1 px-4 sm:px-6 rounded-full cursor-pointer hover:bg-red-600 hover:text-white transition-all'>Sign up</button>
      </div>
    </div>
  )
}

export default Navbar