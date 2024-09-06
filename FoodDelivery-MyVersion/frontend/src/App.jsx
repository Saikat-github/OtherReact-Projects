import { useState } from 'react'
import { AppDownload, ExploreMenu, FoodDisplay, Footer, Header, Login, Navbar } from './components'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeorder/PlaceOrder'
import { useSelector } from 'react-redux'

function App() {
  const showSignUp = useSelector((state) => state.showSignUp)

  return (
    <>
    {showSignUp ? <Login /> : <></>}
      <Navbar />
      <div className='mx-[10%] font-Outfit'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/placeorder" element={<PlaceOrder/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
