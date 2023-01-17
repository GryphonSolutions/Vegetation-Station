import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Chat = ({ navigation }) => {
  const { isDarkMode } = useSelector((state) => state.app);
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
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      padding: 15,
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
  });

  const sendMessage = () => {};

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <View style={styles.header}>
          <Ionicons
            name="arrow-back-circle-outline"
            size="40"
            color={isDarkMode ? 'white' : 'black'}
          />
          <View style={{ alignItems: 'center' }}>
            <Avatar
              rounded
              size="medium"
              source={{
                uri: 'https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=',
              }}
            />
            <Text style={{ fontSize: 20 }}>Kyle</Text>
          </View>
          <Ionicons
            name="arrow-back-circle-open"
            size="40"
            color={isDarkMode ? 'black' : 'white'}
          />
        </View>
        <>
          <ScrollView>{/* {chat goes here} */}</ScrollView>
          <View style={styles.footer}>
            <TextInput
              value={input}
              onChangeText={(text) => setInput(text)}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
