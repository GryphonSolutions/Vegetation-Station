import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from 'react-native';

import styles from './assets/stylesheet';

export default function Header() {
  const { isDarkMode } = useSelector((state) => state.app);
  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: isDarkMode ? '#141312' : '#f0f4f1' },
      ]}
    >
      <Text
        style={[
          styles.headerText,
          { color: isDarkMode ? '#d39b52' : '#283618' },
          // { color: isDarkMode ? '#D2984E' : '#283618' },
        ]}
      >
        Vegetation{'\n'}
        Station
      </Text>
    </View>
  );
}
