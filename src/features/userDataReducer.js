import { createSlice } from '@reduxjs/toolkit';

let initialStateValue = { name: false, age: 50 };

const userSlice = createSlice({
  name: 'userData',
  initialState: { value: initialStateValue },
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const userDataChange = userSlice.actions;

export default userSlice;
