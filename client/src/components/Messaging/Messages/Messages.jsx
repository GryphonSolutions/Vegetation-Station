import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, SearchBar } from 'react-native-elements';
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
} from 'react-native';
import ChatList from './ChatList.jsx';

const Messages = () => {
  const styles = StyleSheet.create({
    header: {
      backgroundColor: '#fff',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: 'gray',
      borderBottomStyles: 'solid',
      borderBottomWidth: 1,
    },
    title: {
      fontWeight: '800',
      fontSize: 30,
    },
    search: {
      alignSelf: 'stretch',
    },
  });

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <SearchBar
          style={styles.search}
          platform="ios"
          placeholder="search users..."
        />
      </View>
      <ScrollView>
        <ChatList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Messages;
