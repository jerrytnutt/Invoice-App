import { createSlice } from '@reduxjs/toolkit';

let initialStateValue = { userName: false, userID: '' };

const userSlice = createSlice({
  name: 'userData',
  initialState: { value: initialStateValue },
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload;
    },
    resetUserData: (state, action) => {
      state.value = initialStateValue;
    },
  },
});

export const userDataChange = userSlice.actions;

export default userSlice;
