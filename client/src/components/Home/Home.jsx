import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Header from './Header';
import Body from './Body';

const Home = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#f0f4f1' }} />
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <Header />
          <Body />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Home;
