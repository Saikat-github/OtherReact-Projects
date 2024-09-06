import React from 'react'
import home from '../../assets/home.png';
import game from '../../assets/game_icon.png';
import automobiles from '../../assets/automobiles.png';
import sports from '../../assets/sports.png';
import entertainment from '../../assets/entertainment.png';
import tech from '../../assets/tech.png';
import music from '../../assets/music.png';
import blogs from '../../assets/blogs.png';
import news from '../../assets/news.png';
import jack from '../../assets/jack.png';
import simon from '../../assets/simon.png';
import tom from '../../assets/tom.png';
import megan from '../../assets/megan.png';
import cameron from '../../assets/cameron.png';
import { useContext } from 'react';
import { SetContext } from '../../contexts/setContext';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const { sidebar, setSidebar, category, setCategory } = useContext(SetContext)

    const onClickHandler = (num) => {
        setCategory(num);
        setSidebar((prev) => !prev)

    }

    return (
        <div>
            <div className={sidebar ? 'sidebar bg-gray-100 w-[15%] h-screen fixed pl-4 pt-10 overflow-y-scroll z-10 dark:bg-gray-950' : 'hidden'}>
                <div className="sortcut-links">
                    <Link to="/" onClick={() => onClickHandler(0)} className={`side-link flex lg:items-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 ${category === 0 ? 'bg-gray-200 dark:bg-gray-900' : ""} lg:flex-row flex-col`}>
                        <img className='md:w-5 mr-5 w-8' src={home} alt="" />
                        <p className='md:inline hidden'>Home</p>
                    </Link>
                    <div onClick={() => onClickHandler(20)} className={`side-link flex lg:tems-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 ${category === 20 ? 'bg-gray-200 dark:bg-gray-900' : ""} lg:flex-row flex-col`}>
                        <img className='md:w-5 mr-5 w-8' src={game} alt="" />
                        <p className='md:inline hidden'>Gaming</p>
                    </div>
                    <div onClick={() => onClickHandler(2)} className={`side-link flex lg:items-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 ${category === 2 ? 'bg-gray-200 dark:bg-gray-900' : ""} lg:flex-row flex-col`}>
                        <img className='md:w-5 mr-5 w-8' src={automobiles} alt="" />
                        <p className='md:inline hidden'>Automobiles</p>
                    </div>
                    <div onClick={() => onClickHandler(17)} className={`side-link flex ilg:tems-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 ${category === 17 ? 'bg-gray-200 dark:bg-gray-900' : ""} lg:flex-row flex-col`}>
                        <img className='md:w-5 mr-5 w-8' src={sports} alt="" />
                        <p className='md:inline hidden'>Sports</p>
                    </div>
                    <div onClick={() => onClickHandler(24)} className={`side-link flex ilg:tems-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 ${category === 24 ? 'bg-gray-200 dark:bg-gray-900' : ""} lg:flex-row flex-col`}>
                        <img className='md:w-5 mr-5 w-8' src={entertainment} alt="" />
                        <p className='md:inline hidden'>Entertainment</p>
                    </div>
                    <div onClick={() => onClickHandler(28)} className={`side-link flex ilg:tems-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 ${category === 28 ? 'bg-gray-200 dark:bg-gray-900' : ""} lg:flex-row flex-col`}>
                        <img className='md:w-5 mr-5 w-8' src={tech} alt="" />
                        <p className='md:inline hidden'>Technology</p>
                    </div>
                    <div onClick={() => onClickHandler(10)} className={`side-link flex ilg:tems-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 ${category === 10 ? 'bg-gray-200 dark:bg-gray-900' : ""} lg:flex-row flex-col`}>
                        <img className='md:w-5 mr-5 w-8' src={music} alt="" />
                        <p className='md:inline hidden'>Music</p>
                    </div>
                    <div onClick={() => onClickHandler(22)} className={`side-link flex ilg:tems-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 ${category === 22 ? 'bg-gray-200 dark:bg-gray-900' : ""} lg:flex-row flex-col`}>
                        <img className='md:w-5 mr-5 w-8' src={blogs} alt="" />
                        <p className='md:inline hidden'>Blogs</p>
                    </div>
                    <div onClick={() => onClickHandler(25)} className={`side-link flex ilg:tems-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 ${category === 25 ? 'bg-gray-200 dark:bg-gray-900' : ""} lg:flex-row flex-col`}>
                        <img className='md:w-5 mr-5 w-8' src={news} alt="" />
                        <p className='md:inline hidden'>News</p>
                    </div>
                    <hr className='w-3/4 hidden md:block' />
                </div>


                <div className="subscribed-list flex flex-col">
                    <h3 className='text-md font-semibold my-5 hidden md:block'>Subscriptions</h3>
                    <div className="side-link flex items-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900">
                        <img className='rounded-full md:w-5 mr-5 w-8' src={jack} alt="" />
                        <p className='md:inline hidden'>PewDiePie</p>
                    </div>
                    <div className="side-link flex items-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900">
                        <img className='rounded-full md:w-5 mr-5 w-8' src={simon} alt="" />
                        <p className='md:inline hidden'>MrBeast</p>
                    </div>
                    <div className="side-link flex items-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900">
                        <img className='rounded-full md:w-5 mr-5 w-8' src={tom} alt="" />
                        <p className='md:inline hidden'>Justin Bieber</p>
                    </div>
                    <div className="side-link flex items-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900">
                        <img className='rounded-full md:w-5 mr-5 w-8' src={megan} alt="" />
                        <p className='md:inline hidden'>5-Minute Crafts</p>
                    </div>
                    <div className="side-link flex items-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900">
                        <img className='rounded-full md:w-5 mr-5 w-8' src={cameron} alt="" />
                        <p className='md:inline hidden'>Nas Daily</p>
                    </div>
                    <div className="side-link flex items-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900">
                        <img className='rounded-full md:w-5 mr-5 w-8' src={simon} alt="" />
                        <p className='md:inline hidden'>MrBeast</p>
                    </div>
                    <div className="side-link flex items-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900">
                        <img className='rounded-full md:w-5 mr-5 w-8' src={tom} alt="" />
                        <p className='md:inline hidden'>Justin Bieber</p>
                    </div>
                    <div className="side-link flex items-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900">
                        <img className='rounded-full md:w-5 mr-5 w-8' src={megan} alt="" />
                        <p className='md:inline hidden'>5-Minute Crafts</p>
                    </div>
                    <div className="side-link flex items-center mb-1 w-[90%] px-2 py-2 rounded-lg flex-wrap cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900">
                        <img className='rounded-full md:w-5 mr-5 w-8' src={cameron} alt="" />
                        <p className='md:inline hidden'>Nas Daily</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Sidebar