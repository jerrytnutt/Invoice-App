import { configureStore } from '@reduxjs/toolkit';

import userDataSlice from './userDataReducer';
import sidebarSlice from './sidebarvisibility';
import invoiceListSlice from './invoicelist';
import mainPageContentSlice from './mainpagecontent';

const store = configureStore({
  reducer: {
    userData: userDataSlice.reducer,
    sidebarvisibility: sidebarSlice.reducer,
    invoiceList: invoiceListSlice.reducer,
    mainPageContent: mainPageContentSlice.reducer,
  },
});

export default store;
