import { createSlice } from '@reduxjs/toolkit';

let initialStateValue = 'sidebarVisible';

const sidebarSlice = createSlice({
  name: 'sidebarVisible',
  initialState: { value: initialStateValue },
  reducers: {
    setsidebarData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const sidebarVisibility = sidebarSlice.actions;

export default sidebarSlice;
