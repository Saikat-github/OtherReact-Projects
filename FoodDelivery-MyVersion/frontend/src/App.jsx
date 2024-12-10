import { Footer, Login, Navbar, ScrollToTop } from './components'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeorder/PlaceOrder'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { setCartItems, setFoodList, setToken } from './features/cartSlice'
import axios from 'axios'
import Verify from './pages/verify/Verify'
import MyOrders from './pages/myorders/MyOrders'

function App() {
  const showSignUp = useSelector((state) => state.showSignUp)
  const url = useSelector((state) => state.url);
  const token = useSelector((state) => state.token);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      if (response.data.success) {
        dispatch(setFoodList(response.data.data));
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchCartList = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      if (response.data.success) {
        dispatch(setCartItems(response.data.cartData));
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        await fetchFoodList();
        const storedToken = localStorage.getItem('token');
        if (storedToken && storedToken !== token) {
          dispatch(setToken(storedToken));
          await fetchCartList(storedToken)
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [token]);



  return (
    loading
      ?
      <div className='h-screen flex justify-center items-center'>
        <div className='h-12 w-12 border-8 border-dotted border-orange-600 rounded-full animate-rotate'></div>
      </div>
      :
      <div>
        {error ? <div className='text-center my-32 text-2xl border-4 border-red-600 mx-10 sm:mx-48 py-4 font-semibold text-red-600 rounded-lg'>{error}!</div> : <div>
          {showSignUp ? <Login /> : <></>}
          <Navbar />
          <div className='mx-[10%] font-Outfit'>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/placeorder" element={<PlaceOrder />} />
              <Route path='/verify' element={<Verify />} />
              <Route path='/myorders' element={<MyOrders />} />
            </Routes>
          </div>
          <Footer />
        </div>}
      </div>
  )
}



export default App
