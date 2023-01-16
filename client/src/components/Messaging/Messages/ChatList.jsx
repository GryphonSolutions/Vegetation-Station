import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

const ChatList = ({ chat }) => {
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

  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri: 'https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=',
        }}
      />
      <ListItem.Content>
        <View style={styles.titleCont}>
          <ListItem.Title style={styles.name}>
            {chat[1].userInfo.displayName}
          </ListItem.Title>
          <ListItem.Title style={styles.time}>{chat[1].date}</ListItem.Title>
        </View>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chat[1].lastMessage}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ChatList;
