import React from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  Button,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import testProfilePic from './assets/testProfilePic.png';
import styles from './assets/StyleSheet';

const ProfileRibbon = () => {
  return (
    <View style={styles.profileRibbon}>
      <View style={styles.profileInfoContainer}>
        {/* <ScrollView> */}
        <Image source={testProfilePic} style={styles.profileImage} />
        {/* </ScrollView> */}
        <View style={styles.usernameContainer}>
          <Text style={styles.profileUsername}>{'Korriga'.toUpperCase()}</Text>
          <Text style={styles.tradeNumber}>
            <Ionicons
              name="star"
              size="20px"
              style={{ color: 'yellow', marginRight: 5 }}
            />
            12 Trades
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileRibbon;
