import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  PERSIST,
  REHYDRATE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appReducer, messagesReducer, dataReducer } from '../reducers';

const persistAppConfig = {
  key: 'app',
  storage: AsyncStorage,
};

const persistDataConfig = {
  key: 'data',
  storage: AsyncStorage,
};

const persistedApp = persistReducer(persistAppConfig, appReducer);
const persistedData = persistReducer(persistDataConfig, dataReducer);

const store = configureStore({
  reducer: {
    app: persistedApp,
    messages: messagesReducer,
    data: persistedData,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PERSIST, REGISTER],
      },
    });
  },
});

const persistor = persistStore(store);

export { store, persistor };
