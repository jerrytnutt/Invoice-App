import { createSlice } from '@reduxjs/toolkit';

let initialStateValue = [
  {
    billto: { name: 'exampleOne', address: '12345northstreet' },
    invoicenumber: 100,
  },
  {
    billto: { name: 'exampleTwo', address: '12345northstreet' },
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
    resetData: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const invoiceList = invoiceSlice.actions;

export default invoiceSlice;
