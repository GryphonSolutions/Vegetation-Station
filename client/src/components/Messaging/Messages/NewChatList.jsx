import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, Avatar } from 'react-native-elements';
import {
  updateCurrentCombinedId,
  updateCurrentChat,
} from '../../../reducers/messagesReducer.js';
import * as RootNavigation from '../../NavBar/navigation.js';

const NewChatList = ({ chat }) => {
  const { activeUser } = useSelector((state) => state.data);
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

  const navigateTo = async (Id) => {
    console.log(activeUser.id);
    console.log(Id);
    const activeUserId = activeUser.id.toString();
    const userId = Id.toString();
    const combinedId =
      activeUserId > userId ? activeUserId + userId : userId + activeUserId;
    console.log(combinedId);

    dispatch(updateCurrentCombinedId(combinedId));
    // search userChats to see if this combined exists in the currentUser's chats
    axios
      .get('http://localhost:8080/api/chats/data', {
        params: { combinedId },
      })
      .then((res) => {
        console.log('response from chats: ', res);
        updateCurrentChat(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //  if chat doesn't exist, create chat for both the sender and reciever
    //  if chat does exist, grab the messages from the chat collection

    RootNavigation.navigate('Chat');
  };

  return (
    <ListItem
      onPress={() => {
        navigateTo(chat.id);
      }}
    >
      <Avatar
        rounded
        source={{
          uri: 'https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.name}>{chat.userName}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

export default NewChatList;
