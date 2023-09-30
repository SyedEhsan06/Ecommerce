import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './CartSlice'
export const cartStore = configureStore({
  reducer: {
    cart: CartSlice,
  },
})

export default cartStore