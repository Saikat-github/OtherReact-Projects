import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/context';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    setData(response.data.data);
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);


  return (
    <div className='my-orders my-12'>
      <h2>My Orders</h2>
      <div className="container flex flex-col gap-5 mt-7">
        {data.map((order, idx) => {
          return (
            <div key={idx} className="my-orders-order grid md:grid-cols-6 items-center gap-2 md:gap-7 text-sm py-3 px-5 text-gray-600 border border-red-600">
              <img src={assets.parcel_icon} alt="" className='w-12'/>
              <p>{order.items.map((item, idx) => {
                if (idx === order.items.length - 1) {
                  return item.name + "x" + item.quantity
                } else {
                  return item.name + "x" + item.quantity + ","
                }
              })}</p>

              <p>₹{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span className='text-red-600'>&#x25cf;</span> <b>{order.status}</b></p>
              <button onClick={fetchOrders} className='bg-red-200 py-2 rounded-sm hover:bg-red-300'>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders