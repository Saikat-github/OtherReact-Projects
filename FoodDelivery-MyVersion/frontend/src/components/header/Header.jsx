import React from 'react'

const Header = () => {
  return (
    <div className='h-[34vw] my-10 mx-auto bg-[url("./header_img.png")] bg-contain relative bg-no-repeat ' >
        <div className='relative flex flex-col items-start  gap-[1.5vw] max-w-[50%] lg:top-52 lg:left-16 animate-[fadeIn_3s] px-4 py-4'>
            <h2 className='lg:text-5xl sm:text-3xl font-semibold text-white'>Order your favourite food here</h2>
            <p className='text-white hidden lg:inline'>Choose from a diverse menu featuring a delecable array of dishes crafted with the finest ingredient and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
            <button className='border-none text-gray-700 text-[12px] px-2  sm:text-xl sm:font-medium sm:px-4 sm:py-2 rounded-full bg-white hover:bg-gray-100'>View Menu</button>
        </div>
    </div>
  )
}

export default Header