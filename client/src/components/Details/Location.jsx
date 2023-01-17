import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import TestMap from './assets/testMap.png';
import styles from './assets/StyleSheet';

const Location = () => {
  return <Image style={styles.LocationImage} source={TestMap} />;
};

export default Location;
