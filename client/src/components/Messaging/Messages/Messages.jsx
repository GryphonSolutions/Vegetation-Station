import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'react-native-elements';
import {
  StyleSheet,
  ScrollView,
  Text,
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
  });

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>
      <ScrollView>
        <ChatList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Messages;
