import React, { useCallBack } from 'react';
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
import { updateSelectedUser, updateCurrentPlant } from '../../reducers';

import * as navigation from '../NavBar/navigation';
import styles from './assets/stylesheet';
import SearchBar from './SearchBar';

export default function Body() {
  const { isDarkMode } = useSelector((state) => state.app);
  const { activeUser, users, catalog, currentPosts, currentOffers } =
    useSelector((state) => state.data);

  const dispatch = useDispatch();

  const goToPlant = (item) => {
    const target = users.filter((user) => user.username === item.poster);
    dispatch(updateSelectedUser(target[0]));
    dispatch(updateCurrentPlant(item));
    navigation.navigate('Details');
  };

  const renderImage = (item) => (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={() => goToPlant(item)}
    >
      <Image
        style={styles.itemImage}
        source={{ uri: item.images[0] }}
        resizeMode="cover"
      />
    </Pressable>
  );
  return (
    <View style={[styles.contentContainer]}>
      <SearchBar />
      <View style={styles.itemsContainer}>
        <FlatList
          data={currentPosts}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text>There are no plants to show</Text>}
          renderItem={({ item }) => renderImage(item)}
        />
      </View>
    </View>
  );
}
