import React from 'react';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, SafeAreaView, SectionList, StatusBar, Image, TouchableOpacity, Alert, FlatList, Pressable } from 'react-native';
import styles from './assets/StyleSheet.jsx';
import testData from './testData.js';

const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1WmVyuYaItZbybhamm-BZv7TAniCg-qONA&usqp=CAU';
const { user } = testData;
const offers = [{ title: 'Your Offers', data: testData.offers }];
const requests = [{ title: 'Your Requests', data: testData.requests }];
const isDarkMode = false;


const Offers = ({ navigation }) => {
  const renderTrade = (item) => {
    return (
      <View style={styles.trade}>
        <View style={styles.yourItem}>
          <Text style={styles.user}>{user}</Text>
          <Image style={styles.plantImage} source={{ uri: image }} />
          {item.buyer === user
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
          <Text style={styles.user}>{item.seller === user ? item.buyer : item.seller}</Text>
          <Image style={styles.plantImage} source={{ uri: image }} />
          {item.buyer === user
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
        <StatusBar style="auto" />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Trade Proposals</Text>
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

export default Offers;
