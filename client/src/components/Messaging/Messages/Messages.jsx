import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

const Messages = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text>Lets build signal</Text>
      <StatusBar styles="auto" />
    </View>
  );
};

export default Messages;
