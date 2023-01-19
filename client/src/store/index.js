import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  PERSIST,
  REHYDRATE,
  REGISTER,
  PURGE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  appReducer,
  messagesReducer,
  dataReducer,
  homeReducer,
} from '../reducers';

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
    home: homeReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          REHYDRATE,
          PERSIST,
          REGISTER,
          PURGE,
          'offers/archive/rejected',
          'catalog/listings/rejected',
          'offers/archive/rejected',
          'plants/details/rejected',
          'users/info/rejected',
          'messages/data/rejected',
        ],
      },
    });
  },
});

const persistor = persistStore(store);

export { store, persistor };
