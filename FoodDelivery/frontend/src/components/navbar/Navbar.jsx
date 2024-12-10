import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/context';

const Navbar = () => {
    const [menu, setMenu] = useState("Home");

    const { getTotalCartAmount, token, setToken, setShowLogin } = useContext(StoreContext);

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }

    return (
        <div className='py-10 flex justify-between items-center bg-white px-[10%] font-Outfit sticky top-0 z-10'>
            <div>
            <Link to="/"><img src={assets.logo} alt="logo" className='h-6 sm:h-8 md:h-10' /></Link>
            </div>
            <div className='list-none lg:flex gap-6 text-slate-700 hidden'>

                <Link to="/" className='pb-2 border-b-2 border-white hover:cursor-pointer hover:border-slate-700'>Home</Link>
                <a href='#explore-menu' className='pb-2 border-b-2 border-white hover:cursor-pointer hover:border-slate-700'>Menu</a>
                <a href='#app-download' className='pb-2 border-b-2 border-white hover:cursor-pointer hover:border-slate-700'>Mobile-app</a>
                <a href='#footer' className='pb-2 border-b-2 border-white hover:cursor-pointer hover:border-slate-700'>Contact Us</a>
            </div>
            <div className='flex items-center gap-4 sm:gap-10'>
                <img src={assets.search_icon} alt="" className='h-4 sm:h-8' />
                <div>
                    <Link to="/cart"><img src={assets.basket_icon} alt="" className='h-6 sm:h-8' /></Link>
                    <div className={getTotalCartAmount() > 0 ? 'relative w-2 h-2 bg-red-500 rounded-full top-[-34px] right-[-10px]' : 'hidden'}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)} className='bg-transparent text-sm md:text-lg text-sky-900 border border-red-500 py-1 px-4 sm:px-6 rounded-full cursor-pointer hover:bg-red-500 hover:text-white transition-all'>Login</button> : <div className='navbar-profile relative group'>
                    <img src={assets.profile_icon} alt="" />
                    <ul className="nav-profile-dropdown hidden absolute right-0 z-10 group-hover:flex flex-col gap-2 py-3 px-6 rounded-md border border-red-700 bg-white">
                        <li onClick={()=> navigate("/myorders")} className='flex  items-center cursor-pointer gap-2'><img className='w-5' src={assets.bag_icon} alt="" /><p className='text-sm hover:text-red-700'>Orders</p></li>
                        <hr />
                        <li onClick={logout} className='flex  items-center cursor-pointer gap-2'><img className='w-5' src={assets.logout_icon} alt="" /><p className='text-sm hover:text-red-700'>Logout</p></li>
                    </ul>
                </div>}

            </div>
        </div>
    )
}

export default Navbar