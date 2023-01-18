import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchMessages: false,
  userMessageSearch: '',
  senderInput: '',
  currentChat: '',
};

const messagesSlice = createSlice({
  name: 'Vegetation Station',
  initialState,
  reducers: {
    updateSearchMessages: (state) => {
      state.searchMessages = !state.searchMessages;
    },
    updateUserMessageSearch: (state, action) => {
      state.userMessageSearch = action.payload;
    },
    updateSenderInput: (state, action) => {
      state.senderInput = action.payload;
    },
    updateCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  updateSearchMessages,
  updateUserMessageSearch,
  updateSenderInput,
  updateCurrentChat,
} = messagesSlice.actions;

export default messagesSlice.reducer;
