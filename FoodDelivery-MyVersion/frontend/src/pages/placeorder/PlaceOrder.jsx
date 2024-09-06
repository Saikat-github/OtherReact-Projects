import React, { useContext } from 'react'
import { useSelector } from 'react-redux'

const PlaceOrder = () => {
  const totalAmt = useSelector((state) => state.totalAmt)


  return (
    <form action="" className='place-order flex flex-col md:flex-row items-start justify-between gap-4 mt-24'>

      {/* place order left */}
      <div className="place-order-left">
        <p className="title text-lg md:text-2xl font-bold mb-8">Delivery Information</p>
        <div className="multi-fields flex gap-2 md:text-lg text-sm">
          <input className='mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='First Name' />
          <input className='mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='Last Name' />
        </div>
        <input className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="email" placeholder='Email address' />
        <input className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='Street' />
        <div className="multi-fields flex gap-2">
          <input className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='City' />
          <input className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='State' />
        </div>
        <div className="multi-fields flex gap-2">
          <input className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='Zip code' />
          <input className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='Country' />
        </div>
        <input className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='Phone' />
      </div>


      {/* place order left */}
      <div className="place-order-right w-[50%] md:text-lg text-sm">
        <div className="cart-total flex-1 flex flex-col gap-6 mb-2">
          <h2 className='text-lg md:text-2xl font-semibold'>Cart Totals</h2>
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
          <button className='p-2 rounded text-white bg-red-600 text-sm cursor-pointer hover:bg-red-500 w-48' onClick={() => navigate('/order')}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder