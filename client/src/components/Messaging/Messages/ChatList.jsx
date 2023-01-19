import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, Avatar } from 'react-native-elements';
import {
  updateCurrentCombinedId,
  updateChatHeaderInfo,
  updateSearchMessages,
  updateUserMessageSearch,
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

  const navigateTo = (combinedId, username, profilePicture) => {
    console.log(combinedId);
    dispatch(updateSearchMessages(false));
    dispatch(updateUserMessageSearch(''));
    dispatch(updateChatHeaderInfo({ username, profilePicture }));
    dispatch(updateCurrentCombinedId(combinedId));
    // pull chat data from collection chats based on the combinedId
    // update state for chats

    RootNavigation.navigate('Chat');
  };

  return (
    <ListItem
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
          <ListItem.Title style={styles.name}>
            {chat[1].chattingWith.username}
          </ListItem.Title>
          <ListItem.Title style={styles.time}>
            {chat[1].date.seconds}
          </ListItem.Title>
        </View>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chat[1].lastMessage}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ChatList;
