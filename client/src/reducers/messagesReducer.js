import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchMessages: false,
  userMessageSearch: '',
  senderInput: '',
  currentCombinedId: '',
  currentChat: {},
  chats: [],
  chatIntervalId: 0,
  messagesIntervalId: 0,
};

const messagesSlice = createSlice({
  name: 'Station Messages',
  initialState,
  reducers: {
    updateSearchMessages: (state, action) => {
      state.searchMessages = action.payload;
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
    updateChats: (state, action) => {
      state.chats = action.payload;
    },
    updateChatIntervalId: (state, action) => {
      state.chatIntervalId = action.payload;
    },
    updateMessagesIntervalId: (state, action) => {
      state.messagesIntervalId = action.payload;
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
  updateChats,
  updateChatIntervalId,
  updateMessagesIntervalId,
} = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
