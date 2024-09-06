import React from 'react'
import { food_list } from '../../assets/assets'
import FoodItem from '../fooditems/FoodItem'

const FoodDisplay = ({ category }) => {
  return (
    <div className='food-display mt-8 ' id='food-display'>
      <h1 className='text-2xl pb-4 font-semibold'>Top Dishes Near You</h1>
      <div className="food-display-list flex flex-wrap gap-6 justify-center items-center">
        {food_list.map((item, idx) => {
          if(category === "All" || category === item.category) {
            return (
              <FoodItem key={idx} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            )
          }
        }
        )}
      </div>
    </div>
  )
}

export default FoodDisplay