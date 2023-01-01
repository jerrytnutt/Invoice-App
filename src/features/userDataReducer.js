import { createSlice } from '@reduxjs/toolkit';

let initialStateValue = {
  userName: false,
  userID: '',
  userImg:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/440px-Abraham_Lincoln_O-77_matte_collodion_print.jpg',
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
