import React from 'react'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { Link } from 'react-router-dom'



const Navbar = () => {
    return (
        <div className='navbarj w-full px-10 py-4 flex justify-between fixed top-0 text-sm text-[#e5e5e5] bg-[0,0, 0, 0.7] z-10'>
            <div className="navbar-left flex items-center gap-10">
                <img src={logo} alt="" className='w-24' />
                <ul className='md:flex list-none gap-5 hidden'>
                    <li className='cursor-pointer'>Home</li>
                    <li className='cursor-pointer'>TV Shows</li>
                    <li className='cursor-pointer'>Movies</li>
                    <li className='cursor-pointer'>New & Popular</li>
                    <li className='cursor-pointer'>My List</li>
                    <li className='cursor-pointer'>Browse by Languages</li>
                </ul>
            </div>
            <div className="navbar-right flex gap-5 items-center">
                <img src={search_icon} alt="" className='icons w-5 cursor-pointer hidden md:inline' />
                <p className='hidden md:inline'>Children</p>
                <img src={bell_icon} alt="" className='icons w-5 cursor-pointer' />
                <div className="navbar-profile flex items-center cursor-pointer gap-5 relative group">
                    <img src={profile_img} alt="" className='profile  rounded-sm w-8' />
                    <img src={caret_icon} alt="" />
                    <div className='drop-down absolute top-full right-0 w-max bg-[#191919] px-5 py-4 rounded-sm underline z-10 hidden group-hover:block'>
                        <Link to='/login'><p className='text-sm cursor-pointer '>Sign In</p></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar