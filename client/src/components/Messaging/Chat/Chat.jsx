import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  updateSenderInput,
  updateCurrentChat,
} from '../../../reducers/messagesReducer.js';
import * as RootNavigation from '../../NavBar/navigation.js';

const Chat = () => {
  const { isDarkMode } = useSelector((state) => state.app);
  const {
    senderInput,
    currentCombinedId,
    chatHeaderInfo,
    currentChat,
    activeUser,
  } = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    border: {
      borderStyle: 'solid',
      borderWidth: '2',
      borderColor: 'red',
    },
    header: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomColor: 'gray',
      borderBottomStyles: 'solid',
      borderBottomWidth: 1,
      paddingBottom: 3,
      paddingRight: 10,
      paddingLeft: 10,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      padding: 10,
    },
    container: {
      height: '100%',
    },
    textInput: {
      bottom: 0,
      height: 40,
      width: '85%',
      marginRight: 15,
      borderColor: 'transparent',
      backgroundColor: '#ECECEC',
      borderWidth: 1,
      padding: 10,
      color: 'grey',
      borderRadius: 30,
    },
    receiver: {
      padding: 10,
      backgroundColor: '#ECECEC',
      alignSelf: 'flex-start',
      borderRadius: 20,
      marginLeft: 10,
      marginBottom: 10,
      maxWidth: '80%',
      position: 'relative',
    },
    recieverText: {
      color: 'black',
      fontWeight: '500',
      marginLeft: 0,
      marginRight: 0,
    },
    sender: {
      padding: 10,
      backgroundColor: '#2B68E6',
      alignSelf: 'flex-end',
      borderRadius: 20,
      marginRight: 10,
      marginBottom: 10,
      maxWidth: '80%',
      position: 'relative',
    },
    senderText: {
      color: 'white',
      fontWeight: '500',
      marginRight: 0,
      marginLeft: 0,
    },
  });

  useEffect(() => {
    console.log(currentCombinedId);
    axios
      .get('http://localhost:8080/api/messages/data', {
        params: { combinedId: currentCombinedId },
      })
      .then((res) => {
        console.log(res.data);
        updateCurrentChat(res.data);
      })
      .catch((err) => {
        console.log(err, 'error fetching messages');
      });
  }, [senderInput]);

  const sendMessage = () => {
    Keyboard.dismiss();
    console.log(senderInput);
    // update messages
    axios
      .patch('http://localhost:8080/api/messages/data', {
        params: {
          senderId: activeUser,
          text: senderInput,
          combinedId: currentCombinedId,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // update chats for active user (time, lastMessage, read = true)
    axios
      .patch('http://localhost:8080/api/chats/data', {
        params: {
          id: activeUser,
          currentCombinedId,
          read: true,
          text: senderInput,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // update chats for recipient (time, lastMessage, read = false)
    // id is currently hard coded
    axios
      .patch('http://localhost:8080/api/chats/data', {
        params: {
          id: '11347755',
          currentCombinedId,
          read: false,
          text: senderInput,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(updateSenderInput(''));
  };

  const backToMessages = () => {
    console.log('Go back to messages');
    RootNavigation.navigate('Messages');
  };

  const scrollViewRef = useRef();

  console.log('current chat ', currentChat);
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        // keyboardVerticalOffset={90}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={backToMessages} activeOpacity={0.5}>
            <Ionicons
              name="arrow-back-circle-outline"
              size="40"
              color={isDarkMode ? 'white' : 'black'}
            />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Avatar
              rounded
              size="medium"
              source={{
                uri: `${chatHeaderInfo.profilePicture}`,
              }}
            />
            <Text style={{ fontSize: 20 }}>{chatHeaderInfo.username}</Text>
          </View>
          <Ionicons
            name="arrow-back-circle-outline"
            size="40"
            color={isDarkMode ? 'black' : 'white'}
          />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView
              contentContainerStyle={{ paddingTop: 10 }}
              ref={scrollViewRef}
              onContentSizeChange={() => {
                scrollViewRef.current.scrollToEnd({ animated: true });
              }}
            >
              {currentChat.messages !== undefined &&
                currentChat.messages.map((data) => {
                  return data.senderID === activeUser ? (
                    <View key={data.id} style={styles.sender}>
                      <Text style={styles.senderText}>{data.text}</Text>
                    </View>
                  ) : (
                    <View key={data.id} style={styles.receiver}>
                      <Text style={styles.recieverText}>{data.text}</Text>
                    </View>
                  );
                })}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={senderInput}
                onChangeText={(text) => dispatch(updateSenderInput(text))}
                onSubmitEditing={sendMessage}
                placeholder="message"
                style={styles.textInput}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons
                  name="arrow-up-circle-outline"
                  size="34"
                  color={isDarkMode ? 'white' : 'black'}
                />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

// const messages = [
//   {
//     12: {
//       messages: [
//         { id: 1, text: 'hello', senderID: 2 },
//         { id: 2, text: 'Can we trade plants?', senderID: 2 },
//         { id: 3, text: "Possibly, what's your address?", senderID: 1 },
//         { id: 4, text: "Whoa...let's meet at costco in LA", senderID: 2 },
//         { id: 5, text: 'Nah', senderID: 1 },
//         { id: 6, text: 'ight', senderID: 2 },
//         { id: 7, text: 'Good luck with the next guy.', senderID: 1 },
//       ],
//     },
//   },
// ];

// const messages = [
//   {
//     combinedId: 8962128089621281,
//     messages: [
//       {
//         id: String(new Date().getTime()),
//         text: 'mo are you seriously doing this right now?',
//         senderID: 89621281,
//         date: JSON.stringify(new Date()),
//       },
//       {
//         id: String(new Date().getTime()),
//         text: 'Are you trying to scam me?',
//         senderID: 89621280,
//         date: JSON.stringify(new Date()),
//       },
//     ],
//   },
//   {
//     combinedId: 8962128089621282,
//     messages: [
//       {
//         id: String(new Date().getTime()),
//         text: 'Hold on I gotta do something',
//         senderID: 89621280,
//         date: JSON.stringify(new Date()),
//       },
//       {
//         id: String(new Date().getTime()),
//         text: 'Where did you go?',
//         senderID: 89621282,
//         date: JSON.stringify(new Date()),
//       },
//     ],
//   },
//   {
//     combinedId: 8962128589621280,
//     messages: [
//       {
//         id: String(new Date().getTime()),
//         text: 'So, what do you think?',
//         senderID: 89621285,
//         date: JSON.stringify(new Date()),
//       },
//       {
//         id: String(new Date().getTime()),
//         text: "Your plant isn't even nice",
//         senderID: 89621280,
//         date: JSON.stringify(new Date()),
//       },
//     ],
//   },
//   {
//     combinedId: 8962128189621286,
//     messages: [
//       {
//         id: String(new Date().getTime()),
//         text: 'Thoughts bro?',
//         senderID: 89621281,
//         date: JSON.stringify(new Date()),
//       },
//       {
//         id: String(new Date().getTime()),
//         text: 'Can I kill God with this plant?',
//         senderID: 89621286,
//         date: JSON.stringify(new Date()),
//       },
//     ],
//   },
// ];
