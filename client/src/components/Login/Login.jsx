import { React, useState, useEffect } from 'react';
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

const Login = () => {
  const [registration, setRegistration] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [registerUser, setRegisterUser] = useState({ email: '', password: '' });

  const register = async () => {};

  const login = async () => {};

  const logout = async () => {};

  const loginHandler = () => {};

  return (
    <View
      style={{
        flex: 9,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {registration ? (
        <View style={{ alignItems: 'center' }}>
          <View style={{ alignSelf: 'flex-end', margin: '10px' }}>
            <Button
              title="Back"
              onPress={() => {
                setRegistration(false);
              }}
              style={{ fontSize: '5px', textTransform: 'none' }}
            />
          </View>
          <Text
            style={{
              fontSize: '30px',
              alignSelf: 'center',
              margin: '10px',
            }}
          >
            Register
          </Text>
          <TextInput
            placeholder="Enter your email..."
            style={styles.loginInputs}
            onChangeText={(e) => {
              setRegisterUser(registerUser, (registerUser.email = e));
              console.log(setRegisterUser);
            }}
          />
          <TextInput
            placeholder="Enter password..."
            style={styles.loginInputs}
          />
          <View>
            <Button title="Register Account" />
          </View>
        </View>
      ) : (
        <View>
          <View>
            <Text style={styles.appTitle}>Vegetation Station</Text>
          </View>
          <TextInput placeholder="Email..." style={styles.loginInputs} />
          <TextInput
            placeholder="Password..."
            secureTextEntry="true"
            style={styles.loginInputs}
          />
          <View style={styles.loginButtonContainer}>
            <Button title="Login" color="grey" style={styles.loginButtons} />
            <Button
              title="Register"
              styles={styles.loginButtons}
              onPress={() => {
                setRegistration(true);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};
export default Login;
