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
} from '../../../reducers/messagesReducer.js';
import ChatList from './ChatList.jsx';
import NewChatList from './NewChatList.jsx';
import { db, chatsCol, chatMessagesCol } from '../../../../../server/database';

const Messages = () => {
  const { isDarkMode } = useSelector((state) => state.app);
  // const { activeUser } = useSelector((state) => state.data);
  const { activeUser, searchMessages, userMessageSearch, chats } = useSelector(
    (state) => state.messages,
  );
  const dispatch = useDispatch();

  const getChats = () => {
    axios
      .get('http://localhost:8080/api/chats/data', {
        params: { activeUser },
      })
      .then((res) => {
        dispatch(updateChats(Object.entries(res.data)));
      })
      .catch((err) => {
        console.log(err, 'error when fetching chats');
      });
  };

  useEffect(() => {
    getChats();
  }, [activeUser]);

  console.log(chats);

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

  const users = [
    {
      id: '11347750',
      username: 'akbarimo',
      profilePicture: 'https://i.imgur.com/br9bWAp.png',
      tradeCount: 1,
      location: {
        city: 'San Fransisco',
        state: 'California',
        zip: 94016,
        longitude: 1,
        latitude: 1,
      },
    },
    {
      id: '11347751',
      username: 'SaldanaThomas',
      profilePicture: 'https://i.imgur.com/br9bWAp.png',
      tradeCount: 2,
      location: {
        city: 'San Mateo',
        state: 'California',
        zip: 94010,
        longitude: 1,
        latitude: 1,
      },
    },
    {
      id: '11347752',
      username: 'JustDatGuy',
      profilePicture: 'https://i.imgur.com/br9bWAp.png',
      tradeCount: 15,
      location: {
        city: 'Los Angeles',
        state: 'California',
        zip: 90001,
        longitude: 1,
        latitude: 1,
      },
    },
    {
      id: '11347753',
      username: 'kylemartinelli',
      profilePicture: 'https://i.imgur.com/br9bWAp.png',
      tradeCount: 20,
      location: {
        city: 'Los Angeles',
        state: 'California',
        zip: 90005,
        longitude: 1,
        latitude: 1,
      },
    },
    {
      id: '11347754',
      username: 'officiallywilly',
      profilePicture: 'https://i.imgur.com/br9bWAp.png',
      tradeCount: 1,
      location: {
        city: 'Los Angeles',
        state: 'California',
        zip: 90001,
        longitude: 1,
        latitude: 1,
      },
    },
    {
      id: '11347755',
      username: 'RyanGehris',
      profilePicture: 'https://i.imgur.com/br9bWAp.png',
      tradeCount: 4,
      location: {
        city: 'Los Angeles',
        state: 'California',
        zip: 90006,
        longitude: 1,
        latitude: 1,
      },
    },
    {
      id: '11347756',
      username: 'WhenIKillGod',
      profilePicture: 'https://i.imgur.com/br9bWAp.png',
      tradeCount: 23,
      location: {
        city: 'Dublin',
        state: 'California',
        zip: 94568,
        longitude: 1,
        latitude: 1,
      },
    },
    {
      id: '11347757',
      username: 'PeaceLilyMilly',
      profilePicture: 'https://i.imgur.com/br9bWAp.png',
      tradeCount: 69,
      location: {
        city: 'Reno',
        state: 'Nevada',
        zip: 89433,
        longitude: 1,
        latitude: 1,
      },
    },
  ];

  console.log('chats ', chats);
  const searchResultsChats = chats.filter((chat) => {
    if (chat[1].chattingWith.username.includes(userMessageSearch)) {
      return true;
    }
    return false;
  });
  const checkFilterChatsLength = searchResultsChats.length > 0;

  const searchResultsUsers = users.filter((user) => {
    if (user.username.includes(userMessageSearch)) {
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

// const messagesArr = {
//   1: {
//     userInfo: {
//       displayName: 'Mo',
//       image: '',
//       id: 1,
//     },
//     lastMessage: 'I love the fern, but you live too far.',
//     date: '6:00pm',
//   },
//   2: {
//     userInfo: {
//       displayName: 'Matt',
//       image: '',
//       id: 10,
//     },
//     lastMessage: 'I love pink princesses.',
//     date: '5:00pm',
//   },
//   3: {
//     userInfo: {
//       displayName: 'Thomas',
//       image: '',
//       id: 2,
//     },
//     lastMessage: "Plants don't grow amongst shadows.",
//     date: '12:00am',
//   },
//   4: {
//     userInfo: {
//       displayName: 'Brian',
//       image: '',
//       id: 3,
//     },
//     lastMessage: 'Thanks so much for the plant!!!',
//     date: '7:00pm',
//   },
//   5: {
//     userInfo: {
//       displayName: 'Brian',
//       image: '',
//       id: 3,
//     },
//     lastMessage: 'Thanks so much for the plant!!!',
//     date: '7:00pm',
//   },
//   6: {
//     userInfo: {
//       displayName: 'Brian',
//       image: '',
//       id: 3,
//     },
//     lastMessage: 'Thanks so much for the plant!!!',
//     date: '7:00pm',
//   },
//   7: {
//     userInfo: {
//       displayName: 'Brian',
//       image: '',
//       id: 3,
//     },
//     lastMessage: 'Thanks so much for the plant!!!',
//     date: '7:00pm',
//   },
//   8: {
//     userInfo: {
//       displayName: 'Brian',
//       image: '',
//       id: 3,
//     },
//     lastMessage: 'Thanks so much for the plant!!!',
//     date: '7:00pm',
//   },
//   9: {
//     userInfo: {
//       displayName: 'Brian',
//       image: '',
//       id: 3,
//     },
//     lastMessage: 'Thanks so much for the plant!!!',
//     date: '7:00pm',
//   },
//   10: {
//     userInfo: {
//       displayName: 'Brian',
//       image: '',
//       id: 3,
//     },
//     lastMessage: 'Thanks so much for the plant!!!',
//     date: '7:00pm',
//   },
//   11: {
//     userInfo: {
//       displayName: 'Brian',
//       image: '',
//       id: 3,
//     },
//     lastMessage: 'Thanks so much for the plant!!!',
//     date: '7:00pm',
//   },
// };

// const usersArr = {
//   document: [
//     { id: 1, userName: 'paul' },
//     { id: 2, userName: 'steve' },
//     { id: 3, userName: 'stacy' },
//     { id: 4, userName: 'resida' },
//     { id: 5, userName: 'bravo' },
//     { id: 6, userName: 'champ' },
//     { id: 7, userName: 'ash' },
//     { id: 8, userName: 'lilly' },
//     { id: 9, userName: 'lucas' },
//     { id: 10, userName: 'veronica' },
//     { id: 11, userName: 'xenia' },
//     { id: 12, userName: 'zach' },
//     { id: 13, userName: 'wilson' },
//     { id: 14, userName: 'arrow' },
//     { id: 15, userName: 'misty' },
//     { id: 16, userName: 'pam' },
//   ],
// };
// const searchResultsChats = Object.entries(messagesArr).filter((chat) => {
//   if (
//     chat[1].userInfo.displayName
//       .toLowerCase()
//       .includes(userMessageSearch.toLowerCase())
//   ) {
//     return true;
//   }
//   return false;
// });
// const searchResultsUsers = usersArr.document.filter((user) => {
//   if (user.userName.toLowerCase().includes(userMessageSearch.toLowerCase())) {
//     return true;
//   }
//   return false;
// });

// const checkUsersLength = searchResultsUsers.length !== 0;
// const checkChatsLength = searchResultsChats.length !== 0;
