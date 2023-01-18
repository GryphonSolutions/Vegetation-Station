import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchMessages: false,
  userMessageSearch: '',
};

const messagesSlice = createSlice({
  name: 'Station Messages',
  initialState,
  reducers: {
    updateSearchMessages: (state) => {
      state.searchMessages = !state.searchMessages;
    },
    updateUserMessageSearch: (state, action) => {
      state.userMessageSearch = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { updateSearchMessages, updateUserMessageSearch } =
  messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
