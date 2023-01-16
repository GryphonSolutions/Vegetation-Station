import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View, Button, Image, Alert } from 'react-native';
import styles from './assets/StyleSheet.jsx';

const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu9Phe4zkjG0oyvuH5rGMSl1vpKHyXzqquqg&usqp=CAU';
const trades = 12;
const topTrader = true;
const plant = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-m6_9tWJNGZNP4ISvhI52ea-AGvKD2gXx9w&usqp=CAU';
const openTrades = [0, 0, 0];
const closedTrades = [0, 0, 0, 0, 0, 0, 0, 0];

const renderOpenRow = () => {
  return (
    <View style={styles.row}>
      <Image style={styles.col} source={{ uri: plant }} />
      <Image style={styles.col} source={{ uri: plant }} />
      <Image style={styles.col} source={{ uri: plant }} />
    </View>
  );
};

const renderClosedRow = () => {
  return (
    <View style={styles.row}>
      <Image style={styles.col} source={{ uri: plant }} />
      <Image style={styles.col} source={{ uri: plant }} />
      <Image style={styles.col} source={{ uri: plant }} />
    </View>
  );
};

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons style={styles.backButton} name="arrow-undo" size="25px" onPress={() => navigation.navigate('Details')} />
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.accountInfo}>
        <Image style={styles.profile} source={{ uri: image }} />
        <View style={styles.details}>
          <Text style={styles.name}>WHEN I KILL GOD</Text>
          <Text style={styles.subHeader}>Long Beach, CA</Text>
          <Text style={styles.subHeader}>
            {topTrader ? <Ionicons style={styles.starIcon} size="15px" name="md-star" /> : null}
            12 Trades
          </Text>
          <TouchableOpacity style={styles.message} onPress={() => Alert.alert('Send Message')}>
            <Text>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.header2}>Open Trades</Text>
      {openTrades.length > 0
        ? renderOpenRow(openTrades.pop(), openTrades.pop(), openTrades.pop)
        : null}
      <Text style={styles.header2}>Closed Trades</Text>
      <View style={styles.rows}>
        {closedTrades.length > 0
          ? renderClosedRow(closedTrades.pop(), closedTrades.pop(), closedTrades.pop)
          : null}
        {closedTrades.length > 0
          ? renderClosedRow(closedTrades.pop(), closedTrades.pop(), closedTrades.pop)
          : null}
        {closedTrades.length > 0
          ? renderClosedRow(closedTrades.pop(), closedTrades.pop(), closedTrades.pop)
          : null}
      </View>
    </View>
  );
};

export default Profile;
