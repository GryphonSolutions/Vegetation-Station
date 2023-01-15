import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Chat = () => {
  return (
    <View style={styles.container}>
      <Text>Chat</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default Chat;
