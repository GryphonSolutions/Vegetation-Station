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
  Image,
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
import logo from './assets/whiteVegiStegi.png';

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
      .get(
        `http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/users/info/${userEmail}`,
      )
      .then((res) => {
        dispatch(updateActiveUser(res.data[0]));
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
          <Image source={logo} style={styles.logoStyles} />
          <View style={styles.loginInputsContainer}>
            <View>
              <Text style={styles.registerLabels}>Email</Text>
            </View>
            <TextInput
              placeholder="Enter your email..."
              placeholderTextColor="#283618"
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
              placeholderTextColor="black"
              secureTextEntry
              clearButtonMode="always"
              onChangeText={(text) => {
                setUserInfo(userInfo, (userInfo.password = text));
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              fontFamily: 'AnonymousPro',
            }}
          >
            <View style={styles.logSubmitContainer}>
              <Button
                style={styles.regButton}
                color="#283618"
                title="Login"
                textStyle={{ fontFamily: 'JosefinSans' }}
                onPress={() => {
                  login();
                }}
              />
            </View>
            <View style={styles.logSubmitContainer}>
              <Button
                style={{ fontFamily: 'AnonymousPro' }}
                color="#283618"
                title="Register"
                onPress={() => {
                  setRegistration(true);
                }}
              />
            </View>
            <View style={styles.logSubmitContainer}>
              <Button
                style={styles.regButton}
                color="#283618"
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
