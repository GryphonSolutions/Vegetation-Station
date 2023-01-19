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
  const { catalog, currentPosts, filteredCatalog, users } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const updateSearch = (val) => {
    dispatch(updateHomeSearchText(val));
    const filtered = catalog.filter((item) => {
      return (item.commonName.toLowerCase()).includes(val.toLowerCase())
      && (item.isPosted === true || item.isTraded === false);
    });
    dispatch(updateCurrentPosts(filtered));
  };

  const compare = (a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  };

  const sortLocation = () => {

  };

  // sort alphabetically by color
  const sortColor = () => {
    const sorted = catalog.sort((a, b) => compare(a.color, b.color));
    // dispatch(updateCurrentPosts(sorted));
  };

  // sort smallest to largest size
  const sortSize = () => {
    const size = { small: 1, medium: 2, large: 3 };
    const sorted = catalog.sort((a, b) => compare(size[a.size], size[b.size]));
    // dispatch(updateCurrentPosts(sorted));
  };

  // sort highest to lowest trade count
  const sortTopSellers = () => {
    const sortedUsers = users.sort((a, b) => compare(b.tradeCount, a.tradeCount));
    const sorted = catalog.sort((a, b) => {
      const index1 = sortedUsers.map((e) => e.username).indexOf(a.poster);
      const index2 = sortedUsers.map((e) => e.username).indexOf(b.poster);
      return compare(index1, index2);
    });
    // dispatch(updateCurrentPosts(sorted));
  };

  // sortTopSellers();
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
