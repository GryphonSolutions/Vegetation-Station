import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, Avatar } from 'react-native-elements';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {
  updateCurrentCombinedId,
  updateCurrentChat,
  updateSearchMessages,
  updateUserMessageSearch,
} from '../../../reducers/messagesReducer.js';
import { updateSelectedUser } from '../../../reducers/dataReducer.js';
import * as RootNavigation from '../../NavBar/navigation.js';

const ChatList = ({ chat }) => {
  const { isDarkMode } = useSelector((state) => state.app);
  const { activeUser, selectedUser, users } = useSelector(
    (state) => state.data,
  );
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    border: {
      borderStyle: 'solid',
      borderWidth: '2',
      borderColor: 'red',
    },
    name: {
      fontFamily: 'JosefinSans-Bold',
      fontSize: 19,
    },
    time: {
      fontFamily: 'JosefinSans',
      color: isDarkMode ? 'white' : 'gray',
      fontSize: 16,
    },
    titleCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
      marginBottom: 5,
    },
    chatItemText: {
      fontFamily: 'JosefinSans',
      fontSize: 17,
      color: isDarkMode ? 'white' : '#616161',
    },
    read: {},
    unread: {
      borderColor: isDarkMode ? 'white' : '#09df08',
      borderStyle: 'solid',
      borderWidth: 3,
    },
  });

  const getMessages = (combinedId) => {
    axios
      .get(
        'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/messages/data',
        {
          params: { combinedId },
        },
      )
      .then((res) => {
        // console.log('MESSAGES DATA ', res.data);
        dispatch(updateCurrentChat(res.data));
      })
      .catch((err) => {
        console.log(err, 'error fetching messages');
      });
  };

  const getUserInfo = (username) => {
    let userObj = {};
    users.forEach((user) => {
      if (user.username === username) {
        userObj = user;
      }
    });
    return userObj;
  };

  const navigateTo = (combinedId, username) => {
    dispatch(updateSearchMessages(false));
    dispatch(updateUserMessageSearch(''));
    dispatch(updateSelectedUser(getUserInfo(username)));
    dispatch(updateCurrentCombinedId(combinedId));
    getMessages(combinedId);
    if (chat[1].read === false) {
      axios
        .patch(
          'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/chats/data',
          {
            params: {
              id: String(activeUser.id),
              currentCombinedId: combinedId,
              read: true,
              text: chat[1].lastMessage,
              time: false,
            },
          },
        )
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    RootNavigation.navigate('Chat');
  };

  const timeToNow = formatDistanceToNow(new Date(chat[1].date));
  const displayNow = timeToNow === 'less than a minute';

  return (
    <ListItem
      containerStyle={{
        backgroundColor: isDarkMode ? '#141312' : '#f0f4f1',
        borderRightColor: chat[1].read ? '#09df08' : '#09df08',
        borderRightStyle: chat[1].read ? 'solid' : 'solid',
        borderRightWidth: chat[1].read ? 0 : 3,
        paddingVertical: 12,
        paddingHorizontal: 10,
      }}
      bottomDivider
      onPress={() => {
        navigateTo(chat[0], chat[1].chattingWith.username);
      }}
    >
      <Avatar
        size={60}
        rounded
        source={{
          uri: `${chat[1].chattingWith.profilePicture}`,
        }}
      />
      <ListItem.Content
        style={{
          height: 60,
          flex: 1,
          justifyContent: 'flex-start',
        }}
      >
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
          <ListItem.Title style={styles.time}>
            {displayNow ? 'now' : timeToNow}
          </ListItem.Title>
        </View>
        <ListItem.Subtitle
          style={styles.chatItemText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {chat[1].lastMessage}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ChatList;
