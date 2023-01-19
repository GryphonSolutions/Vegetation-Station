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

const Details = () => {
  const { selectedUser, catalog } = useSelector((state) => state.data);
  const { location } = selectedUser;
  const dispatch = useDispatch();
  console.log(selectedUser);
  return (
    // <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Header />
      <ScrollView scrollEnabled="true">
        <View style={styles.imageContainer}>
          <Image
            style={styles.plantPic}
            source={{
              uri: 'https://www.domino.com/uploads/2020/08/24/00-FEATURE-pink-princess-philodendron-domino.jpg',
            }}
          />
        </View>
        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>Dethrone Me, the Pink Princess</Text>
          <View style={styles.plantNameContainer}>
            <Text style={styles.plantNameText}>Philodendron Erubescens</Text>
          </View>
          <View style={styles.postDescContainer}>
            <View style={styles.prefTradesContainer}>
              <Text style={styles.descTradesText}>Preferred trades: </Text>
              <Text style={styles.prefTradeText}>Ficus lyrata </Text>
            </View>
            <Text style={styles.plantPostDesc}>
              Well maintaned and healthy. I no longer want to be known as the
              Princess of Pink Princesses.
            </Text>
          </View>
          <View style={styles.LocationContainer}>
            <Text style={styles.plantNameText}>Trader's General Location:</Text>
            <Location />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity>
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
