import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Alert,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './assets/stylesheet';
import data from './fakeData';

const Home = () => {
  const [text, setText] = React.useState('');
  const { isDarkMode } = useSelector((state) => state.app);

  const renderImage = (item) => (
    <Pressable>
      <Image
        style={styles.itemImage}
        source={{ uri: item.images[0] }}
        resizeMode="cover"
      />
    </Pressable>
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#606C38' }} />
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Vegetation Station</Text>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.searchBarContainer}>
              <TextInput
                style={styles.searchBar}
                onChangeText={setText}
                value={text}
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
                  color={isDarkMode ? 'white' : 'black'}
                />
              </Pressable>
            </View>
            <View style={styles.itemsContainer}>
              <FlatList
                data={data}
                numColumns={3}
                ListEmptyComponent={<Text>There are no plants to show</Text>}
                renderItem={({ item }) => renderImage(item)}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Home;
