import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const fetchProductPage = createAsyncThunk("fetchProductPage",async(index)=>{
    const response = await fetch(`https://fakestoreapi.com/products/${index+1}`);
    const data = await response.json();
    console.log(index)
    return data
});

const initialState = {
    isLoading : false,
    data:{id: 2, title: 'Cant Fetch', description:'Wait'},
}
export const productPageSlice = createSlice({
    name:'products',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchProductPage.pending,(state,action)=>{
            state.isLoading=true;
        }); 
        builder.addCase(fetchProductPage.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data = action.payload;
        })  
        builder.addCase(fetchProductPage.rejected,(state,action)=>{
            console.log("Error",action.payload);
            state.isError = true;
        }); 
    }
})

export default productPageSlice.reducer