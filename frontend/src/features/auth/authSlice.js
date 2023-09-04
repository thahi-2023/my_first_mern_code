import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { executeReducerBuilderCallback } from '@reduxjs/toolkit/dist/mapBuilders'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }

  
  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
      },
    },
    extraReducers:  ( builder) => {
      builder
      .addCase(register.pending, (state)=> {
        
      })
    }
})
export const { reset } = authSlice.actions
export default authSlice.reducer