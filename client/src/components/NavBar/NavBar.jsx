import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
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
  UserProfile,
} from '..';
import { navigationRef } from './navigation';
import { getCatalog, getOffers, getPlants, getUsers } from '../../actions';
import {
  updateCurrentOffers,
  updateCurrentPosts,
  updateFilteredCatalog,
} from '../../reducers';

const Tab = createBottomTabNavigator();

const IoniconsRender = (iconName, size, color, isDarkMode) => {
  return (
    <Ionicons
      name={iconName}
      size={size}
      color={isDarkMode ? '#d39b52' : '#224722'}
    />
  );
};

const routes = {
  Login: ['phone-portrait', 'phone-portrait-outline'],
  Home: ['home', 'home-outline'],
  Offers: ['cart', 'cart-outline'],
  Post: ['add-circle', 'add-circle-outline'],
  Messages: ['chatbox', 'chatbox-outline'],
  Profile: ['person', 'person-outline'],
  UserProfile: ['person', 'person-outline'],
  Details: ['ios-bookmarks', 'ios-bookmarks-outline'],
  Chat: ['notifications', 'notifications-outline'],
};

const NavBar = () => {
  const [fontsLoaded] = useFonts({
    AnonymousPro: require('../../assets/fonts/AnonymousPro-Regular.ttf'),
    'AnonymousPro-Bold': require('../../assets/fonts/AnonymousPro-Bold.ttf'),
    JosefinSans: require('../../assets/fonts/JosefinSans-Regular.ttf'),
  });
  const { isDarkMode } = useSelector((state) => state.app);
  const { activeUser } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers({ url: 'users/info' }));
    dispatch(getCatalog({ url: 'catalog/listings' }))
      .unwrap()
      .then(async (res) => {
        try {
          dispatch(updateFilteredCatalog(res));
          const listings = await res.filter((item) => {
            return item.isPosted === true || item.isTraded === false;
          });
          dispatch(updateCurrentPosts(listings));
        } catch (err) {
          console.error(err);
        }
      });
    dispatch(getOffers({ url: 'offers/archive' }))
      .unwrap()
      .then(async (res) => {
        try {
          const offers = await res.filter((item) => {
            return (
              item.buyer.id === activeUser.id ||
              item.seller.id === activeUser.id
            );
          });
          dispatch(updateCurrentOffers(offers));
        } catch (err) {
          console.error(err);
        }
      });
    dispatch(getPlants({ url: 'plants/details' }));
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>
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
            backgroundColor: isDarkMode ? '#2F2E2D' : '#d5dec6',
            borderTopWidth: 0,
            height: '10%',
            // height: '9%',
            // paddingTop: 10,
          },
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Offers" component={Offers} />
        <Tab.Screen name="Post" component={Post} />
        <Tab.Screen name="Messages" component={Messages} />
        <Tab.Screen name="UserProfile" component={UserProfile} />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false, // if you don't want to see the tab bar
          }}
        />
        <Tab.Screen
          name="Details"
          component={Details}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false, // if you don't want to see the tab bar
          }}
        />
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false, // if you don't want to see the tab bar
          }}
        />
        <Tab.Screen
          name="Login"
          component={Login}
          // options={{
          //   tabBarButton: () => null,
          //   tabBarVisible: false, // if you don't want to see the tab bar
          // }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavBar;
