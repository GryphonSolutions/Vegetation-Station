import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import {
  Image,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import Header from './Header';
import Location from './Location';
import ProfileRibbon from './ProfileRibbon';
import * as navigation from '../NavBar/navigation';
import styles from './assets/StyleSheet';
import { updateUserMessageSearch, updateSearchMessages } from '../../reducers';

const navigateSelectedProfile = () => {
  navigation.navigate('Profile');
};

const Details = () => {
  const { selectedUser, currentPlant } = useSelector((state) => state.data);
  const { isDarkMode } = useSelector((state) => state.app);
  const { description, images, preferredTrade, commonName, postTitle } =
    currentPlant;
  const dispatch = useDispatch();
  const [aspectRatio, setAspectRatio] = useState(null);

  const navigateMessages = () => {
    dispatch(updateSearchMessages(true));
    dispatch(updateUserMessageSearch(selectedUser.username));
    navigation.navigate('Messages');
  };

  Image.getSize(currentPlant.images[0], (width, height) => {
    setAspectRatio(height / width);
    console.log(height / width);
    console.log(Dimensions.get('window').width);
  });

  return (
    <View
      style={{ flex: 1, backgroundColor: isDarkMode ? '#141312' : '#f0f4f1' }}
    >
      <SafeAreaView />
      <View style={{ flex: 1 }}>
        <Header />
        <View style={styles.contentContainer}>
          <ScrollView style={{ flex: 1 }}>
            <Image
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').width * aspectRatio,
              }}
              source={{ uri: currentPlant.images[0] }}
            />
            <View style={styles.innerContentContainer}>
              <View style={styles.postContainer}>
                <Text style={styles.postTitle}>{postTitle}</Text>
                <Text style={styles.plantNameText}>{commonName}</Text>

                <Text style={{ marginBottom: 20 }}>
                  <Text style={styles.preferredTradesHeader}>
                    Preferred trades:{' '}
                  </Text>
                  <Text style={styles.preferredTradesText}>
                    {preferredTrade}
                  </Text>
                </Text>
                <View
                  style={{
                    paddingTop: 20,
                    borderTopWidth: 1,
                    paddingBottom: 20,
                    borderBottomWidth: 1,
                    borderColor: '#bbc4b0',
                  }}
                >
                  <Text style={styles.postDescriptionText}>{description}</Text>
                </View>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.detailPageButton}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.detailPageButton}
                  onPress={() => {
                    navigation.navigate('Post');
                  }}
                >
                  <Text style={styles.buttonText}>Propose Trade</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.detailPageButton}
                  onPress={() => {
                    navigateMessages();
                  }}
                >
                  <Text style={styles.buttonText}>Message</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.locationContainer}>
                <Text style={styles.locationHeaderText}>
                  Trader&apos;s General Location:
                </Text>
                {/* <View style={{ height: 200 }}> */}
                <Location />
                {/* </View> */}
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity onPress={() => navigateSelectedProfile()}>
            <ProfileRibbon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Details;
