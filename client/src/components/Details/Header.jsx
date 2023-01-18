import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import styles from './assets/StyleSheet';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Ionicons
        style={styles.backButton}
        name="arrow-undo"
        size="25px"
        // onPress={() => navigation.navigate('Details')}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.headerText}>Item Information</Text>
      </View>
    </View>
  );
};

export default Header;
