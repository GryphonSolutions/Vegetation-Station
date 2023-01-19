import React from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  Button,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as navigation from '../NavBar/navigation';
import styles from './assets/StyleSheet';

const ProfileRibbon = () => {
  const { selectedUser } = useSelector((state) => state.data);
  const { username, profilePicture, tradeCount } = selectedUser;
  return (
    <View style={styles.profileRibbon}>
      <View style={styles.profileInfoContainer}>
        <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        <View style={styles.usernameContainer}>
          <Text style={styles.profileUsername}>{username.toUpperCase()}</Text>
          <Text style={styles.tradeNumber}>
            <Ionicons name="star" size="20px" style={{ color: 'yellow' }} />
            {tradeCount} Trades
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileRibbon;
