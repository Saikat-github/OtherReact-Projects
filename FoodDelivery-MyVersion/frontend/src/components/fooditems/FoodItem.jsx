import React from 'react'
import { assets } from '../../assets/assets'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getTotalAmt, removeFromCart } from '../../features/cartItems/CartSlice'

const FoodItem = ({ id, name, image, price, description, category }) => {
  const cartItems = useSelector((state) => state.cartItems);

  const dispatch = useDispatch();



  return (
    <div className='food-item w-[360px] shadow-xl transition animate-[fadeIn_1s] rounded-lg bg-white'>
      <div className="food-item-img-container relative">
        <img src={image} className='food-item-img rounded-t-xl w-[100%] ' alt="" />
        {!cartItems[id]
          ? <img className='add cursor-pointer w-8 absolute bottom-4 right-4 rounded-full' onClick={() => dispatch(addToCart(id))} src={assets.add_icon_white} alt='' />
          : <div className="food-item-counter flex gap-2 items-center absolute bottom-4 right-4 p-1 bg-white rounded-full">
            <img onClick={() => dispatch(removeFromCart(id))} src={assets.remove_icon_red} alt="" className='cursor-pointer w-8' />
            <p>{cartItems[id]}</p>
            <img onClick={() => dispatch(addToCart(id))
            } src={assets.add_icon_green} alt="" className='cursor-pointer w-8' />
          </div>
        }
      </div>
      <div className="food-item-info p-4">
        <div className="food-item-name-rating flex justify-between items-center">
          <h2 className='text-lg font-semibold text-gray-900'>{name}</h2>
          <img src={assets.rating_starts} alt="" className='w-20' />
        </div>
        <p className="food-item-description text-gray-700 opacity-90 text-sm">{description}</p>
        <h2 className="food-item-price text-red-600 text-lg my-2 font-semibold">${price}</h2>
      </div>
    </div>
  )
}

export default FoodItem