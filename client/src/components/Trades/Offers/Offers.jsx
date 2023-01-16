import React from 'react';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, SafeAreaView, SectionList, StatusBar, Image, TouchableOpacity, Alert } from 'react-native';
import styles from './assets/StyleSheet.jsx';
import testData from './testData.js';

const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1WmVyuYaItZbybhamm-BZv7TAniCg-qONA&usqp=CAU';
const { user } = testData;
const DATA = [{ title: 'Your Offers', data: testData.offers }, { title: 'Your Requests', data: testData.requests }];
const isDarkMode = false;

const Offers = () => (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.innerItem1}>
            <Text style={styles.title}>{user}</Text>
            <Image style={styles.tinyLogo} source={{ uri: image }} />
            {item.buyer === user
              ? (
                <TouchableOpacity style={styles.accept} onPress={() => Alert.alert('Accept Button Pressed')}>
                  <Text>Accept</Text>
                </TouchableOpacity>
              )
              : (
                <TouchableOpacity style={styles.cancel} onPress={() => Alert.alert('Cancel Button Pressed')}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              )}
          </View>
          <View style={styles.innerItem2}>
            <Ionicons name="swap-horizontal" size="40px" color={isDarkMode ? 'white' : 'white'} />
          </View>
          <View style={styles.innerItem3}>
            <Text style={styles.title}>{item.seller === user ? item.buyer : item.seller}</Text>
            <Image style={styles.tinyLogo} source={{ uri: image }} />
            {item.buyer === user
              ? (
                <TouchableOpacity style={styles.decline} onPress={() => Alert.alert('Decline Button Pressed')}>
                  <Text>Decline</Text>
                </TouchableOpacity>
              )
              : (
                <TouchableOpacity style={styles.message} onPress={() => Alert.alert('Message Button Pressed')}>
                  <Text>Message</Text>
                </TouchableOpacity>
              )}
          </View>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (<Text style={styles.header}>{title}</Text>)}
    />
  </SafeAreaView>
);

export default Offers;
