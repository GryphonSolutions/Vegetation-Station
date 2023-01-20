import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
  isNavShown: false,
};

const appSlice = createSlice({
  name: 'Station App',
  initialState,
  reducers: {
    updateIsDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    updateIsNavShown: (state) => {
      state.isNavShown = !state.isNavShown;
    },
  },
  extraReducers: (builder) => {},
});

export const { updateIsDarkMode, updateIsNavShown } = appSlice.actions;

export const appReducer = appSlice.reducer;
