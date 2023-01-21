import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, Avatar } from 'react-native-elements';
import {
  updateCurrentCombinedId,
  updateCurrentChat,
  updateSearchMessages,
  updateUserMessageSearch,
} from '../../../reducers/messagesReducer.js';
import { updateSelectedUser } from '../../../reducers/dataReducer.js';
import * as RootNavigation from '../../NavBar/navigation.js';

const NewChatList = ({ user }) => {
  const { isDarkMode } = useSelector((state) => state.app);
  const { activeUser, selectedUser } = useSelector((state) => state.data);
  const { chats } = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    border: {
      borderStyle: 'solid',
      borderWidth: '2',
      borderColor: 'red',
    },
    name: {
      fontFamily: 'JosefinSans-Bold',
      fontWeight: '800',
    },
    time: {
      fontWeight: '700',
      color: 'gray',
    },
    titleCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
      marginBottom: 5,
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

  const chatExists = (id) => {
    let exists = false;
    chats.forEach((chat) => {
      console.log(chat[0]);
      console.log(id);
      console.log(chat[0] === id);
      if (chat[0] === id) {
        exists = true;
      }
    });
    return exists;
  };

  const navigateTo = async (Id, username, profilePicture) => {
    const activeUserId = String(activeUser.id);
    const userId = String(Id);
    const combinedId =
      activeUserId > userId ? activeUserId + userId : userId + activeUserId;

    // console.log(combinedId);
    dispatch(updateSelectedUser(user));
    dispatch(updateCurrentCombinedId(combinedId));

    if (!chatExists(combinedId)) {
      axios
        .post(
          'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/chats/data',
          {
            params: {
              id: String(activeUser.id),
              combinedId,
              userId: user.id,
              profilePicture: user.profilePicture,
              username: user.username,
            },
          },
        )
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post(
          'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/chats/data',
          {
            params: {
              id: user.id,
              combinedId,
              userId: String(activeUser.id),
              profilePicture: activeUser.profilePicture,
              username: activeUser.username,
            },
          },
        )
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post(
          'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/messages/data',
          {
            params: {
              combinedId,
            },
          },
        )
        .then((res) => {
          // console.log(res);
          RootNavigation.navigate('Chat');
        })
        .catch((err) => console.log('error creating chatMessages ', err));
    } else {
      RootNavigation.navigate('Chat');
    }

    // getMessages(combinedId);
    dispatch(updateSearchMessages(false));
    dispatch(updateUserMessageSearch(''));
  };

  return (
    <ListItem
      containerStyle={{
        backgroundColor: isDarkMode ? '#656464' : '#e4e9dc',
        marginVertical: 2,
        borderRadius: '8%',
      }}
      // bottomDivider
      onPress={() => {
        navigateTo(user.id, user.username, user.profilePicture);
        dispatch(updateSelectedUser(user));
      }}
    >
      <Avatar
        rounded
        source={{
          uri: `${user.profilePicture}`,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.name}>{user.username}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

export default NewChatList;
