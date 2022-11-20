import { createSlice } from '@reduxjs/toolkit';
import { auth, onAuth } from '../fireData/firebase-config';
let initialStateValue = { name: 'No name' };

export const userSlice = createSlice({
  name: 'user',
  initialState: { value: initialStateValue },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },

    logout: (state) => {
      state.value = initialStateValue;
    },
  },
});
onAuth(auth, (user) => {
  if (user) {
    // initialStateValue = { name: user.email };
    // ...
  } else {
    // console.log('there is NOT a user');
    // ...
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
