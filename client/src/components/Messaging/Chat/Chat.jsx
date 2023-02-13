import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
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
  updateIsNavShown,
} from '../../../reducers';
import * as RootNavigation from '../../NavBar/navigation.js';
import { db, chatsCol, chatMessagesCol } from '../../../../../server/database';

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
      color: isDarkMode ? 'lightgreen' : 'darkgreen',
    },
    contentContainer: {
      paddingTop: 10,
      marginHorizontal: '4%',
    },
    messageBubble: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
      marginBottom: 10,
      maxWidth: '80%',
      position: 'relative',
    },
    messageText: {
      fontFamily: 'JosefinSans-Medium',
      fontSize: 16,
      marginLeft: 0,
      marginRight: 0,
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: '2%',
    },
    textInput: {
      flex: 1,
      fontFamily: 'JosefinSans-Medium',
      fontSize: 16,
      marginHorizontal: '4%',
      backgroundColor: isDarkMode ? 'black' : '#bdcab6',
      padding: 10,
      color: isDarkMode ? 'white' : '#212b21',
      borderRadius: 30,
    },
  });

  useEffect(() => {
    if (currentCombinedId) {
      const unSub = onSnapshot(
        doc(db, 'chatMessages', currentCombinedId),
        { includeMetadataChanges: true },
        (document) => {
          dispatch(updateCurrentChat(document.data()));
        },
      );

      return () => {
        unSub();
      };
    }
  }, [currentCombinedId]);

  const getMessages = (combinedId) => {
    axios
      .get(
        'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/messages/data',
        {
          params: { combinedId },
        },
      )
      .then((res) => {
        dispatch(updateCurrentChat(res.data));
      })
      .catch((err) => {
        console.log(err, 'error fetching messages');
      });
  };

  const sendMessage = () => {
    Keyboard.dismiss();
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
        getMessages(currentCombinedId);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const backToMessages = () => {
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
                size={40}
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
                  color: isDarkMode ? 'white' : 'black',
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
              {currentChat !== undefined &&
                currentChat.messages !== undefined &&
                currentChat.messages.map((data) => {
                  return String(data.senderId) === String(activeUser.id) ? (
                    <View
                      key={data.id}
                      style={[
                        {
                          backgroundColor: isDarkMode
                            ? 'lightgreen'
                            : 'darkgreen',
                          alignSelf: 'flex-end',
                        },
                        styles.messageBubble,
                      ]}
                    >
                      <Text
                        style={[
                          { color: isDarkMode ? 'black' : 'white' },
                          styles.messageText,
                        ]}
                      >
                        {data.text}
                      </Text>
                    </View>
                  ) : (
                    <View
                      key={data.id}
                      style={[
                        { backgroundColor: '#f0e4be', alignSelf: 'flex-start' },
                        styles.messageBubble,
                      ]}
                    >
                      <Text
                        style={[
                          { color: isDarkMode ? 'black' : 'black' },
                          styles.messageText,
                        ]}
                      >
                        {data.text}
                      </Text>
                    </View>
                  );
                })}
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={[
            { backgroundColor: isDarkMode ? '#656464' : '#e4e9dc' },
            styles.inputContainer,
          ]}
        >
          <TextInput
            value={senderInput}
            onChangeText={(text) => {
              dispatch(updateSenderInput(text));
              scrollViewRef.current.scrollToEnd({ animated: true });
            }}
            placeholderTextColor={isDarkMode ? 'white' : '#283618'}
            onSubmitEditing={sendMessage}
            placeholder="message"
            style={styles.textInput}
          />
          <TouchableOpacity
            style={{ marginRight: '4%' }}
            onPress={sendMessage}
            activeOpacity={0.5}
          >
            <Ionicons
              name="arrow-up-circle-outline"
              size={35}
              color={isDarkMode ? 'lightgreen' : 'darkgreen'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;
