import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
};

const appSlice = createSlice({
  name: 'Station App',
  initialState,
  reducers: {
    updateIsDarkMode: (state, action) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
  extraReducers: (builder) => {},
});

export const { updateIsDarkMode } = appSlice.actions;

export const appReducer = appSlice.reducer;
