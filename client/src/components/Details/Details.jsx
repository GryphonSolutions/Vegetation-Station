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

  const navigateMessages = () => {
    dispatch(updateSearchMessages(true));
    dispatch(updateUserMessageSearch(selectedUser.username));
    navigation.navigate('Messages');
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: isDarkMode ? '#141312' : '#f0f4f1' }}
    >
      <SafeAreaView style={{ flex: 0 }} />
      <View style={{ flex: 1 }}>
        <Header />
        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={styles.plantImageContainer}>
              <Image
                style={styles.plantImage}
                source={{ uri: currentPlant.images[0] }}
              />
            </View>
            <View style={styles.postContainer}>
              <Text style={styles.postTitle}>{postTitle}</Text>
              <View style={styles.plantNameContainer}>
                <Text style={styles.plantNameText}>{commonName}</Text>
              </View>
              <View style={styles.postDescContainer}>
                <View style={styles.prefTradesContainer}>
                  <Text style={styles.descTradesText}>Preferred trades: </Text>
                  <Text style={styles.prefTradeText}>{preferredTrade}</Text>
                </View>
                <Text style={styles.plantPostDesc}>{description}</Text>
              </View>
            </View>
            <View style={styles.LocationContainer}>
              <Text style={styles.plantNameText}>
                Trader&apos;s General Location:
              </Text>
              {/* <Location /> */}
            </View>
          </ScrollView>
          <TouchableOpacity onPress={() => navigateSelectedProfile()}>
            <ProfileRibbon />
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
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
        </View>
      </View>
    </View>
  );
};

export default Details;
