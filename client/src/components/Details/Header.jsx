import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from '../../store';
import * as navigation from '../NavBar/navigation';
import styles from './assets/StyleSheet';
import { updateSelectedUser } from '../../reducers';

const Header = () => {
  const dispatch = useDispatch();
  const { selectedUser, activeUser } = useSelector((state) => state.data);
  const { isDarkMode } = useSelector((state) => state.app);
  const returnHome = () => {
    persistor.purge();
    navigation.navigate('Home');
  };
  return (
    <View style={styles.headerContainer}>
      <Ionicons
        style={styles.backButton}
        name="arrow-undo"
        size={30}
        onPress={() => returnHome()}
      />

      <Text
        style={[
          styles.headerText,
          { color: isDarkMode ? '#d39b52' : '#283618' },
        ]}
      >
        Item
      </Text>
      <Text
        style={[
          styles.headerText,
          { color: isDarkMode ? '#d39b52' : '#283618' },
        ]}
      >
        Information
      </Text>
    </View>
  );
};

export default Header;
