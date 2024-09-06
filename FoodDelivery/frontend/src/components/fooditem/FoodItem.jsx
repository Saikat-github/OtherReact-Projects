import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/context'

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)


    return (
        <div className='food-item w-[360px] shadow-lg transition animate-[fadeIn_1s] rounded-lg '>
            <div className="food-item-img-container relative">
                <img src={url+"/images/"+image} className='food-item-img rounded-t-xl w-[100%] ' alt="" />
                {!cartItems[id]
                    ? <img className='add cursor-pointer w-8 absolute bottom-4 right-4 rounded-full' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='' />
                    : <div className="food-item-counter flex gap-2 items-center absolute bottom-4 right-4 p-1 bg-white rounded-full">
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" className='cursor-pointer w-8' />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" className='cursor-pointer w-8' />
                    </div>
                }
            </div>
            <div className="food-item-info p-4">
                <div className="food-item-name-rating flex justify-between items-center">
                    <p className='text-lg font-semibold'>{name}</p>
                    <img src={assets.rating_starts} className='w-20' />
                </div>
                <p className="food-item-description text-gray-500 text-sm">
                    {description}
                </p>
                <p className="food-item-price text-red-600 text-lg my-2 font-semibold">
                    ₹{price}
                </p>
            </div>
        </div>
    )
}

export default FoodItem