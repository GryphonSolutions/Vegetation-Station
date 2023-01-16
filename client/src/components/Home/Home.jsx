import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>This is the home page</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;
