import React from 'react';
import { registerRootComponent } from 'expo';
import { createRoot } from 'react-dom/client';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store';
import {
  Details,
  Home,
  Login,
  Chat,
  Messages,
  Offers,
  Post,
  Submit,
} from './components';

const Stack = createNativeStackNavigator();

const root = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false, title: false }}
          />
        </Stack.Navigator> */}
        <Stack.Navigator initialRouteName="Submit">
          <Stack.Screen
            name="Submit"
            component={Submit}
            options={{ headerShown: false, title: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

registerRootComponent(root);
