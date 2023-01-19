import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './assets/stylesheet';
import data from './fakeData';

import { updateHomeSearchText } from '../../reducers';

export default function SearchBar() {
  const { isDarkMode, homeSearchText } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={[
          styles.searchBar,
          {
            color: isDarkMode ? '#f3e5dc' : '#224722',
            backgroundColor: isDarkMode ? '#656464' : '#d5dec6',
          },
        ]}
        onChangeText={(val) => dispatch(updateHomeSearchText(val))}
        value={homeSearchText}
        placeholder="search for plants"
      />
      <Pressable
        onPress={() => {
          Alert.alert('Sort By:');
        }}
      >
        <MaterialIcons
          name="sort"
          size={40}
          color={isDarkMode ? '#B3CB84' : '#f3b736'}
        />
      </Pressable>
    </View>
  );
}
