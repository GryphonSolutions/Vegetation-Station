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
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import axios from 'axios';
import { auth } from '../../../../server/database/firebase.js';
import styles from './assets/StyleSheet.jsx';

const radarPublishableKey =
  'prj_live_pk_6efba0e95e7296a089fdcf13dbbe7ba2f83b84a1';

const config = {
  headers: {
    Authorization: radarPublishableKey,
  },
};

const Registration = ({ setRegistration }) => {
  const getLatLong = () => {
    axios
      .get('https://api.radar.io/v1/search/autocomplete?query=91301', config)
      .then((res) => {
        console.log(res.data.addresses[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        'BlakeGriffin@gmail.com',
        '1234567',
      );
      axios
        .post('http://localhost:8080/api/users/info', {
          location: {
            city: 'Agoura Hills',
            latitude: 34.139713,
            longitude: -118.75845,
            state: 'California',
            zip: 91301,
          },
          profilePicture:
            'https://movietvtechgeeks.com/wp-content/uploads/2016/06/blake-griffin-reveals-nba-forced-him-to-jump-over-a-kia-optima-2016-images-e1465467645690.png',
          username: 'BlakeGriffin',
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
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
            style={styles.loginInputs}
          />
          <View>
            <Text style={styles.registerLabels}>Password</Text>
          </View>
          <TextInput
            placeholder="Enter password..."
            style={styles.loginInputs}
          />
          <View>
            <Text style={styles.registerLabels}>Zipcode</Text>
          </View>
          <TextInput
            placeholder="Enter your zipcode..."
            style={styles.loginInputs}
          />
          <View>
            <Text style={styles.registerLabels}>Profile Picture</Text>
          </View>
          <TextInput
            placeholder="Enter your profile picture Url..."
            style={styles.loginInputs}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.regSubmitContainer}>
            <Button
              style={styles.regButton}
              color="black"
              title="Submit"
              onPress={() => {
                register();
              }}
            />
            <Ionicons name="checkmark-done-circle-sharp" size="23px" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Registration;
