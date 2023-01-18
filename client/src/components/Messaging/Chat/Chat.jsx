import React, { useState, useRef } from 'react';
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
import { updateSenderInput } from '../../../reducers/messagesReducer.js';
import * as RootNavigation from '../../NavBar/navigation.js';

const Chat = () => {
  const { isDarkMode } = useSelector((state) => state.app);
  const { senderInput, currentChat } = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

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

  const sendMessage = () => {
    Keyboard.dismiss();
    console.log(senderInput);
    // update database
    dispatch(updateSenderInput(''));
  };

  const backToMessages = () => {
    console.log('Go back to messages');
    RootNavigation.navigate('Messages');
  };

  const messages = [
    {
      12: {
        messages: [
          { id: 1, text: 'hello', senderID: 2 },
          { id: 2, text: 'Can we trade plants?', senderID: 2 },
          { id: 3, text: "Possibly, what's your address?", senderID: 1 },
          { id: 4, text: "Whoa...let's meet at costco in LA", senderID: 2 },
          { id: 5, text: 'Nah', senderID: 1 },
          { id: 6, text: 'ight', senderID: 2 },
          { id: 7, text: 'Good luck with the next guy.', senderID: 1 },
          {
            id: 8,
            text: 'asjdf laskldjflk lkjasdflj jlsdafkljds lasdjflkjsda lkajsdfklj ajsdfklj lasjkdflkj aslkdfjlkj asdfjlkj aslkdfjlkfjsd lkjasdfl laksjdf jsdfkjk dkj dkk fjasldkjfaslkjdf l aksjd vhjkcj dfvl kjadf',
            senderID: 1,
          },
          {
            id: 9,
            text: 'asjdf laskldjflk lkjasdflj jlsdafkljds lasdjflkjsda lkajsdfklj ajsdfklj lasjkdflkj aslkdfjlkj asdfjlkj aslkdfjlkfjsd lkjasdfl laksjdf jsdfkjk dkj dkk fjasldkjfaslkjdf l aksjd vhjkcj dfvl kjadf',
            senderID: 2,
          },
          {
            id: 10,
            text: 'asjdf laskldjflk lkjasdflj jlsdafkljds lasdjflkjsda lkajsdfklj ajsdfklj lasjkdflkj aslkdfjlkj asdfjlkj aslkdfjlkfjsd lkjasdfl laksjdf jsdfkjk dkj dkk fjasldkjfaslkjdf l aksjd vhjkcj dfvl kjadf',
            senderID: 1,
          },
          {
            id: 11,
            text: 'asjdf laskldjflk lkjasdflj jlsdafkljds lasdjflkjsda lkajsdfklj ajsdfklj lasjkdflkj aslkdfjlkj asdfjlkj aslkdfjlkfjsd lkjasdfl laksjdf jsdfkjk dkj dkk fjasldkjfaslkjdf l aksjd vhjkcj dfvl kjadf',
            senderID: 2,
          },
        ],
      },
    },
  ];

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
                uri: 'https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=',
              }}
            />
            <Text style={{ fontSize: 20 }}>{currentChat}</Text>
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
              {messages[0]['12'].messages.map((data) => {
                return data.senderID === 1 ? (
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
