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

import * as navigation from '../NavBar/navigation';
import styles from './assets/stylesheet';
import data from './fakeData';
import SearchBar from './SearchBar';

export default function Body() {
  const renderImage = (item) => (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={() => {
        navigation.navigate('Details');
      }}
    >
      <Image
        style={styles.itemImage}
        source={{ uri: item.images[0] }}
        resizeMode="cover"
      />
    </Pressable>
  );

  return (
    <View style={styles.contentContainer}>
      <SearchBar />
      <View style={styles.itemsContainer}>
        <FlatList
          data={data}
          numColumns={3}
          ListEmptyComponent={<Text>There are no plants to show</Text>}
          renderItem={({ item }) => renderImage(item)}
        />
      </View>
    </View>
  );
}
