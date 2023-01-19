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
import testUsers from '../../../../../server/data/users.js';

const Messages = () => {
  const { isDarkMode } = useSelector((state) => state.app);
  const { activeUser } = useSelector((state) => state.data);
  const { searchMessages, userMessageSearch, chats, messagesIntervalId } =
    useSelector((state) => state.messages);
  const dispatch = useDispatch();

  const getChats = () => {
    axios
      .get('http://localhost:8080/api/chats/data', {
        params: { activeUser: String(activeUser.id) },
      })
      .then((res) => {
        console.log('ORDERED IN MESSAGES');
        dispatch(
          updateChats(
            Object.entries(res.data).sort(
              (a, b) => b[1].date.seconds - a[1].date.seconds,
            ),
          ),
        );
      })
      .catch((err) => {
        console.log(err, 'error when fetching chats');
      });
  };

  useEffect(() => {
    getChats();
  }, [activeUser]);

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

  const users = testUsers;

  // console.log('chats ', chats);

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
    // console.log(
    //   user.username,
    //   activeUser.username,
    //   user.username !== activeUser.username,
    // );
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
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.titleSearchCont}>
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity
            onPress={() => searchHandler(searchMessages)}
            activeOpacity={0.5}
          >
            <Ionicons
              name={
                searchMessages
                  ? 'close-circle-outline'
                  : 'search-circle-outline'
              }
              size="40"
              color={isDarkMode ? 'white' : 'black'}
            />
          </TouchableOpacity>
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
          {chats.length === 0 && (
            <ListItem>
              <ListItem.Content>
                <ListItem.Title style={styles.name}>
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
        <KeyboardAvoidingView behavior="padding" style={{ marginBottom: 118 }}>
          <View style={{ maxHeight: '50%' }}>
            <Text>Start a New Conversation</Text>
            <ScrollView>
              {!checkUsersLength && (
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Title style={styles.name}>
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
            <Text>Your Conversations</Text>
            <ScrollView>
              {!checkFilterChatsLength && (
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Title style={styles.name}>
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
    </SafeAreaView>
  );
};

export default Messages;
