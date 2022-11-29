import { createSlice } from '@reduxjs/toolkit';

let initialStateValue = 'one';

const mainPageContentSlice = createSlice({
  name: 'mainPageContent',
  initialState: { value: initialStateValue },
  reducers: {
    setmainPageContent: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const mainPageContent = mainPageContentSlice.actions;

export default mainPageContentSlice;
