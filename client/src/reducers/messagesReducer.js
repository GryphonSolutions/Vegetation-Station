import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchMessages: false,
  userMessageSearch: '',
  senderInput: '',
  currentCombinedId: '',
  currentChat: {},
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
    updateSenderInput: (state, action) => {
      state.senderInput = action.payload;
    },
    updateCurrentCombinedId: (state, action) => {
      state.currentCombinedId = action.payload;
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
  updateCurrentCombinedId,
  updateCurrentChat,
} = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
