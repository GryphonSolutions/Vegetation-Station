import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { Text } from 'react-native';
import { store, persistor } from './store';
import { NavBar } from './components/NavBar';

const root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavBar />
      </PersistGate>
    </Provider>
  );
};

registerRootComponent(root);
