import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
  activeUser: {
    id: 1,
    username: 'Matt',
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu9Phe4zkjG0oyvuH5rGMSl1vpKHyXzqquqg&usqp=CAU',
    tradeCount: 12,
    location: { city: 'Long Beach', state: 'CA', longitude: 33.7701, latitude: 118.1937, zip: 90712 },
  },
  selectedUser: { id: 1,
    username: 'Matt',
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu9Phe4zkjG0oyvuH5rGMSl1vpKHyXzqquqg&usqp=CAU',
    tradeCount: 12,
    location: { city: 'Long Beach', state: 'CA', longitude: 33.7701, latitude: 118.1937, zip: 90712 } },
};

const appSlice = createSlice({
  name: 'Vegetation Station',
  initialState,
  reducers: {
    updateIsDarkMode: (state, action) => {
      state.isDarkMode = !state.isDarkMode;
    },
    updateActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
    updateSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { updateIsDarkMode, updateActiveUser, updateSelectedUser } = appSlice.actions;

export default appSlice.reducer;
