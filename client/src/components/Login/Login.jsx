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
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Registration from './Registration.jsx';
import styles from './assets/StyleSheet.jsx';

const Login = () => {
  const [registration, setRegistration] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [registerUser, setRegisterUser] = useState({ email: '', password: '' });

  const login = async () => {};

  const logout = async () => {};

  const loginHandler = () => {};

  return registration ? (
    <Registration setRegistration={setRegistration} />
  ) : (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text style={styles.regHeader}>Vegetation Station</Text>
        </View>
        <View style={styles.loginInputsContainer}>
          <View>
            <Text style={styles.registerLabels}>Email</Text>
          </View>
          <TextInput
            placeholder="Enter your email..."
            style={styles.loginInputs}
          />
          <View>
            <Text style={styles.registerLabels}>Password</Text>
          </View>
          <TextInput
            placeholder="Enter password..."
            style={styles.loginInputs}
          />
        </View>
        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
          <View style={styles.logSubmitContainer}>
            <Button style={styles.regButton} color="black" title="Login" />
            <Ionicons name="checkmark-done-circle-sharp" size="23px" />
          </View>
          <View style={styles.logSubmitContainer}>
            <Button
              style={styles.regButton}
              color="black"
              title="Register"
              onPress={() => {
                setRegistration(true);
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Login;
