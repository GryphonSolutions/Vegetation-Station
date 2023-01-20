import React, { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  SafeAreaView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
  Alert,
} from 'react-native';
import { persistor } from '../../store';
import { updateActiveUser, updateSelectedUser } from '../../reducers';
import { getOffers, getCatalog, getPlants, getUsers } from '../../actions';
import styles from './assets/StyleSheet.jsx';
import { logout } from '../Login/authLogout.js';

const Profile = ({ navigation }) => {
  const { activeUser, selectedUser, users, catalog, offers, currentOffers } =
    useSelector((state) => state.data);
  const { isDarkMode } = useSelector((state) => state.app);
  const { id, username, profilePicture, tradeCount, location } = selectedUser;
  const dispatch = useDispatch();

  const openTrades = offers.filter((item) => {
    return item.isOpen && (item.buyer.id === id || item.seller.id === id);
  });

  const closedTrades = offers.filter((item) => {
    return (
      !item.isOpen &&
      (item.buyer.id === id || item.seller.id === id) &&
      item.reason === 'accepted'
    );
  });

  const signOut = () => {
    persistor.purge();
    dispatch(updateActiveUser({}));
    logout();
    navigation.navigate('Login');
  };

  const navMessage = () => {
    persistor.purge();
    navigation.navigate('Messages');
  };

  const findPhoto = (item) => {
    let target;
    if (item.buyer.id === id) {
      target = catalog.filter((post) => {
        return post.id === item.buyer.listing;
      });
    } else {
      target = catalog.filter((post) => {
        return post.id === item.seller.listing;
      });
    }
    return target[0]
      ? target[0].images[0]
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTii1mJuz9Iuq_q7QJdqtNjxptTCWS1q6di8A&usqp=CAU';
  };

  const renderRow = (index, item1, item2, item3) => {
    return (
      <View key={`Row ${index}`} style={styles.itemsRow}>
        {item1 ? (
          <Image
            key={`View ${index}`}
            style={styles.itemImage}
            source={{ uri: findPhoto(item1) }}
          />
        ) : null}
        {item2 ? (
          <Image
            key={`View ${index + 1}`}
            style={styles.itemImage}
            source={{ uri: findPhoto(item2) }}
          />
        ) : null}
        {item3 ? (
          <Image
            key={`View ${index + 2}`}
            style={styles.itemImage}
            source={{ uri: findPhoto(item3) }}
          />
        ) : null}
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View>
        <View style={styles.accountInfoContainer}>
          <View style={styles.profilePictureContainer}>
            <Image
              style={styles.profilePicture}
              source={{ uri: profilePicture }}
            />
          </View>
          <View style={styles.profileDetailsContainer}>
            <Text style={[styles.profileDetailsText, styles.username]}>
              {username}
            </Text>
            <Text style={[styles.profileDetailsText, styles.userLocation]}>
              {`${location?.city}, ${location?.state}`}
            </Text>
            <View style={styles.tradeCounterContainer}>
              {tradeCount > 10 ? (
                <Ionicons style={styles.starIcon} size="15px" name="md-star" />
              ) : null}
              <Text style={[styles.profileDetailsText, styles.userTrades]}>
                {`${tradeCount} Trades`}
              </Text>
            </View>

            {username === activeUser.username ? (
              <TouchableOpacity style={styles.button} onPress={signOut}>
                <Text style={styles.buttonText}>Sign Out</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={navMessage}>
                <Text style={styles.buttonText}>Message</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.tradesListContainer}>
          <Text style={styles.tradesListHeader}>Open Trades</Text>

          <View style={styles.tradesListBodyContainer}>
            {openTrades?.map((item, i) => {
              return (
                i % 3 === 0 &&
                renderRow(
                  i,
                  openTrades[i],
                  openTrades[i + 1],
                  openTrades[i + 2],
                )
              );
            })}
          </View>
        </View>
        <View style={styles.tradesListContainer}>
          <Text style={styles.tradesListHeader}>Closed Trades</Text>
          <View style={styles.tradesListBodyContainer}>
            {closedTrades?.map((item, i) => {
              return (
                i % 3 === 0 &&
                renderRow(
                  i,
                  closedTrades[i],
                  closedTrades[i + 1],
                  closedTrades[i + 2],
                )
              );
            })}
          </View>
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
        <View style={styles.headerContainer}>
          {activeUser.username === username ? null : (
            <Ionicons
              style={styles.backButton}
              name="arrow-undo"
              size={30}
              onPress={() => navigation.navigate('Details')}
            />
          )}

          {activeUser.username === username ? (
            <Text style={styles.headerText}>User Profile</Text>
          ) : (
            <Text style={styles.headerText}>Profile</Text>
          )}
        </View>
        <View style={styles.contentContainer}>
          <SectionList
            showsVerticalScrollIndicator={false}
            sections={[{ data: [1] }]}
            renderItem={({ item }) => renderBody()}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;
