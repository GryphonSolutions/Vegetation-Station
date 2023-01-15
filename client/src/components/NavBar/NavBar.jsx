import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Details,
  Home,
  Login,
  Chat,
  Messages,
  Offers,
  Post,
  Submit,
  Profile,
} from '..';

const Tab = createBottomTabNavigator();

const IoniconsRender = (iconName, size, color, isDarkMode) => {
  return <Ionicons name={iconName} size={size} color={isDarkMode ? 'white' : 'black'} />;
};

const routes = {
  Home: ['home', 'home-outline'],
  Offers: ['cart', 'cart-outline'],
  Post: ['add-circle', 'add-circle-outline'],
  Messages: ['chatbox', 'chatbox-outline'],
  Profile: ['person', 'person-outline'],
};

const NavBar = () => {
  const { isDarkMode } = useSelector((state) => state.app);
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = routes[route.name][focused ? 0 : 1];
            return IoniconsRender(iconName, size, color, isDarkMode);
          },
          headerShown: false,
          tabBarActiveTintColor: isDarkMode ? '#dda15e' : '#dda15e',
          tabBarInactiveTintColor: isDarkMode ? '#FFF' : '#000',
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#000' : '#FFF',
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
        />
        <Tab.Screen
          name="Offers"
          component={Offers}
        />
        <Tab.Screen
          name="Post"
          component={Post}
        />
        <Tab.Screen
          name="Messages"
          component={Messages}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavBar;