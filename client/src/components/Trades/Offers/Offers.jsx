import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, SafeAreaView, SectionList, Image, TouchableOpacity, Alert } from 'react-native';
import { getOffers, getCatalog, getPlants, getUsers } from '../../../actions';
import styles from './assets/StyleSheet.jsx';
import testData from './testData.js';

const Offers = ({ navigation }) => {
  const {
    activeUser,
    selectedUser,
    users,
    catalog,
    currentOffers,
    isDarkMode,
  } = useSelector((state) => state.data);

  const { username, profilePicture, tradeCount, location } = selectedUser;
  const offers = [{
    title: 'Your Offers',
    data: currentOffers.filter((item) => activeUser.id === item.seller.id),
  }];
  const requests = [{
    title: 'Your Requests',
    data: currentOffers.filter((item) => activeUser.id === item.buyer.id),
  }];
  const dispatch = useDispatch();

  const findBuyer = (item) => {
    const target = users.filter((user) => item.seller.id === user.id);
    return target[0]?.username;
  };

  const findSeller = (item) => {
    const target = users.filter((user) => item.buyer.id === user.id);
    return target[0]?.username;
  };

  const findPhoto = (item) => {
    const target = catalog.filter((plant) => item === plant.id);
    return target[0]?.images[0];
  };

  const renderTrade = (item) => {
    return (
      <View style={styles.trade}>
        <View style={styles.yourItem}>
          <Text style={styles.user}>{activeUser?.username}</Text>
          <Image style={styles.plantImage} source={{ uri: findPhoto(item?.seller?.listing) }} />
          {activeUser?.id === item?.seller?.id
            ? (
              <TouchableOpacity style={styles.accept} onPress={() => Alert.alert('Accept Button Pressed')}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity style={styles.cancel} onPress={() => Alert.alert('Cancel Button Pressed')}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            )}
        </View>
        <View style={styles.arrows}>
          <Ionicons name="swap-horizontal" size="40px" color={isDarkMode ? 'white' : 'white'} />
        </View>
        <View style={styles.otherItem}>
          <Text style={styles.user}>
            {activeUser?.id === item?.buyer?.id
              ? findBuyer(item)
              : findSeller(item)}
          </Text>
          <Image style={styles.plantImage} source={{ uri: findPhoto(item?.buyer?.listing) }} />
          {activeUser?.id === item?.seller?.id
            ? (
              <TouchableOpacity style={styles.decline} onPress={() => Alert.alert('Decline Button Pressed')}>
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity style={styles.message} onPress={() => navigation.navigate('Chat')}>
                <Text style={styles.buttonText}>Message</Text>
              </TouchableOpacity>
            )}
        </View>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View>
        <Text style={styles.subHeader}>Your Offers</Text>
        <SectionList
          sections={offers}
          listKey={(item, index) => `_key${index.toString()}`}
          keyExtractor={(item, index) => `_key${index.toString()}`}
          renderItem={({ item }) => renderTrade(item)}
        />
        <Text style={styles.subHeader}>Your Requests</Text>
        <SectionList
          sections={requests}
          listKey={(item, index) => `_key${index.toString()}`}
          keyExtractor={(item, index) => `_key${index.toString()}`}
          renderItem={({ item }) => renderTrade(item)}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#606C38' }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Trade Proposals</Text>
        </View>
        <View style={styles.itemsContainer}>
          {currentOffers.length && catalog.length && (
            <SectionList
              sections={[{ data: [1] }]}
              renderItem={({ item }) => renderBody()}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Offers;
