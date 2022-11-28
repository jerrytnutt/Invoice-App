import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userDataReducer';
import sidebarSlice from './sidebarvisibility';
import invoiceSlice from './invoicelist';
import mainPageContentSlice from './mainpagecontent';

const store = configureStore({
  reducer: {
    userData: userSlice.reducer,
    sidebarvisibility: sidebarSlice.reducer,
    invoiceList: invoiceSlice.reducer,
    mainPageContent: mainPageContentSlice.reducer,
  },
});

export default store;
