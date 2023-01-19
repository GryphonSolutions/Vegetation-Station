import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchMessages: false,
  userMessageSearch: '',
  senderInput: '',
  currentCombinedId: '',
  activeUser: '89621280',
  chatHeaderInfo: { username: '', profilePicture: '' },
  currentChat: [],
  chats: [],
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
    updateChatHeaderInfo: (state, action) => {
      state.chatHeaderInfo = action.payload;
    },
    updateCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    updateChats: (state, action) => {
      state.chats = action.payload;
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
  updateChatHeaderInfo,
} = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
