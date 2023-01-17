import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Separator,
} from 'react-native';
import styles from './assets/StyleSheet.jsx';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Login = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Text style={styles.appTitle}>Vegetation Station</Text>
      </View>
      <TextInput placeholder="email" style={styles.loginInputs} />
      <TextInput
        placeholder="password"
        secureTextEntry="true"
        style={styles.loginInputs}
      />
      <View style={styles.loginButtonContainer}>
        <Button title="Login" color="grey" style={styles.loginButtons} />
        <Button title="Register" styles={styles.loginButtons} />
      </View>
    </View>
  );
};
export default Login;
