import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';



const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error")
    }
  };

  const statusHandler = async (e, orderId) => {
    const response = await axios.post(url+"/api/order/status", {orderId, status:e.target.value});
    if(response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);



  return (
    <div className='order add md:my-6 m-2 md:mx-8'>
      <h3>Order Page</h3>
      <div className="order-list mt-6 flex flex-col gap-5">
        {orders.map((order, idx) => (
          <div className="order-item grid grid-cols-3 md:grid-cols-5 border border-red-600 text-sm text-gray-500 p-4" key={idx}>
            <img src={assets.parcel_icon} alt="" />
            <div className='flex flex-col gap-2'>
              <p className='order-item-food font-semibold'>
                {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return item.name + "x" + item.quantity;
                  } else {
                    return item.name + "x" + item.quantity + ","
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">
                {order.address.phone}
              </p>
            </div>
            <p className='ml-2'>Items : {order.items.length}</p>
            <p>₹{order.amount} <br />
               <span className='text-xs'>Payment : {order.payment ? "Done" : "Not Done"}</span></p>
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className='bg-red-200 h-10 p-2 text-center rounded-sm cursor-pointer outline-none'>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders