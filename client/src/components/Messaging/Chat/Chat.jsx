import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Chat = ({ navigation }) => {
  const { isDarkMode } = useSelector((state) => state.app);

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
  });

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ marginBottom: 118, marginTop: 45 }}
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
          name="chevron-back-circle-open"
          size="40"
          color={isDarkMode ? 'black' : 'white'}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
