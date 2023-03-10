import { React, useState, useEffect } from 'react';
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
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './assets/stylesheet';
import data from './fakeData';
import { updateHomeSearchText, updateCurrentPosts } from '../../reducers';

export default function SearchBar() {
  const [modalVisible, setModalVisible] = useState(false);
  const { isDarkMode } = useSelector((state) => state.app);
  const [whatToSort, setWhatToSort] = useState('');

  const { homeSearchText } = useSelector((state) => state.home);
  const { activeUser, catalog, currentPosts, filteredCatalog, users } =
    useSelector((state) => state.data);
  const dispatch = useDispatch();

  // useEffect(() => {}, [whatToSort]);

  const updateSearch = (val) => {
    dispatch(updateHomeSearchText(val));
    const filtered = catalog.filter((item) => {
      return (
        item.commonName.toLowerCase().includes(val.toLowerCase()) &&
        item.isPosted === true &&
        item.isTraded === false &&
        item.poster !== activeUser.username
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
    const sortedCat = [...catalog];
    const sorted = sortedCat.sort((a, b) => compare(a.color, b.color));
    dispatch(updateCurrentPosts(sorted));
  };

  // sort smallest to largest size
  const sortSize = () => {
    const size = { small: 1, medium: 2, large: 3 };
    const toSort = [...catalog];
    const sorted = toSort.sort((a, b) => compare(size[a.size], size[b.size]));
    dispatch(updateCurrentPosts(sorted));
  };

  // sort highest to lowest trade count
  const sortTopSellers = () => {
    const spreadUsers = [...users];
    const sortedUsers = spreadUsers.sort((a, b) =>
      compare(b.tradeCount, a.tradeCount),
    );
    const spreadCat = [...catalog];
    const sorted = spreadCat.sort((a, b) => {
      const index1 = sortedUsers.map((e) => e.username).indexOf(a.poster);
      const index2 = sortedUsers.map((e) => e.username).indexOf(b.poster);
      return compare(index1, index2);
    });
    dispatch(updateCurrentPosts(sorted));
  };

  const [howToSort, setHowToSort] = useState({
    alph: sortColor,
    size: sortSize,
    trades: sortTopSellers,
  });

  const filterChoice = (val) => {
    if (whatToSort === val) {
      setWhatToSort('');
      setModalVisible(false);
    } else {
      setWhatToSort(val);
      howToSort[val]();
      setModalVisible(false);
    }
  };
  // sortTopSellers();
  return (
    <View style={styles.searchBarContainer}>
      <View>
        <Modal
          animationType="slide"
          visible={modalVisible}
          presentationStyle="formSheet"
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View
            style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : 'white' }}
          >
            <View
              style={[
                styles.modalTitle,
                { color: isDarkMode ? 'white' : 'black' },
              ]}
            >
              <Text
                style={[
                  styles.modalHeaderText,
                  { color: isDarkMode ? 'white' : 'black' },
                ]}
              >
                Sort By...
              </Text>
            </View>
            <View>
              <View style={styles.modalCats}>
                <Text
                  onPress={() => {
                    filterChoice('trades');
                  }}
                  style={[
                    styles.modalCatsText,
                    { color: isDarkMode ? 'white' : '#283618' },
                  ]}
                >
                  - Top Traders
                </Text>
                {whatToSort === 'trades' ? (
                  <Ionicons
                    name="checkbox-outline"
                    size="30px"
                    style={styles.iconStyling}
                  />
                ) : (
                  <Ionicons
                    name="square-outline"
                    size="30px"
                    style={styles.iconStyling}
                  />
                )}
              </View>
              <View style={styles.modalCats}>
                <Text
                  style={[
                    styles.modalCatsText,
                    { color: isDarkMode ? 'white' : '#283618' },
                  ]}
                  onPress={() => {
                    filterChoice('size');
                  }}
                >
                  - Size
                </Text>
                {whatToSort === 'size' ? (
                  <Ionicons
                    name="checkbox-outline"
                    size="30px"
                    style={styles.iconStyling}
                  />
                ) : (
                  <Ionicons
                    name="square-outline"
                    size="30px"
                    style={styles.iconStyling}
                  />
                )}
              </View>
              <View style={styles.modalCats}>
                <Text
                  style={[
                    styles.modalCatsText,
                    { color: isDarkMode ? 'white' : '#283618' },
                  ]}
                  onPress={() => {
                    filterChoice('alph');
                  }}
                >
                  - Color
                </Text>
                {whatToSort === 'alph' ? (
                  <Ionicons
                    name="checkbox-outline"
                    size="30px"
                    style={styles.iconStyling}
                  />
                ) : (
                  <Ionicons
                    name="square-outline"
                    size="30px"
                    style={styles.iconStyling}
                  />
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>

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
        placeholder="search plants..."
        placeholderTextColor={isDarkMode ? 'white' : '#6d6d6d'}
      />

      <Pressable
        onPress={() => {
          setModalVisible(true);
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
