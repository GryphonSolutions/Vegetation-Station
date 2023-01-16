import React, { useState } from 'react';
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
import {
  updateSearchMessages,
  updateUserMessageSearch,
} from '../../../reducers/messagesActions.js';
import ChatList from './ChatList.jsx';

const Messages = () => {
  const { isDarkMode } = useSelector((state) => state.app);
  const { searchMessages, userMessageSearch } = useSelector(
    (state) => state.messages,
  );
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    border: {
      borderStyle: 'solid',
      borderWidth: '2',
      borderColor: 'red',
    },
    header: {
      backgroundColor: '#fff',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: 'gray',
      borderBottomStyles: 'solid',
      borderBottomWidth: 1,
    },
    titleSearchCont: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      alignSelf: 'stretch',
    },
    title: {
      fontWeight: '800',
      fontSize: 30,
    },
    search: {
      alignSelf: 'stretch',
    },
  });

  const messagesArr = {
    123: {
      userInfo: {
        displayName: 'Mo',
        image: '',
        id: 1,
      },
      lastMessage: 'I love the fern, but you live too far.',
      date: '6:00pm',
    },
    125: {
      userInfo: {
        displayName: 'Matt',
        image: '',
        id: 10,
      },
      lastMessage: 'I love pink princesses.',
      date: '5:00pm',
    },
    129: {
      userInfo: {
        displayName: 'Thomas',
        image: '',
        id: 2,
      },
      lastMessage: "Plants don't grow amongst shadows.",
      date: '12:00am',
    },
    151: {
      userInfo: {
        displayName: 'Brian',
        image: '',
        id: 3,
      },
      lastMessage: 'Thanks so much for the plant!!!',
      date: '7:00pm',
    },
    51: {
      userInfo: {
        displayName: 'Brian',
        image: '',
        id: 3,
      },
      lastMessage: 'Thanks so much for the plant!!!',
      date: '7:00pm',
    },
    15: {
      userInfo: {
        displayName: 'Brian',
        image: '',
        id: 3,
      },
      lastMessage: 'Thanks so much for the plant!!!',
      date: '7:00pm',
    },
    11: {
      userInfo: {
        displayName: 'Brian',
        image: '',
        id: 3,
      },
      lastMessage: 'Thanks so much for the plant!!!',
      date: '7:00pm',
    },
    153: {
      userInfo: {
        displayName: 'Brian',
        image: '',
        id: 3,
      },
      lastMessage: 'Thanks so much for the plant!!!',
      date: '7:00pm',
    },
    133: {
      userInfo: {
        displayName: 'Brian',
        image: '',
        id: 3,
      },
      lastMessage: 'Thanks so much for the plant!!!',
      date: '7:00pm',
    },
    131: {
      userInfo: {
        displayName: 'Brian',
        image: '',
        id: 3,
      },
      lastMessage: 'Thanks so much for the plant!!!',
      date: '7:00pm',
    },
    1253: {
      userInfo: {
        displayName: 'Brian',
        image: '',
        id: 3,
      },
      lastMessage: 'Thanks so much for the plant!!!',
      date: '7:00pm',
    },
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.titleSearchCont}>
          <Text style={styles.title}>Messages</Text>
          <Ionicons
            name={
              searchMessages ? 'close-circle-outline' : 'search-circle-outline'
            }
            size="40"
            color={isDarkMode ? 'white' : 'black'}
            onPress={() => dispatch(updateSearchMessages())}
          />
        </View>
        {searchMessages && (
          <SearchBar
            style={styles.search}
            platform="ios"
            placeholder="search users..."
            value={userMessageSearch}
            lightTheme={isDarkMode}
            onChangeText={(newVal) => dispatch(updateUserMessageSearch(newVal))}
            onCancel={() => dispatch(updateSearchMessages())}
          />
        )}
      </View>
      {!searchMessages && (
        <ScrollView style={{ marginBottom: searchMessages ? 118 : 42 }}>
          {Object.entries(messagesArr).map((chat) => {
            return <ChatList chat={chat} />;
          })}
        </ScrollView>
      )}
      {searchMessages && (
        <>
          <Text>Start a New Conversation</Text>
          <ScrollView style={{ marginBottom: searchMessages ? 118 : 42 }}>
            {[].map((chat) => {
              return <ChatList chat={chat} />;
            })}
          </ScrollView>
          <Text>Your Conversations</Text>
          <ScrollView style={{ marginBottom: searchMessages ? 118 : 42 }}>
            {Object.entries(messagesArr).map((chat) => {
              if (
                chat[1].userInfo.displayName
                  .toLowerCase()
                  .includes(userMessageSearch.toLowerCase())
              ) {
                return <ChatList chat={chat} />;
              }
            })}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default Messages;
