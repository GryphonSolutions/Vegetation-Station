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

const navigateSelectedProfile = () => {
  navigation.navigate('Profile');
};

const Details = () => {
  const { selectedUser, currentPlant } = useSelector((state) => state.data);
  const { location } = selectedUser;
  const { description, images, preferredTrade, commonName, postTitle } =
    currentPlant;
  const dispatch = useDispatch();
  console.log(currentPlant);
  return (
    // <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Header />
      <ScrollView scrollEnabled="true">
        <View style={styles.imageContainer}>
          <Image
            style={styles.plantPic}
            source={{
              uri: images[0],
            }}
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
          <View style={styles.LocationContainer}>
            <Text style={styles.plantNameText}>Trader's General Location:</Text>
            {/* <Location /> */}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => navigateSelectedProfile()}>
        <ProfileRibbon />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.detailPageButton}>
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailPageButton}
          onPress={() => {
            navigation.navigate('Post');
          }}
        >
          <Text>Propose Trade</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailPageButton}
          onPress={() => {
            navigation.navigate('Messages');
          }}
        >
          <Text>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
    //  </SafeAreaView>
  );
};

export default Details;
