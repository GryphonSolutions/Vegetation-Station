import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { persistor } from '../../store';
import * as navigation from '../NavBar/navigation';
import styles from './assets/StyleSheet';

const returnHome = () => {
  persistor.purge();
  navigation.navigate('Home');
};

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Ionicons
        style={styles.backButton}
        name="arrow-undo"
        size="25px"
        onPress={() => returnHome()}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.headerText}>Item Information</Text>
      </View>
    </View>
  );
};

export default Header;
