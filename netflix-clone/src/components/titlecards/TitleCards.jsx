import React, { useEffect, useRef } from 'react'
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = ({title, category, className=""}) => {
  const cardsRef = useRef()

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY
  }

  useEffect(() => {
    cardsRef.current.addEventListener('wheel', handleWheel);
  }, [])

  return (
    <div className={`title-cards sm:mt-20 mt-8 ${className} lg:block`}>
      <h2 className='mb-2 sm:text-2xl text-sm font-semibold'>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list flex gap-2 overflow-x-scroll no-scrollbar" ref={cardsRef}>
        {cards_data.map((card, idx) => {
          return (
            <div className="card relative" key={idx}>
              <img src={card.image} alt="" className='sm:w-60 w-32 rounded-sm cursor-pointer max-w-none'/>
              <p className='absolute bottom-2 right-2 text-xs sm:text-lg'>{card.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards