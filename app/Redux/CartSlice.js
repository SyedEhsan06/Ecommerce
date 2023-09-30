  "use client";

  import { createSlice } from "@reduxjs/toolkit";

  const cartSlice = createSlice({
    name: 'Cart',
    initialState: [], 
    reducers: {
     
      add(state, action) {
 console.log(action.payload.x)
        const existingItem = state.find(item => item.id === action.payload.x.id);
        let check = action.payload.qty?action.payload.qty:1
  
        if (existingItem) {
          // If the item already exists, increment the quantity in a new copy
          return state.map(item =>
            item.id === action.payload.x.id
              ? { ...item, quantity: item.quantity + check }
              : item
          );
        } else {
    
          return [...state, { ...action.payload.x, quantity: action.payload.qty }];
        }
      },
      remove(state, action) {

        return state.filter(item => item.id !== action.payload);
      },
      sub(state, action) {
         return state.map((item)=>(
          item.quantity === action.payload.quantity && item.id === action.payload.id ?{ ...item, quantity: item.quantity - 1 }: item
          )
          );

      },
    },
  });

  export const { add, remove,sub } = cartSlice.actions;

  export default cartSlice.reducer;
