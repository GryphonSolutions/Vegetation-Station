import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, Avatar } from 'react-native-elements';
import {
  updateCurrentCombinedId,
  updateCurrentChat,
  updateChatHeaderInfo,
  updateSearchMessages,
  updateUserMessageSearch,
} from '../../../reducers/messagesReducer.js';
import { updateSelectedUser } from '../../../reducers/dataReducer.js';
import * as RootNavigation from '../../NavBar/navigation.js';
import testUsers from '../../../../../server/data/users.js';

const ChatList = ({ chat }) => {
  const { isDarkMode } = useSelector((state) => state.app);
  const { activeUser, selectedUser } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    border: {
      borderStyle: 'solid',
      borderWidth: '2',
      borderColor: 'red',
    },
    name: {
      fontFamilt: 'JosefinSans-Bold',
    },
    time: {
      fontFamily: 'JosefinSans-Light',
      color: 'gray',
      fontSize: '85%',
    },
    titleCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
      marginBottom: 5,
    },
    chatItemText: {
      fontFamily: 'JosefinSans',
    },
  });

  const getMessages = (combinedId) => {
    axios
      .get('http://localhost:8080/api/messages/data', {
        params: { combinedId },
      })
      .then((res) => {
        console.log('MESSAGES DATA ', res.data);
        dispatch(updateCurrentChat(res.data));
      })
      .catch((err) => {
        console.log(err, 'error fetching messages');
      });
  };

  const getUserInfo = (username) => {
    let userObj = {};
    testUsers.forEach((user) => {
      if (user.username === username) {
        userObj = user;
      }
    });
    return userObj;
  };

  const navigateTo = (combinedId, username, profilePicture) => {
    console.log(combinedId);
    dispatch(updateSearchMessages(false));
    dispatch(updateUserMessageSearch(''));
    dispatch(updateChatHeaderInfo({ username, profilePicture }));
    dispatch(updateSelectedUser(getUserInfo(username)));
    dispatch(updateCurrentCombinedId(combinedId));
    // pull chat data from collection chats based on the combinedId
    // update state for chats
    getMessages(combinedId);

    RootNavigation.navigate('Chat');
  };

  return (
    <ListItem
      containerStyle={{
        backgroundColor: isDarkMode ? '#141312' : '#f0f4f1',
      }}
      bottomDivider
      onPress={() => {
        navigateTo(
          chat[0],
          chat[1].chattingWith.username,
          chat[1].chattingWith.profilePicture,
        );
      }}
    >
      <Avatar
        rounded
        source={{
          uri: `${chat[1].chattingWith.profilePicture}`,
        }}
      />
      <ListItem.Content>
        <View style={styles.titleCont}>
          <ListItem.Title
            style={[
              styles.chatItemText,
              styles.name,
              { color: isDarkMode ? '#d39b52' : '#283618' },
            ]}
          >
            {chat[1].chattingWith.username}
          </ListItem.Title>
          <ListItem.Title style={[styles.chatItemText, styles.time]}>
            {chat[1].date.seconds}
          </ListItem.Title>
        </View>
        <ListItem.Subtitle
          style={styles.chatItemText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {chat[1].lastMessage}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ChatList;
