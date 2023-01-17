import React, { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View, Button, Image, Alert } from 'react-native';
import { updateSelectedUser } from '../../reducers';
import { getOffers, getCatalog, getPlants, getUsers } from '../../actions';
import styles from './assets/StyleSheet.jsx';

const topTrader = true;
const plant = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-m6_9tWJNGZNP4ISvhI52ea-AGvKD2gXx9w&usqp=CAU';
const allTrades = [
  { isOpen: true },
  { isOpen: true },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
];

const openTrades = allTrades.filter(item => item.isOpen === true);
const closedTrades = allTrades.filter(item => item.isOpen === false);

const newUser = {
  id: 2,
  username: 'Thomas',
  profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnZm2ZatubBeYhnkaOyzP49RKwTbB85jO0UA&usqp=CAU',
  tradeCount: 9,
  location: { city: 'San Jose', state: 'CA', longitude: 37.7701, latitude: 88.1937, zip: 90111 },
};

const Profile = ({ navigation }) => {
  const { activeUser, selectedUser, offers } = useSelector((state) => state.app);
  const { username, profilePicture, tradeCount, location } = selectedUser;
  const dispatch = useDispatch();

  const renderRow = (index, item1, item2, item3) => {
    return (
      <View key={`View ${index}`} style={styles.row}>
        {item1 && <Image key={index} style={styles.col} source={{ uri: plant }} />}
        {item2 && <Image key={index + 1} style={styles.col} source={{ uri: plant }} />}
        {item3 && <Image key={index + 2} style={styles.col} source={{ uri: plant }} />}
      </View>
    );
  };


  const signOut = () => {
    dispatch(updateSelectedUser(newUser));
  };

  const navMessage = () => {
    navigation.navigate('Messages');
  };

  useEffect(() => {
    dispatch(getOffers({ url: 'offers/archive' }));
  }, []);
  console.log('Offers: ', offers);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons style={styles.backButton} name="arrow-undo" size="25px" onPress={() => navigation.navigate('Details')} />
        {username === activeUser.username
          ? <Text style={styles.headerText}>User Profile</Text>
          : <Text style={styles.headerText}>Profile</Text>}
      </View>
      <View style={styles.accountInfo}>
        <Image style={styles.profile} source={{ uri: profilePicture }} />
        <View style={styles.details}>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.subHeader}>{`${location.city}, ${location.state}`}</Text>
          <Text style={styles.subHeader}>
            {tradeCount > 10 ? <Ionicons style={styles.starIcon} size="15px" name="md-star" /> : null}
            {`${tradeCount} Trades`}
          </Text>
          {username === activeUser.username
            ? (
              <TouchableOpacity style={styles.button} onPress={signOut}>
                <Text>Sign Out</Text>
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity style={styles.button} onPress={navMessage}>
                <Text>Message</Text>
              </TouchableOpacity>
            )}
        </View>
      </View>
      <Text style={styles.header2}>Open Trades</Text>
      {openTrades.map((item, i) => {
        return i % 3 === 0
          && renderRow(i, openTrades[i], openTrades[i + 1], openTrades[i + 2]);
      })}
      <Text style={styles.header3}>Closed Trades</Text>
      {closedTrades.map((item, i) => {
        return i % 3 === 0
          && renderRow(i, closedTrades[i], closedTrades[i + 1], closedTrades[i + 2]);
      })}
    </SafeAreaView>
  );
};

export default Profile;
