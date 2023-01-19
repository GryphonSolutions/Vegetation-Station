import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Separator,
  SafeAreaView,
  Header,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth } from '../../../../server/database/firebase.js';
import styles from './assets/StyleSheet.jsx';
import { navigate } from '../NavBar/navigation.js';

const radarPublishableKey =
  'prj_live_pk_6efba0e95e7296a089fdcf13dbbe7ba2f83b84a1';

const config = {
  headers: {
    Authorization: radarPublishableKey,
  },
};

const Registration = ({ setRegistration, getOneAndSetOne }) => {
  const [userReg, setUserReg] = useState({});
  const [radarQuery, setRadarQuery] = useState(0);

  const register = async (locationDeets) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        userReg.email,
        userReg.password,
      );
      axios
        .post(
          'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/users/info',
          {
            location: locationDeets,
            profilePicture: userReg.profilePicture,
            username: userReg.email.split('@')[0],
          },
        )
        .then((res) => {
          getOneAndSetOne(userReg.email.split('@')[0]);
          console.log(res);
        })
        .catch((err) => {
          console.error(err.message);
        });
    } catch (err) {
      console.error(err.message);
    }
  };
  const getLatLong = () => {
    axios
      .get(
        `https://api.radar.io/v1/search/autocomplete?query=${radarQuery}`,
        config,
      )
      .then((res) => {
        const locationDetails = {
          city: res.data.addresses[0].city,
          latitude: res.data.addresses[0].latitude,
          longitude: res.data.addresses[0].longitude,
          state: res.data.addresses[0].state,
          zip: Number(res.data.addresses[0].postalCode),
        };
        return locationDetails;
      })
      .then((res) => {
        register(res);
        setRegistration(false);
        navigate('Home');
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View>
          <Ionicons
            style={styles.backButton}
            name="arrow-undo"
            size="25px"
            onPress={() => {
              setRegistration(false);
            }}
          />
        </View>
        <View>
          <Text style={styles.regHeader}>Register Account</Text>
        </View>
        <View style={styles.loginInputsContainer}>
          <View>
            <Text style={styles.registerLabels}>Email</Text>
          </View>
          <TextInput
            placeholder="Enter your email..."
            placeholderTextColor="#283618"
            style={styles.loginInputs}
            clearButtonMode="always"
            onChangeText={(e) => {
              setUserReg(userReg, (userReg.email = e));
            }}
          />
          <View>
            <Text style={styles.registerLabels}>Password</Text>
          </View>
          <TextInput
            placeholder="Enter password..."
            style={styles.loginInputs}
            placeholderTextColor="#283618"
            secureTextEntry
            clearButtonMode="always"
            onChangeText={(e) => {
              setUserReg(userReg, (userReg.password = e));
            }}
          />
          <View>
            <Text style={styles.registerLabels}>Zipcode</Text>
          </View>
          <TextInput
            placeholder="Enter your zipcode..."
            style={styles.loginInputs}
            placeholderTextColor="#283618"
            clearButtonMode="always"
            onChangeText={(zip) => {
              setRadarQuery(zip);
            }}
          />
          <View>
            <Text style={styles.registerLabels}>Profile Picture</Text>
          </View>
          <TextInput
            placeholder="Profile picture Url..."
            style={styles.loginInputs}
            placeholderTextColor="#283618"
            clearButtonMode="always"
            onChangeText={(e) => {
              setUserReg(userReg, (userReg.profilePicture = e));
            }}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.regSubmitContainer}>
            <Button
              style={styles.regButton}
              color="black"
              title="Submit"
              onPress={() => {
                getLatLong();
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Registration;
