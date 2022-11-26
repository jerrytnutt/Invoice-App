import { createSlice } from '@reduxjs/toolkit';

let initialStateValue = {
  Invoices: [
    {
      billto: { name: 'john', address: '12345northstreet' },
      invoicenumber: 100,
    },
    {
      billto: { name: 'mike', address: '12345northstreet' },
      invoicenumber: 200,
    },
  ],
};

const invoiceSlice = createSlice({
  name: 'invoiceList',
  initialState: { value: initialStateValue },
  reducers: {
    setinvoiceData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const invoiceList = invoiceSlice.actions;

export default invoiceSlice;
