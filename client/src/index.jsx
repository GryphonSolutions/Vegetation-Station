import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import store from './store';
import { NavBar } from './components/NavBar';

const root = () => {
  return (
    <Provider store={store}>
      <NavBar />z
    </Provider>
  );
};

registerRootComponent(root);
