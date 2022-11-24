import { createSlice } from '@reduxjs/toolkit';

let initialStateValue = { name: '', age: 0 };

const userSlice = createSlice({
  name: 'user',
  initialState: { value: initialStateValue },
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload;
    },

    clearUserData: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const userDataChange = userSlice.actions;

export default userSlice;
