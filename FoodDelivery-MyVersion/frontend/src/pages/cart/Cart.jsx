import React from 'react'
import { food_list } from '../../assets/assets'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../features/cartItems/CartSlice'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const totalAmt = useSelector((state) => state.totalAmt)

  const dispatch = useDispatch()
  const navigate = useNavigate()


  return totalAmt > 0 ? (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title grid grid-cols-6 items-center mb-2">
          <p className='text-xs sm:text-lg'>Items</p>
          <p className='text-xs sm:text-lg'>Title</p>
          <p className='text-xs sm:text-lg'>Price</p>
          <p className='text-xs sm:text-lg'>Quant</p>
          <p className='text-xs sm:text-lg'>Total</p>
          <p className='text-xs sm:text-lg'>Remove</p>
        </div>
        <hr />

        {food_list.map((item, idx) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={idx}>
                <div className="cart-items-title cart-items-item grid grid-cols-6 items-center my-2" key={idx}>
                  <img className='w-8 sm:w-16' src={item.image} alt="" />
                  <p className='text-xs sm:text-lg'>{item.name}</p>
                  <p className='text-xs sm:text-lg'>${item.price}</p>
                  <p className='text-xs sm:text-lg'>{cartItems[item._id]}</p>
                  <p className='text-xs sm:text-lg'>${item.price * cartItems[item._id]}</p>
                  <p className='cross cursor-pointer' onClick={() => dispatch(removeFromCart(item._id))}>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom flex flex-col-reverse md:flex-row justify-between items-center md:items-baseline gap-[12vw] my-10">
        <div className="cart-total flex-1 flex flex-col gap-6">
          <h2 className='text-2xl font-semibold'>Cart Totals</h2>
          <div>
            <div className="cart-total-details flex justify-between">
              <p>Subtotal</p>
              <p>${totalAmt}</p>
            </div>
            <hr className='my-4' />
            <div className="cart-total-details flex justify-between">
              <p>Delivery Fee</p>
              <p>${totalAmt > 0 ? 2 : 0}</p>
            </div>
            <hr className='my-4' />
            <div className="cart-total-details flex justify-between">
              <b>Total</b>
              <b>${totalAmt > 0 ? totalAmt + 2 : 0}</b>
            </div>
          </div>
          <button className='p-2 rounded text-white bg-red-600 text-sm cursor-pointer hover:bg-red-500 w-48' onClick={() => navigate('/placeorder')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promo-code md:flex-1">
          <div>
            <p className='text-sm md:text-lg'>If you have a promo code, Enter it here.</p>
            <div className="cart-promocode-input mt-4 flex">
              <input type="text" placeholder='promo code' className='bg-gray-300 outline-none py-1 pl-2 rounded-s text-sm md:text-lg' />
              <button className='py-2 rounded-e text-white bg-black text-sm cursor-pointer px-8 hover:bg-opacity-85 md:text-lg'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : <h1 className='text-3xl text-center'>No items in cart! <Link to="/" className='text-red-600'>Add Items</Link></h1>
}

export default Cart