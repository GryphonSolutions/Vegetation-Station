import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import {
  Image,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Header from './Header';
import Location from './Location';
import ProfileRibbon from './ProfileRibbon';
import TestPic from './assets/testPic.png';
import styles from './assets/StyleSheet';

const Details = () => {
  return (
    // <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Header />
      <View style={styles.imageContainer}>
        <Image style={styles.plantPic} source={TestPic} />
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
        <TouchableOpacity>
          <ProfileRibbon />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.detailPageButton}>
            <Text>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailPageButton}>
            <Text>Propose Trade</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailPageButton}>
            <Text>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // </SafeAreaView>
  );
};

export default Details;
