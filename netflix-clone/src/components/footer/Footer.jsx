import React from 'react'
import youtube_icon from '../../assets/youtube_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'



const Footer = () => {
  return (
    <div className='footer flex gap-10 flex-col pt-10 pb-4 mx-[20%] h-[50vh]'>
      <div className="footer-icons flex gap-x-2 justify-start">
        <img src={youtube_icon} alt=""  className='h-6 cursor-pointer hover:scale-105 transition'/>
        <img src={facebook_icon} alt=""  className='h-6 cursor-pointer hover:scale-105 transition'/>
        <img src={instagram_icon} alt=""  className='h-6 cursor-pointer hover:scale-105 transition'/>
        <img src={twitter_icon} alt=""  className='h-6 cursor-pointer hover:scale-105 transition'/>
      </div>
      <ul className='grid md:grid-cols-4 sm:grid-cols-2 gap-4 sm:gap-6 text-xs'>
        <li className='cursor-pointer hover:underline'>Audio Description</li>
        <li className='cursor-pointer hover:underline'>Help Centre</li>
        <li className='cursor-pointer hover:underline'>Gift Cards</li>
        <li className='cursor-pointer hover:underline'>Media Centre</li>
        <li className='cursor-pointer hover:underline'>Investor Relations</li>
        <li className='cursor-pointer hover:underline'>Jobs</li>
        <li className='cursor-pointer hover:underline'>Terms of Use</li>
        <li className='cursor-pointer hover:underline'>Privacy</li>
        <li className='cursor-pointer hover:underline'>Legal Notices</li>
        <li className='cursor-pointer hover:underline'>Cookie Preferences</li>
        <li className='cursor-pointer hover:underline'>Corporate Information</li>
        <li className='cursor-pointer hover:underline'>Contact Us</li>
      </ul>
      <p className='copyright-text'>&copy; 1997-2024 Netflix, Inc.</p>
    </div>
  )
}

export default Footer