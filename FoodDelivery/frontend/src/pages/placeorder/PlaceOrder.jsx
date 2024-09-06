import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/context'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';


const PlaceOrder = () => {
  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext);
  const navigate = useNavigate()

  const [data, setData] = useState({
    firstName:"",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (e) => {
    setData((prev) => ({...prev, [e.target.name]:e.target.value}))
  }

 
  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if(cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+2
    }
    let response = await axios.post(url+"/api/order/place", orderData, {headers:{token}});
    if(response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };


  useEffect(() => {
    if(!token) {
      navigate("/cart");
    } else if(getTotalCartAmount()===0) {
      navigate("/cart")
    }
  }, [token])

  return (
    <form action="" onSubmit={placeOrder} className='place-order flex flex-col md:flex-row items-start justify-between gap-4 mt-24'>

      {/* place order left */}
      <div className="place-order-left">
        <p className="title text-lg md:text-2xl font-bold mb-8">Delivery Information</p>
        <div className="multi-fields flex gap-2 md:text-lg text-sm">
          <input required className='mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='First Name' name='firstName' value={data.firstName} onChange={onChangeHandler}/>
          <input required className='mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='Last Name' name='lastName' value={data.lastName} onChange={onChangeHandler} />
        </div>
        <input required className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="email" placeholder='Email address' name='email' value={data.email} onChange={onChangeHandler}/>
        <input required className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='Street' name='street' value={data.street} onChange={onChangeHandler}/>
        <div className="multi-fields flex gap-2">
          <input required className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='City' name='city' value={data.city} onChange={onChangeHandler}/>
          <input required className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='State' name='state' value={data.state} onChange={onChangeHandler}/>
        </div>
        <div className="multi-fields flex gap-2">
          <input required className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='Zip code' name='zipcode' value={data.zipcode} onChange={onChangeHandler}/>
          <input required className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='Country' name='country' value={data.country} onChange={onChangeHandler}/>
        </div>
        <input required className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='Phone' name='phone' value={data.phone} onChange={onChangeHandler}/>
      </div>


      {/* place order left */}
      <div className="place-order-right w-[50%] md:text-lg text-sm">
        <div className="cart-total flex-1 flex flex-col gap-6 mb-2">
          <h2 className='text-lg md:text-2xl font-semibold'>Cart Totals</h2>
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
          <button type='submit' className='p-2 rounded text-white bg-red-600 text-sm cursor-pointer hover:bg-red-500 w-48' onClick={() => navigate('/order')}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder