import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from '../../services/productService'

const { getCurrencies } = productService()

export const fetchCurrencies = createAsyncThunk( 'currencies/getCurrencies', getCurrencies )

export const counterSlice = createSlice({
  name: "currencies",
  initialState: {
    currentValue: "$",
    currencies: []
  },
  reducers: {
    changeCurrentValue: (state, action) => {
      state.currentValue = action.payload
    }
  },
  extraReducers: {
    [fetchCurrencies.fulfilled]: (state, action) => {
      state.currencies = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { 
  changeCurrentValue,
} = counterSlice.actions

export default counterSlice.reducer