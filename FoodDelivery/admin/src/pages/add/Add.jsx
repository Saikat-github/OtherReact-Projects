import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = ({url}) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });


    const onChangeHandler = (e) => {
        setData((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        })
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/food/add`, formData);
        if(response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    }

  return (
    <div className='add w-[70%] ml-6 md:ml-14 mt-12 text-sm'>
        <form action="" className='flex flex-col gap-6' onSubmit={onSubmitHandler}>
            <div className="add-img-upload">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" className='w-1/3'/>
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' required hidden />
            </div>
            <div className="add-product-name ">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' className='w-2/3 md:w-1/2 border border-gray-400 p-1 rounded-sm'/>
            </div>
            <div className="add-product-description">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required className='w-2/3 md:w-1/2 border border-gray-400 p-1 rounded-sm'></textarea>
            </div>
            <div className="add-category-price flex gap-6">
                <div className="add-category">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler} value={data.category} name="category" className='border border-gray-400 p-1 rounded-sm md:w-32 w-24'>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwitch">Sandwitch</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' className='border border-gray-400 p-1 rounded-sm md:w-32 w-24'/>
                </div>
            </div>
            <button type='Submit' className='add-btn w-32 bg-black text-white py-2 rounded-sm hover:bg-opacity-90'>Add</button>
        </form>
    </div>
  )
}

export default Add