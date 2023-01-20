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
  updateSenderInput,
  updateChats,
  updateCurrentChat,
  updateCurrentCombinedId,
  updateChatIntervalId,
} from '../../../reducers/messagesReducer.js';
import * as RootNavigation from '../../NavBar/navigation.js';
import { db, chatsCol, chatMessagesCol } from '../../../../../server/database';

const Chat = () => {
  const { isDarkMode } = useSelector((state) => state.app);
  const { activeUser, selectedUser } = useSelector((state) => state.data);
  const { senderInput, currentCombinedId, currentChat, chatIntervalId } =
    useSelector((state) => state.messages);
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
    if (currentCombinedId) {
      const unSub = onSnapshot(
        doc(db, 'chatMessages', currentCombinedId),
        { includeMetadataChanges: true },
        (document) => {
          console.log(document.data());
          dispatch(updateCurrentChat(document.data()));
        },
      );

      return () => {
        unSub();
      };
    }
  }, []);

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
        // dispatch(updateCurrentChat(res.data));
      })
      .catch((err) => {
        console.log(err, 'error fetching messages');
      });
  };

  // useEffect(() => {
  //   // console.log('USE EFFECT');
  //   // console.log(currentCombinedId);
  //   if (currentCombinedId !== '') {
  //     setInterval(() => {
  //       getMessages(currentCombinedId);
  //     }, 5000);
  //   }
  // }, []);

  const sendMessage = () => {
    Keyboard.dismiss();
    // console.log(senderInput);
    // update messages
    axios
      .patch(
        'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/messages/data',
        {
          params: {
            senderId: String(activeUser.id),
            text: senderInput,
            combinedId: currentCombinedId,
          },
        },
      )
      .then((res) => {
        // console.log(res);
        getMessages(currentCombinedId);
      })
      .catch((err) => {
        console.log(err);
      });
    // update chats for active user (time, lastMessage, read = true)
    axios
      .patch(
        'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/chats/data',
        {
          params: {
            id: String(activeUser.id),
            currentCombinedId,
            read: true,
            text: senderInput,
            time: true,
          },
        },
      )
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // update chats for recipient (time, lastMessage, read = false)
    // id is currently hard coded
    axios
      .patch(
        'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/chats/data',
        {
          params: {
            id: String(selectedUser.id),
            currentCombinedId,
            read: false,
            text: senderInput,
            time: true,
          },
        },
      )
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(updateSenderInput(''));
  };

  // const getChats = () => {
  //   axios
  //     .get(
  //       'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/chats/data',
  //       {
  //         params: { activeUser: String(activeUser.id) },
  //       },
  //     )
  //     .then((res) => {
  //       // console.log('ORDERED IN CHATS');
  //       dispatch(
  //         updateChats(
  //           Object.entries(res.data).sort(
  //             (a, b) => b[1].date.seconds - a[1].date.seconds,
  //           ),
  //         ),
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err, 'error when fetching chats');
  //     });
  // };

  const backToMessages = () => {
    // console.log('Go back to messages');
    // getChats();
    dispatch(updateSenderInput(''));
    dispatch(updateCurrentCombinedId(''));
    dispatch(updateCurrentChat({}));
    RootNavigation.navigate('Messages');
  };

  const scrollViewRef = useRef();

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
                uri: `${selectedUser.profilePicture}`,
              }}
            />
            <Text style={{ fontSize: 20 }}>{selectedUser.username}</Text>
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
                  return String(data.senderId) === String(activeUser.id) ? (
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
