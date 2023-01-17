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
    1: {
      userInfo: {
        displayName: 'Mo',
        image: '',
        id: 1,
      },
      lastMessage: 'I love the fern, but you live too far.',
      date: '6:00pm',
    },
    2: {
      userInfo: {
        displayName: 'Matt',
        image: '',
        id: 10,
      },
      lastMessage: 'I love pink princesses.',
      date: '5:00pm',
    },
    3: {
      userInfo: {
        displayName: 'Thomas',
        image: '',
        id: 2,
      },
      lastMessage: "Plants don't grow amongst shadows.",
      date: '12:00am',
    },
    4: {
      userInfo: {
        displayName: 'Brian',
        image: '',
        id: 3,
      },
      lastMessage: 'Thanks so much for the plant!!!',
      date: '7:00pm',
    },
    5: {
      userInfo: {
        displayName: 'Brian',
        image: '',
        id: 3,
      },
      lastMessage: 'Thanks so much for the plant!!!',
      date: '7:00pm',
    },
    6: {
      userInfo: {
        displayName: 'Brian',
        image: '',
        id: 3,
      },
      lastMessage: 'Thanks so much for the plant!!!',
      date: '7:00pm',
    },
    7: {
      userInfo: {
        displayName: 'Brian',
        image: '',
        id: 3,
      },
      lastMessage: 'Thanks so much for the plant!!!',
      date: '7:00pm',
    },
    8: {
      userInfo: {
        displayName: 'Brian',
        image: '',
        id: 3,
      },
      lastMessage: 'Thanks so much for the plant!!!',
      date: '7:00pm',
    },
    9: {
      userInfo: {
        displayName: 'Brian',
        image: '',
        id: 3,
      },
      lastMessage: 'Thanks so much for the plant!!!',
      date: '7:00pm',
    },
    10: {
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
  };

  const usersArr = {
    document: [
      { id: 1, userName: 'paul' },
      { id: 2, userName: 'steve' },
      { id: 3, userName: 'stacy' },
      { id: 4, userName: 'resida' },
      { id: 5, userName: 'bravo' },
      { id: 6, userName: 'champ' },
      { id: 7, userName: 'ash' },
      { id: 8, userName: 'lilly' },
      { id: 9, userName: 'lucas' },
      { id: 10, userName: 'veronica' },
      { id: 11, userName: 'xenia' },
      { id: 12, userName: 'zach' },
      { id: 13, userName: 'wilson' },
      { id: 14, userName: 'arrow' },
      { id: 15, userName: 'misty' },
      { id: 16, userName: 'pam' },
    ],
  };
  const searchResultsChats = Object.entries(messagesArr).filter((chat) => {
    if (
      chat[1].userInfo.displayName
        .toLowerCase()
        .includes(userMessageSearch.toLowerCase())
    ) {
      return true;
    }
    return false;
  });
  const searchResultsUsers = usersArr.document.filter((user) => {
    if (user.userName.toLowerCase().includes(userMessageSearch.toLowerCase())) {
      return true;
    }
    return false;
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
                  return <NewChatList key={chat.id} chat={chat} />;
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
