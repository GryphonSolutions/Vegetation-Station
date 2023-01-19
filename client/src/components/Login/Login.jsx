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
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Registration from './Registration.jsx';
import styles from './assets/StyleSheet.jsx';
import { auth } from '../../../../server/database/firebase.js';
import { updateActiveUser } from '../../reducers';
import { navigate } from '../NavBar/navigation.js';
import { logout } from './authLogout.js';

const Login = () => {
  const [registration, setRegistration] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [currUser, setCurrUser] = useState({});

  const dispatch = useDispatch();

  onAuthStateChanged(auth, (currentUser) => {
    setCurrUser(currentUser);
  });

  const getOneAndSetOne = (userEmail) => {
    axios
      .get(`http://localhost:8080/api/users/info/${userEmail}`)
      .then((res) => {
        dispatch(updateActiveUser(res.data));
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password,
      )
        .then((res) => {
          console.log(res);
          getOneAndSetOne(res.user.email.split('@')[0]);
          navigate('Home');
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  return registration ? (
    <Registration
      setRegistration={setRegistration}
      getOneAndSetOne={getOneAndSetOne}
    />
  ) : (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
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
              clearButtonMode="always"
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
              clearButtonMode="always"
              onChangeText={(text) => {
                setUserInfo(userInfo, (userInfo.password = text));
              }}
            />
          </View>
          <View
            style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}
          >
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
                title="Logout"
                onPress={() => {
                  logout();
                  dispatch(updateActiveUser({}));
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Login;
