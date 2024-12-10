import React, { useContext, useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeorder/PlaceOrder'
import Footer from './components/footer/Footer'
import LoginPopup from './components/loginpopup/LoginPopup'
import { StoreContext } from './context/context'
import Verify from './pages/verify/Verify'
import MyOrders from './pages/myorders/MyOrders'
import ScrollToTop from './components/scollToTop/ScrollToTop'

const App = () => {
  const {showLogin, setShowLogin} = useContext(StoreContext)


  return (
    <>
    {showLogin ? <LoginPopup/> : <></>}
      <Navbar/>
      <div className='mx-[10%] font-Outfit'>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App