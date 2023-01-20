import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Header from './Header';
import Body from './Body';
import {
  updateIsDarkMode,
  updateSearchMessages,
  updateUserMessageSearch,
} from '../../reducers';

const Home = () => {
  const { activeUser, selectedUser, users, catalog, currentOffers } =
    useSelector((state) => state.data);
  const { isDarkMode } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  // dispatch(updateIsDarkMode(false));

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = () => {
        dispatch(updateSearchMessages(false));
        dispatch(updateUserMessageSearch(''));
      };

      return unsubscribe();
    }, []),
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{ flex: 1, backgroundColor: isDarkMode ? '#141312' : '#f0f4f1' }}
      >
        <SafeAreaView
          style={{
            flex: 0,
          }}
        />
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
