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
import styles from './assets/StyleSheet';

const ProfileRibbon = () => {
  return (
    <View style={styles.profileRibbon}>
      <View style={styles.profileInfoContainer}>
        {/* <ScrollView> */}
        <Image
          source="https://media.licdn.com/dms/image/C5603AQGHgFnr465Dog/profile-displayphoto-shrink_800_800/0/1587145003818?e=1679529600&v=beta&t=tnUMlYlb4LHhRjSs71DwDUKubfMw9-tVrbgYzPCGI1g"
          style={styles.profileImage}
        />
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
