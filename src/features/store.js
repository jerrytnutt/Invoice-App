import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers';
import sidebarSlice from './sidebarvisibility';

const store = configureStore({
  reducer: {
    cost: userSlice.reducer,
    sidebarvisibility: sidebarSlice.reducer,
  },
});

export default store;
