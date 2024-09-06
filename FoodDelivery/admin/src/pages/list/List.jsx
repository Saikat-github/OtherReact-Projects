import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  const [list, setList] = useState([]);


  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error")
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {id:foodId})
    await fetchList()
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error("Error")
    }
  };

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='list add flex flex-col pl-10 py-6 w-3/4 md:2/3'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title grid sm:grid-cols-5 grid-cols-4 items-center gap-2 px-4 py-3 border text-sm w-full">
          <b className='sm:text-sm text-xs'>Image</b>
          <b className='sm:text-sm text-xs'>Name</b>
          <b className='hidden sm:inline'>Category</b>
          <b className='sm:text-sm text-xs'>Price</b>
          <b className='sm:text-sm text-xs'>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format grid sm:grid-cols-5 grid-cols-4 items-center gap-2 px-4 py-3 border text-sm w-full'>
              <img src={`${url}/images/`+item.image} alt="" className='w-12'/>
              <p className='sm:text-sm text-xs'>{item.name}</p>
              <p className='sm:text-sm text-xs hidden sm:inline'>{item.category}</p>
              <p className='sm:text-sm text-xs'>{item.price}</p>
              <p className='cursor-pointer' onClick={() => {removeFood(item._id)}}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List