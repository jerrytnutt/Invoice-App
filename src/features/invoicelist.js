import { createSlice } from '@reduxjs/toolkit';

let initialStateValue = [
  {
    billto: { name: 't1', address: '12345northstreet' },
    invoicenumber: 100,
  },
  {
    billto: { name: 't2', address: '12345northstreet' },
    invoicenumber: 200,
  },
];

const invoiceSlice = createSlice({
  name: 'invoiceList',
  initialState: { value: initialStateValue },
  reducers: {
    setinvoiceData: (state, action) => {
      state.value = action.payload;
    },
    resetData: (state, action) => {
      state.value = initialStateValue;
    },
  },
});

export const invoiceList = invoiceSlice.actions;

export default invoiceSlice;
