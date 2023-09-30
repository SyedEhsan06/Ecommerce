import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk("fetchProducts",async()=>{
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data
});

const initialState = {
    isLoading : false,
    data:null,
}
export const productSlice = createSlice({
    name:'products',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state,action)=>{
            state.isLoading=true;
        }); 
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data = action.payload;
        })  
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            console.log("Error",action.payload);
            state.isError = true;
        }); 
    }
})

export default productSlice.reducer