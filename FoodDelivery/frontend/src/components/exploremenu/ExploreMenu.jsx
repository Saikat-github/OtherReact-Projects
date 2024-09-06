import React, { useEffect, useState } from 'react'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {


  return (
    <div className='explore-menu flex flex-col gap-6 ' id='explore-menu'>
        <h1 className='font-medium text-2xl'>Explore our menu</h1>
        <p className='explore-menu-text md:max-w-[60%] max-w-[100%]'>Choose from a diverse menu featuring a delecable array of dishes crafted with the finest ingredient and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <div className="explore-menu-list flex justify-between items-center text-center gap-6 mx-6 overflow-x-scroll no-scrollbar">
            {menu_list.map((item, index) => {
                return (
                    <div onClick={()=> setCategory((prev) => prev===item.menu_name ? "All" : item.menu_name)} className='explore-menu-list-item' key={index}>
                        <img src={item.menu_image} alt="menu_image" className={category===item.menu_name ? "min-h-32 min-w-32 cursor-pointer rounded-full transition border-b-4 border-white p-1 active" : "min-h-32 min-w-32 cursor-pointer rounded-full transition border-b-4 border-white p-1 "}/>
                        <p className='mt-2 text-gray-800 text-lg cursor-pointer'>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr className='my-2 h-[2px] bg-slate-300 border-none'/>
    </div>
  )
}

export default ExploreMenu