import React, { useContext } from 'react'
import { StoreContext } from '../../context/context'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext);

  const navigate = useNavigate();


  if (getTotalCartAmount() > 0) {
    return (
      <div className='cart mt-10'>
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
                    <img className='w-8 sm:w-16' src={url+"/images/"+item.image} alt="" />
                    <p className='text-xs sm:text-lg'>{item.name}</p>
                    <p className='text-xs sm:text-lg'>₹{item.price}</p>
                    <p className='text-xs sm:text-lg'>{cartItems[item._id]}</p>
                    <p className='text-xs sm:text-lg'>₹{item.price * cartItems[item._id]}</p>
                    <p className='cross cursor-pointer' onClick={() => removeFromCart(item._id)}>x</p>
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
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr className='my-4' />
              <div className="cart-total-details flex justify-between">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount() > 0 ? 2 : 0}</p>
              </div>
              <hr className='my-4' />
              <div className="cart-total-details flex justify-between">
                <b>Total</b>
                <b>₹{getTotalCartAmount() > 0 ? getTotalCartAmount() + 2 : 0}</b>
              </div>
            </div>
            <button className='p-2 rounded text-white bg-red-600 text-sm cursor-pointer hover:bg-red-500 w-48' onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
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
    )
  } else {
    return (
      <div className='text-center text-3xl my-10 h-48 text-cyan-950'>No items in Cart! <span className='text-red-600 cursor-pointer' onClick={() => navigate('/')}>Add items</span></div>
    )
  }
}


export default Cart

