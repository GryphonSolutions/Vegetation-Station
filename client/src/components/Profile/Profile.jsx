import React, { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, SafeAreaView, SectionList, Text, TouchableOpacity, View, Button, Image, Alert } from 'react-native';
import { updateSelectedUser } from '../../reducers';
import { getOffers, getCatalog, getPlants, getUsers } from '../../actions';
import styles from './assets/StyleSheet.jsx';

const plant = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-m6_9tWJNGZNP4ISvhI52ea-AGvKD2gXx9w&usqp=CAU';
const allTrades = [
  { isOpen: true }, { isOpen: false }, { isOpen: false }, { isOpen: true }, { isOpen: false },
  { isOpen: true }, { isOpen: false }, { isOpen: false }, { isOpen: true }, { isOpen: false },
  { isOpen: true }, { isOpen: false }, { isOpen: false }, { isOpen: true }, { isOpen: false },
  { isOpen: true }, { isOpen: false }, { isOpen: false }, { isOpen: true }, { isOpen: false },
  { isOpen: true }, { isOpen: false }, { isOpen: false }, { isOpen: true }, { isOpen: false },
  { isOpen: true }, { isOpen: false }, { isOpen: false }, { isOpen: true }, { isOpen: false },
  { isOpen: true }, { isOpen: false }, { isOpen: false }, { isOpen: true }, { isOpen: false },
];

const openTrades = allTrades.filter(item => item.isOpen === true);
const closedTrades = allTrades.filter(item => item.isOpen === false);

const Profile = ({ navigation }) => {
  const { activeUser, selectedUser, offers } = useSelector((state) => state.app);
  const { username, profilePicture, tradeCount, location } = selectedUser;
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(updateSelectedUser(activeUser));
  };

  const navMessage = () => {
    navigation.navigate('Messages');
  };

  const renderRow = (index, item1, item2, item3) => {
    return (
      <View key={`View ${index}`} style={styles.row}>
        {item1 && <Image key={index} style={styles.col} source={{ uri: plant }} />}
        {item2 && <Image key={index + 1} style={styles.col} source={{ uri: plant }} />}
        {item3 && <Image key={index + 2} style={styles.col} source={{ uri: plant }} />}
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View>
        <View style={styles.accountInfo}>
          <Image style={styles.profile} source={{ uri: profilePicture }} />
          <View style={styles.details}>
            <Text style={styles.name}>{username}</Text>
            <Text style={styles.location}>{`${location.city}, ${location.state}`}</Text>
            <Text style={styles.trades}>
              {tradeCount > 10 ? <Ionicons style={styles.starIcon} size="15px" name="md-star" /> : null}
              {`${tradeCount} Trades`}
            </Text>
            {username === activeUser.username
              ? (
                <TouchableOpacity style={styles.button} onPress={signOut}>
                  <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
              )
              : (
                <TouchableOpacity style={styles.button} onPress={navMessage}>
                  <Text style={styles.buttonText}>Message</Text>
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
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#606C38' }}>
        <View style={styles.headerContainer}>
          <Ionicons style={styles.backButton} name="arrow-undo" size="25px" onPress={() => navigation.navigate('Details')} />
          {username === activeUser.username
            ? <Text style={styles.headerText}>User Profile</Text>
            : <Text style={styles.headerText}>Profile</Text>}
        </View>
        <View style={styles.itemsContainer}>
          <SectionList
            sections={[{ data: [1] }]}
            renderItem={({ item }) => renderBody()}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
