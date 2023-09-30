import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define your async thunk action creator
export const fetchUser = createAsyncThunk('user/fetchUser', async (token, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/getuser', {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token'),
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState = {
  isLoading: false,
  data: null, // Change this to null to indicate no user data initially
  isError: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState:{},
  reducers: {}, // Add any additional reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false; // Reset the error flag when starting a new request
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
