import { combineReducers } from "@reduxjs/toolkit";
import CartSlice from './CartSlice'
import productReducer from './productSlice'
import productPageSlice from "./productPageSlice";
import techSlice from "./techSlice";
import  userSlice  from "./user";


export default combineReducers({
    cart:CartSlice,
    product:productReducer,
    productPage:productPageSlice,
    electronicPage:techSlice,
    user:userSlice
})