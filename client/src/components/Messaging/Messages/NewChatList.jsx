import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, Avatar } from 'react-native-elements';
import {
  updateCurrentCombinedId,
  updateChatHeaderInfo,
} from '../../../reducers/messagesReducer.js';
import * as RootNavigation from '../../NavBar/navigation.js';

const NewChatList = ({ user }) => {
  // const { activeUser } = useSelector((state) => state.data);
  const { chats, activeUser } = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    border: {
      borderStyle: 'solid',
      borderWidth: '2',
      borderColor: 'red',
    },
    name: {
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

  const navigateTo = async (Id, username, profilePicture) => {
    const activeUserId = activeUser.toString();
    const userId = Id.toString();
    const combinedId =
      activeUserId > userId ? activeUserId + userId : userId + activeUserId;

    console.log(combinedId);

    dispatch(updateCurrentCombinedId(combinedId));
    dispatch(updateChatHeaderInfo({ username, profilePicture }));
    // search userChats to see if this combined exists in the currentUser's chats
    //  if chat doesn't exist, create chat for both the sender and reciever
    //  if chat does exist, grab the messages from the chat collection
    if (!chats.combinedId) {
      axios
        .post('http://localhost:8080/api/chats/data', {
          params: {
            id: activeUser,
            combinedId,
            userId: user.id,
            profilePicture: user.profilePicture,
            username: user.username,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post('http://localhost:8080/api/chats/data', {
          params: {
            id: user.id,
            combinedId,
            userId: activeUser,
            profilePicture: user.profilePicture,
            username: 'AuthDone',
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post('http://localhost:8080/api/messages/data', {
          params: {
            combinedId,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log('error creating chatMessages ', err));
    }

    RootNavigation.navigate('Chat');
  };

  return (
    <ListItem
      onPress={() => {
        navigateTo(user.id, user.username, user.profilePicture);
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
