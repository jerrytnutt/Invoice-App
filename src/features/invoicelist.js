import { createSlice } from '@reduxjs/toolkit';
//will make empty after style changes
let initialStateValue = [];

const invoiceListSlice = createSlice({
  name: 'invoiceList',
  initialState: { value: initialStateValue },
  reducers: {
    setinvoiceData: (state, action) => {
      state.value = action.payload;
    },
    resetData: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const invoiceList = invoiceListSlice.actions;

export default invoiceListSlice;
