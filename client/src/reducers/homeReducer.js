import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  homeSearchText: '',
};

const homeSlice = createSlice({
  name: 'Station Home',
  initialState,
  reducers: {
    updateHomeSearchText: (state, action) => {
      state.homeSearchText = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { updateHomeSearchText } = homeSlice.actions;
export const homeReducer = homeSlice.reducer;
