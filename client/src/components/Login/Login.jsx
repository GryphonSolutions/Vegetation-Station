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
  TouchableOpacity,
  Dimensions,
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
import { updateActiveUser, updateIsNavShown } from '../../reducers';
import { navigate } from '../NavBar/navigation.js';
import { logout } from './authLogout.js';
import logo from './assets/whiteVegiStegi.png';

const Login = () => {
  const [registration, setRegistration] = useState(false);

  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [currUser, setCurrUser] = useState({});
  const [aspectRatio, setAspectRatio] = useState(
    Image.resolveAssetSource(logo).height /
      Image.resolveAssetSource(logo).width,
  );
  const { isDarkMode } = useSelector((state) => state.app);

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
          getOneAndSetOne(res.user.email.split('@')[0]);
          setUserInfo({ email: '', password: '' });
          dispatch(updateIsNavShown());
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
    <View
      style={{ flex: 1, backgroundColor: isDarkMode ? '#141312' : '#f0f4f1' }}
    >
      <SafeAreaView />
      <View
        style={{ flex: 1, marginHorizontal: '8%', justifyContent: 'center' }}
      >
        <Image
          source={logo}
          style={[
            {
              width: '100%',
              height: Dimensions.get('window').width * 0.86 * aspectRatio,
            },
            styles.logoStyles,
          ]}
        />
        <KeyboardAwareScrollView>
          <View style={styles.loginInputsContainer}>
            <View>
              <Text
                style={[
                  styles.inputLabels,
                  { color: isDarkMode ? '#D3D3D3' : '#283618' },
                ]}
              >
                Email
              </Text>
            </View>
            <TextInput
              placeholder="Enter your email..."
              placeholderTextColor="#283618"
              style={styles.loginInputs}
              clearButtonMode="always"
              value={userInfo.email}
              onChangeText={(text) => {
                setUserInfo({ ...userInfo, email: text });
              }}
            />
            <View>
              <Text
                style={[
                  styles.inputLabels,
                  { color: isDarkMode ? '#D3D3D3' : '#283618' },
                ]}
              >
                Password
              </Text>
            </View>
            <TextInput
              placeholder="Enter password..."
              style={styles.loginInputs}
              placeholderTextColor="black"
              value={userInfo.password}
              secureTextEntry
              clearButtonMode="always"
              onChangeText={(text) => {
                setUserInfo({ ...userInfo, password: text });
              }}
            />
          </View>

          <View
            style={{
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity style={styles.button} onPress={login}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setRegistration(true);
              }}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
            style={styles.button}
            onPress={() => {
              logout();
              dispatch(updateActiveUser({}));
            }}
          > */}
            {/* <Text style={styles.buttonText}>Log Out</Text> */}
            {/* </TouchableOpacity> */}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};
export default Login;
