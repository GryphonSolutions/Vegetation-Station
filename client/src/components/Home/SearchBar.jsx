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
import { updateHomeSearchText, updateCurrentPosts } from '../../reducers';

export default function SearchBar() {
  const { isDarkMode } = useSelector((state) => state.app);
  const { homeSearchText } = useSelector((state) => state.home);
  const { catalog, filteredCatalog } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const updateSearch = (val) => {
    dispatch(updateHomeSearchText(val));
    const filtered = catalog.filter((item) => {
      return (item.commonName.toLowerCase()).includes(val.toLowerCase())
      && (item.isPosted === true || item.isTraded === false);
    });
    dispatch(updateCurrentPosts(filtered));
  };

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
        onChangeText={(val) => updateSearch(val)}
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
