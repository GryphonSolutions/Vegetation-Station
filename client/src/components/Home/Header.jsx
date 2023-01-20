import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from 'react-native';

import styles from './assets/stylesheet';

export default function Header() {
  const { isDarkMode } = useSelector((state) => state.app);
  return (
    <View style={styles.headerContainer}>
      <Text
        style={[
          styles.headerText,
          { color: isDarkMode ? '#d39b52' : '#283618' },
        ]}
      >
        Vegetation
      </Text>
      <Text
        style={[
          styles.headerText,
          { color: isDarkMode ? '#d39b52' : '#283618' },
        ]}
      >
        Station
      </Text>
    </View>
  );
}
