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
  updateChats,
  updateCurrentChat,
  updateCurrentCombinedId,
  updateChatIntervalId,
} from '../../../reducers/messagesReducer.js';
import * as RootNavigation from '../../NavBar/navigation.js';

const Chat = () => {
  const { isDarkMode } = useSelector((state) => state.app);
  const { activeUser, selectedUser } = useSelector((state) => state.data);
  const { senderInput, currentCombinedId, currentChat, chatIntervalId } =
    useSelector((state) => state.messages);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginTop: '5%',
      paddingBottom: '5%',
    },
    backButtonContainer: {
      left: '4%',
      top: -3,
      position: 'absolute',
      alignItems: 'flex-end',
    },
    backButton: {
      color: '#283618',
    },
    contentContainer: {
      paddingTop: 10,
    },
    // point of no return

    border: {
      borderStyle: 'solid',
      borderWidth: '2',
      borderColor: 'red',
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      padding: 10,
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

  useEffect(() => {
    // console.log('USE EFFECT');
    // console.log(currentCombinedId);
    if (currentCombinedId !== '') {
      getMessages(currentCombinedId);
    }
  }, [activeUser]);

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

  const getChats = () => {
    axios
      .get(
        'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/chats/data',
        {
          params: { activeUser: String(activeUser.id) },
        },
      )
      .then((res) => {
        // console.log('ORDERED IN CHATS');
        dispatch(
          updateChats(
            Object.entries(res.data).sort(
              (a, b) => b[1].date.seconds - a[1].date.seconds,
            ),
          ),
        );
      })
      .catch((err) => {
        console.log(err, 'error when fetching chats');
      });
  };

  const backToMessages = () => {
    // console.log('Go back to messages');
    getChats();
    dispatch(updateSenderInput(''));
    dispatch(updateCurrentCombinedId(''));
    dispatch(updateCurrentChat({}));
    RootNavigation.navigate('Messages');
  };

  const scrollViewRef = useRef();

  return (
    <View
      style={{ flex: 1, backgroundColor: isDarkMode ? '#141312' : '#f0f4f1' }}
    >
      <View
        style={{
          backgroundColor: isDarkMode ? '#656464' : '#e4e9dc',
          marginBottom: '-5%',
          paddingBottom: '5%',
        }}
      >
        <SafeAreaView />
      </View>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={[
              { backgroundColor: isDarkMode ? '#656464' : '#e4e9dc' },
              styles.headerContainer,
            ]}
          >
            <TouchableOpacity
              style={styles.backButtonContainer}
              onPress={backToMessages}
              activeOpacity={0.5}
            >
              <Ionicons
                style={styles.backButton}
                name="arrow-back-circle-outline"
                size="40"
                color={isDarkMode ? 'white' : 'black'}
              />
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <Avatar
                containerStyle={{ marginBottom: 5, marginTop: -10 }}
                rounded
                size="medium"
                source={{
                  uri: `${selectedUser.profilePicture}`,
                }}
              />
              <Text
                style={{
                  fontFamily: 'JosefinSans-Medium',
                  fontSize: 15,
                }}
              >
                {selectedUser.username}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.contentContainer}
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
          </TouchableWithoutFeedback>
        </View>
        <View
          style={[
            { backgroundColor: isDarkMode ? '#656464' : '#e4e9dc' },
            styles.footer,
          ]}
        >
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;
