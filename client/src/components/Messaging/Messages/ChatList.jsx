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

const ChatList = ({ chat }) => {
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

  const navigateTo = (chatRoomID, username, profilePicture) => {
    console.log(chatRoomID);
    dispatch(updateChatHeaderInfo({ username, profilePicture }));
    dispatch(updateCurrentCombinedId(chatRoomID));
    // pull chat data from collection chats based on the combinedId
    // update state for chats

    RootNavigation.navigate('Chat');
  };

  return (
    <ListItem
      onPress={() => {
        navigateTo(
          chat.combinedId,
          chat.chattingWith.username,
          chat.chattingWith.profilePicture,
        );
      }}
    >
      <Avatar
        rounded
        source={{
          uri: `${chat.chattingWith.profilePicture}`,
        }}
      />
      <ListItem.Content>
        <View style={styles.titleCont}>
          <ListItem.Title style={styles.name}>
            {chat.chattingWith.username}
          </ListItem.Title>
          <ListItem.Title style={styles.time}>{chat.date}</ListItem.Title>
        </View>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chat.lastMessage}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ChatList;
