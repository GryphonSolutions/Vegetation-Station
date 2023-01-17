import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, Header, ListItem, SearchBar } from 'react-native-elements';
import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  updateSearchMessages,
  updateUserMessageSearch,
} from '../../../reducers/messagesActions.js';
import ChatList from './ChatList.jsx';
import NewChatList from './NewChatList.jsx';

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

  const usersArr = {
    document: [
      { id: 123, userName: 'paul' },
      { id: 123, userName: 'steve' },
      { id: 123, userName: 'stacy' },
      { id: 123, userName: 'resida' },
      { id: 123, userName: 'bravo' },
      { id: 123, userName: 'champ' },
      { id: 123, userName: 'ash' },
      { id: 123, userName: 'lilly' },
      { id: 123, userName: 'lucas' },
      { id: 123, userName: 'veronica' },
      { id: 123, userName: 'xenia' },
      { id: 123, userName: 'zach' },
      { id: 123, userName: 'wilson' },
      { id: 123, userName: 'arrow' },
      { id: 123, userName: 'misty' },
      { id: 123, userName: 'pam' },
    ],
  };
  const searchResultsChats = Object.entries(messagesArr).filter((chat) => {
    if (
      chat[1].userInfo.displayName
        .toLowerCase()
        .includes(userMessageSearch.toLowerCase())
    ) {
      return chat;
    }
  });
  const searchResultsUsers = usersArr.document.filter((user) => {
    if (user.userName.toLowerCase().includes(userMessageSearch.toLowerCase())) {
      return user;
    }
  });
  const check = searchResultsUsers.length !== 0;

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
            return <ChatList key={chat[0]} chat={chat} />;
          })}
        </ScrollView>
      )}
      {searchMessages && (
        <KeyboardAvoidingView behavior="padding" style={{ marginBottom: 118 }}>
          <View style={{ maxHeight: '50%' }}>
            <Text>Start a New Conversation</Text>
            <ScrollView>
              {!check && (
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Title style={styles.name}>
                      No Users Found.
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              )}
              {check &&
                searchResultsUsers.map((chat) => {
                  return <NewChatList key={chat[1]} chat={chat} />;
                })}
            </ScrollView>
          </View>
          <View style={{ height: '50%' }}>
            <Text>Your Conversations</Text>
            <ScrollView>
              {searchResultsChats.map((chat) => {
                return <ChatList key={chat[0]} chat={chat} />;
              })}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default Messages;
