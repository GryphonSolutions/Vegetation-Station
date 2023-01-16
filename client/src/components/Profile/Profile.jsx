import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View, Button, Image, Alert } from 'react-native';
import styles from './assets/StyleSheet.jsx';

const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu9Phe4zkjG0oyvuH5rGMSl1vpKHyXzqquqg&usqp=CAU';
const trades = 12;
const plant = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-m6_9tWJNGZNP4ISvhI52ea-AGvKD2gXx9w&usqp=CAU';

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons style={styles.backButton} name="arrow-undo" size="25px" onPress={() => navigation.navigate('Post')} />
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.accountInfo}>
        <Image style={styles.profile} source={{ uri: image }} />
        <View style={styles.details}>
          <Text style={styles.subHeader}>WHEN I KILL GOD</Text>
          <Text style={styles.subHeader}>Long Beach, CA</Text>
          <Text style={styles.subHeader}>
            <Ionicons style={styles.starIcon} size="15px" name="md-star" />
            12 Trades
          </Text>
          <TouchableOpacity style={styles.message} onPress={() => Alert.alert('Send Message')}>
            <Text>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.header2}>Open Trades</Text>
      <View style={styles.row}>
        <Image style={styles.col} source={{ uri: plant }} />
        <Image style={styles.col} source={{ uri: plant }} />
        <Image style={styles.col} source={{ uri: plant }} />
      </View>
      <Text style={styles.header2}>Closed Trades</Text>
      <View style={styles.rows}>
        <View style={styles.row}>
          <Image style={styles.col} source={{ uri: plant }} />
          <Image style={styles.col} source={{ uri: plant }} />
          <Image style={styles.col} source={{ uri: plant }} />
        </View>
        <View style={styles.row}>
          <Image style={styles.col} source={{ uri: plant }} />
          <Image style={styles.col} source={{ uri: plant }} />
          <Image style={styles.col} source={{ uri: plant }} />
        </View>
        <View style={styles.row}>
          <Image style={styles.col} source={{ uri: plant }} />
          <Image style={styles.col} source={{ uri: plant }} />
          <Image style={styles.col} source={{ uri: plant }} />
        </View>
      </View>
    </View>
  );
};

export default Profile;
