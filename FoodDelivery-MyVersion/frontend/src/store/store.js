import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cartItems/CartSlice'

export const store = configureStore({
  reducer: cartReducer,
})