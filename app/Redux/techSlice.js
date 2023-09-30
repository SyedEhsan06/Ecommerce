import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const fetchTechPage = createAsyncThunk("fetchTechPage",async(query)=>{
    const response = await fetch(`https://fakestoreapi.com/products/category/${query}`);
    const data = await response.json();
    return data
});

const initialState = {
    isLoading : false,
    data:null,
}
export const techSlice = createSlice({
    name:'products',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchTechPage.pending,(state,action)=>{
            state.isLoading=true;
        }); 
        builder.addCase(fetchTechPage.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data = action.payload;
        })  
        builder.addCase(fetchTechPage.rejected,(state,action)=>{
            console.log("Error",action.payload);
            state.isError = true;
        }); 
    }
})

export default techSlice.reducer