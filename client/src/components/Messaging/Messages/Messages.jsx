import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  TouchableOpacity,
  View,
} from 'react-native';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import {
  updateSearchMessages,
  updateUserMessageSearch,
  updateChats,
  updateMessagesIntervalId,
} from '../../../reducers/messagesReducer.js';
import ChatList from './ChatList.jsx';
import NewChatList from './NewChatList.jsx';
import { db, chatsCol, chatMessagesCol } from '../../../../../server/database';

const Messages = () => {
  const { isDarkMode } = useSelector((state) => state.app);
  const { activeUser, users } = useSelector((state) => state.data);
  const { searchMessages, userMessageSearch, chats, messagesIntervalId } =
    useSelector((state) => state.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeUser.id) {
      const unSub = onSnapshot(
        doc(db, 'chats', String(activeUser.id)),
        { includeMetadataChanges: true },
        (document) => {
          const newChats = Object.entries(document.data())
            .sort((a, b) => b[1].date.seconds - a[1].date.seconds)
            .map((chat) => {
              chat[1].date = chat[1].date.seconds * 1000;
              return chat;
            });
          dispatch(updateChats(newChats));
        },
      );

      return () => {
        unSub();
      };
    }
  }, [activeUser]);

  const styles = StyleSheet.create({
    headerContainer: {},
    headerTextSearchButtonContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginVertical: '5%',
    },
    headerText: {
      fontFamily: 'AnonymousPro-Bold',
      fontSize: 35,
      letterSpacing: 1,
      color: isDarkMode ? 'white' : '#283618',
    },
    searchButtonContainer: {
      right: '4%',
      top: -3,
      position: 'absolute',
      alignItems: 'flex-end',
    },
    searchButton: {
      color: isDarkMode ? 'lightgreen' : '#283618',
    },
    searchBarContainer: {
      marginHorizontal: '4%',
      paddingTop: 0,
      paddingBottom: 0,
    },
    searchBarInputContainerStyle: {},
    searchText: {
      fontFamily: 'JosefinSans',
    },
    contentContainer: {
      marginHorizontal: '4%',
      flex: 1,
    },
    lobbyStatusMessage: {
      fontFamily: 'JosefinSans',
    },
    lobbySectionHeader: {
      fontFamily: 'JosefinSans',
      marginTop: 10,
      paddingVertical: 5,
      alignSelf: 'center',
      color: isDarkMode ? 'white' : '#283618',
    },
  });

  const searchResultsChats = chats.filter((chat) => {
    if (
      chat[1].chattingWith.username
        .toLowerCase()
        .includes(userMessageSearch.toLowerCase())
    ) {
      return true;
    }
    return false;
  });
  const checkFilterChatsLength = searchResultsChats.length > 0;

  const searchResultsUsers = users.filter((user) => {
    if (
      user.username.toLowerCase().includes(userMessageSearch.toLowerCase()) &&
      user.username !== activeUser.username
    ) {
      return true;
    }
    return false;
  });
  const checkUsersLength = searchResultsUsers.length > 0;

  const searchHandler = (bool) => {
    dispatch(updateSearchMessages(!bool));
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: isDarkMode ? '#141312' : '#f0f4f1' }}
    >
      <SafeAreaView
        style={{
          flex: 0,
        }}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTextSearchButtonContainer}>
            <Text style={styles.headerText}>Messages</Text>
            <TouchableOpacity
              style={styles.searchButtonContainer}
              onPress={() => searchHandler(searchMessages)}
              activeOpacity={0.5}
            >
              <Ionicons
                style={styles.searchButton}
                name={
                  searchMessages
                    ? 'close-circle-outline'
                    : 'search-circle-outline'
                }
                size={40}
                color={isDarkMode ? 'lightgreen' : 'black'}
              />
            </TouchableOpacity>
          </View>
          {searchMessages && (
            <SearchBar
              containerStyle={[
                { backgroundColor: isDarkMode ? '#141312' : '#f0f4f1' },
                styles.searchBarContainer,
              ]}
              inputContainerStyle={[
                { backgroundColor: isDarkMode ? '#656464' : '#d5dec6' },
                styles.searchBarInputContainerStyle,
              ]}
              inputStyle={[
                { color: isDarkMode ? '#f3e5dc' : '#224722' },
                styles.searchText,
              ]}
              platform="ios"
              placeholder="search users..."
              placeholderTextColor={isDarkMode ? 'white' : 'gray'}
              value={userMessageSearch}
              lightTheme={isDarkMode}
              onChangeText={(newVal) => {
                dispatch(updateUserMessageSearch(newVal));
              }}
              onCancel={() => dispatch(updateSearchMessages())}
            />
          )}
        </View>
        <View style={styles.contentContainer}>
          {!searchMessages && (
            <ScrollView style={{ marginBottom: searchMessages ? 76 : 0 }}>
              {chats.length === 0 && (
                <ListItem
                  containerStyle={{
                    backgroundColor: isDarkMode ? '#141312' : '#f0f4f1',
                  }}
                  topDivider
                  bottomDivider
                >
                  <ListItem.Content>
                    <ListItem.Title style={styles.lobbyStatusMessage}>
                      No current chats.
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              )}
              {chats.length > 0 &&
                chats.map((chat) => {
                  return <ChatList key={chat[0]} chat={chat} />;
                })}
            </ScrollView>
          )}
          {searchMessages && (
            <KeyboardAvoidingView behavior="padding">
              <View style={{ maxHeight: '50%' }}>
                <Text style={styles.lobbySectionHeader}>
                  Start a New Conversation
                </Text>
                <ScrollView>
                  {!checkUsersLength && (
                    <ListItem
                      containerStyle={{
                        backgroundColor: isDarkMode ? '#141312' : '#f0f4f1',
                      }}
                      topDivider
                      bottomDivider
                    >
                      <ListItem.Content>
                        <ListItem.Title style={styles.lobbyStatusMessage}>
                          No users named {userMessageSearch}.
                        </ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                  )}
                  {checkUsersLength &&
                    searchResultsUsers.map((user) => {
                      return <NewChatList key={user.username} user={user} />;
                    })}
                </ScrollView>
              </View>
              <View style={{ height: '50%' }}>
                <Text style={styles.lobbySectionHeader}>
                  Your Conversations
                </Text>
                <ScrollView>
                  {!checkFilterChatsLength && (
                    <ListItem
                      containerStyle={{
                        backgroundColor: isDarkMode ? '#141312' : '#f0f4f1',
                      }}
                      topDivider
                      bottomDivider
                    >
                      <ListItem.Content>
                        <ListItem.Title style={styles.lobbyStatusMessage}>
                          No chats with {userMessageSearch}.
                        </ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                  )}
                  {checkFilterChatsLength &&
                    searchResultsChats.map((chat) => {
                      return <ChatList key={chat[0]} chat={chat} />;
                    })}
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          )}
        </View>
      </View>
    </View>
  );
};

export default Messages;
