import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import styles from './assets/StyleSheet';

const Location = () => {
  return (
    <Image
      style={styles.LocationImage}
      source="https://www.virtuallocation.com/images/android-location/google-maps-distance-radius-1.jpg"
    />
  );
};

export default Location;
