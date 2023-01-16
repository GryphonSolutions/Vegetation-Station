import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
};

const appSlice = createSlice({
  name: 'Vegetation Station',
  initialState,
  reducers: {
    updateIsDarkMode: (state, action) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
  extraReducers: (builder) => {},
});

export const { updateIsDarkMode } = appSlice.actions;

export default appSlice.reducer;
