import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from 'react-native';

import styles from './assets/stylesheet';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>
        Vegetation{'\n'}
        Station
      </Text>
    </View>
  );
}
