import { createSlice } from '@reduxjs/toolkit';

let initialStateValue = [
  {
    billto: { fullName: 'john', address: '12345northstreet' },
    sellTo: { fullName: 'john', address: '12345northstreet' },

    invoicenumber: 100,
    dataCreated: 0,
    dateDue: 0,
    service: { description: '', quantity: 0, cost: 0 },
  },
];

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
