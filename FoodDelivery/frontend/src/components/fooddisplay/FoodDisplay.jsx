import React, { useContext } from 'react'
import { StoreContext } from '../../context/context.jsx'
import FoodItem from '../fooditem/FoodItem.jsx';

const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext);


  return (
    <div className='food-display mt-8 ' id='food-display'>
        <h2 className='text-2xl pb-4 font-semibold'>Top dishes near you</h2>
        <div className="food-display-list flex flex-wrap gap-6 justify-center items-center">
            {food_list.map((item, index) => {
                if(category==="All" || category===item.category) {
                    return (
                        <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                    )
                }

            })}
        </div>
    </div>
  )
}

export default FoodDisplay