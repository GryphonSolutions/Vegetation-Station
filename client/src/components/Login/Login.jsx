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
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import Registration from './Registration.jsx';
import styles from './assets/StyleSheet.jsx';
import { auth } from '../../../../server/database/firebase.js';

const Login = () => {
  const [registration, setRegistration] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [currUser, setCurrUser] = useState({ email: '' });

  onAuthStateChanged(auth, (currentUser) => {
    setCurrUser(currentUser);
  });

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password,
      );
      console.log(user);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const loginHandler = () => {};

  return registration ? (
    <Registration setRegistration={setRegistration} />
  ) : (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ border: '2px solid black' }}>
          <Text style={styles.regHeader}>Vegetation Station</Text>
          <Text>User is :{currUser ? currUser.email.split('@')[0] : ''}</Text>
        </View>
        <View style={styles.loginInputsContainer}>
          <View>
            <Text style={styles.registerLabels}>Email</Text>
          </View>
          <TextInput
            placeholder="Enter your email..."
            style={styles.loginInputs}
            onChangeText={(text) => {
              setUserInfo(userInfo, (userInfo.email = text));
            }}
          />
          <View>
            <Text style={styles.registerLabels}>Password</Text>
          </View>
          <TextInput
            placeholder="Enter password..."
            style={styles.loginInputs}
            secureTextEntry
            onChangeText={(text) => {
              setUserInfo(userInfo, (userInfo.password = text));
            }}
          />
        </View>
        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
          <View style={styles.logSubmitContainer}>
            <Button
              style={styles.regButton}
              color="black"
              title="Login"
              onPress={() => {
                login();
              }}
            />
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
          <View style={styles.logSubmitContainer}>
            <Button
              style={styles.regButton}
              color="black"
              title="signOut"
              onPress={() => {
                logout();
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Login;
