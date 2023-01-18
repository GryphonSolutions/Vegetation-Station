import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../reducers';
import messagesReducer from '../reducers/messagesActions.js';

const store = configureStore({
  reducer: {
    app: appReducer,
    messages: messagesReducer,
  },
});

export default store;
