import { createSlice } from '@reduxjs/toolkit';

let initialStateValue = 'sidebarVisible';

const sidebarVisibilitySlice = createSlice({
  name: 'sidebarVisibility',
  initialState: { value: initialStateValue },
  reducers: {
    setsidebarData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const sidebarVisibility = sidebarVisibilitySlice.actions;

export default sidebarVisibilitySlice;
