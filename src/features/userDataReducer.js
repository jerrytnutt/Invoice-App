import { createSlice } from '@reduxjs/toolkit';

let initialStateValue = {
  userName: false,
  userID: '',
  companyName: '',
  companyAddress: '',
  companyEmail: '',
};

const userDataSlice = createSlice({
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

export const userDataActions = userDataSlice.actions;

export default userDataSlice;
