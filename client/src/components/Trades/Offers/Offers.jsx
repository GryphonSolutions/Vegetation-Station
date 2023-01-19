import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Text,
  View,
  SafeAreaView,
  SectionList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { getOffers, getCatalog, getPlants, getUsers } from '../../../actions';
import { updateSelectedUser } from '../../../reducers';
import styles from './assets/StyleSheet.jsx';

const Offers = ({ navigation }) => {
  const { activeUser, selectedUser, users, catalog, currentOffers } =
    useSelector((state) => state.data);
  const { isDarkMode } = useSelector((state) => state.app);
  const { username, profilePicture, tradeCount, location } = selectedUser;
  const dispatch = useDispatch();

  const offers = [
    {
      title: 'Your Offers',
      data: currentOffers.filter((item) => activeUser.id === item.seller.id),
    },
  ];
  const requests = [
    {
      title: 'Your Requests',
      data: currentOffers.filter((item) => activeUser.id === item.buyer.id),
    },
  ];

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

  const acceptTrade = (item) => {
    const sellerListingID = item.seller.listing;
    const buyerListingID = item.buyer.listing;
    item.isOpen = false;
    item.reason = 'accepted';
    axios
      .patch(
        'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/offers/archive',
        item,
        { headers: { 'content-type': 'application/json' } },
      )
      .then(() => console.log('success'))
      .catch((err) => console.error(err));
    const target1 = catalog.filter((plant) => sellerListingID === plant.id);
    target1[0].isTraded = true;
    axios
      .patch(
        'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/catalog/listings',
        target1[0],
        {
          headers: { 'content-type': 'application/json' },
        },
      )
      .then(() => console.log('success'))
      .catch((err) => console.error(err));
    const target2 = catalog.filter((plant) => buyerListingID === plant.id);
    target2[0].isTraded = true;
    axios
      .patch(
        'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/catalog/listings',
        target2[0],
        {
          headers: { 'content-type': 'application/json' },
        },
      )
      .then(() => console.log('success'))
      .catch((err) => console.error(err));
  };

  const declineTrade = (item) => {
    const buyerListingID = item.buyer.listing;
    item.isOpen = false;
    item.reason = 'declined';
    axios
      .patch(
        'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/offers/archive',
        item,
        {
          headers: { 'content-type': 'application/json' },
        },
      )
      .then(() => console.log('success'))
      .catch((err) => console.error(err));
    const target = catalog.filter((plant) => buyerListingID === plant.id);
    target[0].isTraded = true;
    axios
      .patch(
        'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/catalog/listings',
        target[0],
        {
          headers: { 'content-type': 'application/json' },
        },
      )
      .then(() => console.log('success'))
      .catch((err) => console.error(err));
  };

  const cancelTrade = (item) => {
    const sellerListingID = item.seller.listing;
    const buyerListingID = item.buyer.listing;
    item.isOpen = false;
    item.reason = 'canceled';
    axios
      .patch(
        'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/offers/archive',
        item,
        {
          headers: { 'content-type': 'application/json' },
        },
      )
      .then(() => console.log('success'))
      .catch((err) => console.error(err));
    const target1 = catalog.filter((plant) => sellerListingID === plant.id);
    target1[0].isTraded = true;
    axios
      .patch(
        'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/catalog/listings',
        target1[0],
        {
          headers: { 'content-type': 'application/json' },
        },
      )
      .then(() => console.log('success'))
      .catch((err) => console.error(err));
    const target2 = catalog.filter((plant) => buyerListingID === plant.id);
    target2[0].isTraded = true;
    axios
      .patch(
        'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/catalog/listings',
        target2[0],
        {
          headers: { 'content-type': 'application/json' },
        },
      )
      .then(() => console.log('success'))
      .catch((err) => console.error(err));
  };

  const chatWithUser = (id) => {
    const target = users.filter((user) => user.id === id);
    dispatch(updateSelectedUser(target[0]));
    navigation.navigate('Chat');
  };

  const renderTrade = (item) => {
    return (
      <View style={styles.tradeContainer}>
        <View style={styles.itemContainer}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{activeUser?.username}</Text>
          </View>
          <Image
            style={styles.plantImage}
            source={{ uri: findPhoto(item?.seller?.listing) }}
          />
          <View style={styles.buttonContainer}>
            {activeUser?.id === item?.seller?.id ? (
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.accept,
                  { backgroundColor: '#405725' },
                ]}
                onPress={() => acceptTrade(item)}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.cancel,
                  { backgroundColor: '#64370c' },
                ]}
                onPress={() => cancelTrade(item)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.arrowsContainer}>
          <Ionicons
            name="swap-horizontal"
            size="40px"
            color={isDarkMode ? '#85766a' : '#1c381c'}
          />
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>
              {activeUser?.id === item?.buyer?.id
                ? findBuyer(item)
                : findSeller(item)}
            </Text>
          </View>
          <Image
            style={styles.plantImage}
            source={{ uri: findPhoto(item?.buyer?.listing) }}
          />
          {activeUser?.id === item?.seller?.id ? (
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.decline,
                { backgroundColor: '#64370c' },
              ]}
              onPress={() => cancelTrade(item)}
            >
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.message,
                { backgroundColor: '#405725' },
              ]}
              onPress={() => chatWithUser(item.seller.id)}
            >
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
        <View
          style={[
            { backgroundColor: isDarkMode ? '#656464' : '#e4e9dc' },
            styles.sectionContainer,
          ]}
        >
          <View style={styles.subHeaderContainerPositioner}>
            <View
              style={[
                { backgroundColor: isDarkMode ? '#B3CB84' : '#f0c466' },
                styles.subHeaderContainer,
              ]}
            >
              <Text style={styles.subHeader}>Your Offers</Text>
            </View>
          </View>
          <SectionList
            sections={offers}
            listKey={(item, index) => `_key${index.toString()}`}
            keyExtractor={(item, index) => `_key${index.toString()}`}
            renderItem={({ item }) => renderTrade(item)}
          />
        </View>
        <View
          style={[
            { backgroundColor: isDarkMode ? '#656464' : '#e4e9dc' },
            styles.sectionContainer,
          ]}
        >
          <View style={styles.subHeaderContainerPositioner}>
            <View
              style={[
                { backgroundColor: isDarkMode ? '#B3CB84' : '#f0c466' },
                styles.subHeaderContainer,
              ]}
            >
              <Text style={styles.subHeader}>Your Requests</Text>
            </View>
          </View>
          <SectionList
            sections={requests}
            listKey={(item, index) => `_key${index.toString()}`}
            keyExtractor={(item, index) => `_key${index.toString()}`}
            renderItem={({ item }) => renderTrade(item)}
          />
        </View>
      </View>
    );
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: isDarkMode ? '#141312' : '#f0f4f1' }}
    >
      <SafeAreaView style={{ flex: 0 }} />
      <View style={{ flex: 1 }}>
        <View style={[styles.headerContainer]}>
          <Text style={styles.headerText}>Trade Proposals</Text>
        </View>
        <View style={styles.contentContainer}>
          {currentOffers.length ? (
            <SectionList
              sections={[{ data: [1] }]}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => renderBody()}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default Offers;
