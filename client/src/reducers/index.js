import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
  searchMessages: false,
};

const appSlice = createSlice({
  name: 'Vegetation Station',
  initialState,
  reducers: {
    updateIsDarkMode: (state, action) => {
      state.isDarkMode = !state.isDarkMode;
    },
    updateSearchMessages: (state) => {
      state.searchMessages = !state.searchMessages;
    },
  },
  extraReducers: (builder) => {},
});

export const { updateIsDarkMode, updateSearchMessages } = appSlice.actions;

export default appSlice.reducer;
