import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/titlecards/TitleCards'
import Footer from '../../components/footer/Footer'


const Home = ({signState}) => {
  return (
    <div className='home'>
      <Navbar signState={signState}/>
      <div className="hero relative ">
        <img src={hero_banner} alt="" className='banner-img w-full gradient' />
        <div className="hero-caption absolute w-full pl-10 bottom-0">
          <img src={hero_title} alt="" className='caption-img lg:w-[90%] sm:w-[30%] max-w-[420px] w-[50%] mb-7' />
          <p className='max-w-[700px] hidden 2xl:block text-sm 2xl:text-lg'>Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.</p>
          <div className="hero-btns sm:flex gap-2 mb-12 mt-4 hidden">
            <button className='btn border-0 outline-0 px-5 py-2 inline-flex items-center gap-2 md:text-sm text-xs md:font-semibold rounded-md cursor-pointer text-black bg-white hover:bg-opacity-80'><img className='w-6' src={play_icon} alt="" />Play</button>
            <button className='btn border-0 outline-0 px-5 py-2 inline-flex items-center gap-2 md:text-sm text-xs md:font-semibold rounded-md cursor-pointer bg-neutral-700 bg-opacity-90 hover:bg-opacity-80'><img className='w-6' src={info_icon} alt="" />More Info</button>
          </div>
          <TitleCards className="hidden"/>
        </div>
      </div>

      <div className="more-cards pl-10">
        <TitleCards title={"Blockbuster Movies"}/>
        <TitleCards title={"Only on Netflix"}/>
        <TitleCards title={"Upcoming"}/>
        <TitleCards title={"Top Pics for You"}/>
      </div>

      <Footer />
    </div>
  )
}

export default Home