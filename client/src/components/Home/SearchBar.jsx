import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  Image,
  Alert,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './assets/stylesheet';
import data from './fakeData';
import { updateHomeSearchText, updateCurrentPosts } from '../../reducers';
import SearchModal from './SearchDropdown.jsx';

export default function SearchBar() {
  const { isDarkMode } = useSelector((state) => state.app);
  const { homeSearchText } = useSelector((state) => state.home);
  const [modalVisible, setModalVisible] = useState(false);

  const { catalog, currentPosts, filteredCatalog, users } = useSelector(
    (state) => state.data,
  );
  const dispatch = useDispatch();

  const updateSearch = (val) => {
    dispatch(updateHomeSearchText(val));
    const filtered = catalog.filter((item) => {
      return (
        item.commonName.toLowerCase().includes(val.toLowerCase()) &&
        (item.isPosted === true || item.isTraded === false)
      );
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

  const sortLocation = () => {};

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
    const sortedUsers = users.sort((a, b) =>
      compare(b.tradeCount, a.tradeCount),
    );
    const sorted = catalog.sort((a, b) => {
      const index1 = sortedUsers.map((e) => e.username).indexOf(a.poster);
      const index2 = sortedUsers.map((e) => e.username).indexOf(b.poster);
      return compare(index1, index2);
    });
    // dispatch(updateCurrentPosts(sorted));
  };

  const modalClick = () => {
    const temp = {};
    Object.assign(temp, styles.modalCatsText);
    styles.modalCatsText.color = 'red';
  };

  const filterChoice = () => {};

  // sortTopSellers();
  return (
    <View style={styles.searchBarContainer}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        presentationStyle="formSheet"
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View>
          <View style={styles.modalTitle}>
            <Text style={styles.modalHeaderText}>Sort By...</Text>
          </View>
          <View>
            <View style={styles.modalCats}>
              <Text style={styles.modalCatsText}>Alphabetically</Text>
              <Ionicons name="checkbox-outline" size="30px" />
            </View>
            <Text style={styles.modalCatsText}>Size</Text>
            <Text style={styles.modalCatsText}>Trade Count</Text>
          </View>
        </View>
      </Modal>

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
          setModalVisible(true);
          console.log('pressed');
        }}
      >
        <MaterialIcons
          name="sort"
          size={40}
          color={isDarkMode ? '#B3CB84' : '#f3b736'}
        />
        <View />
      </Pressable>
    </View>
  );
}
