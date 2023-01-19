import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userRegistration: {
    email: '',
    password: '',
    zip: '',
    profilePic: '',
  },
  userLogin: {},
};

const usersSlice = createSlice({
  name: 'Station Users',
  initialState,
  reducers: {
    updateUserRegistration: (state, action) => {
      state.userRegistration = (state.userRegistration, action.payload);
    },
    updateUserLogin: (state, action) => {
      state.userLogin = action.payload;
    },
  },
});

export const { updateUserRegistration, updateUserLogin } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
