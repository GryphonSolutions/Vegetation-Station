import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
// import GOOGLE_API_KEY from 'dotenv';
import MapView, {
  Marker,
  Callout,
  Circle,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import styles from './assets/StyleSheet';

const Location = ({ coordinates }) => {
  const { selectedUser } = useSelector((state) => state.data);
  const { username, location } = selectedUser;
  if (location.latitude !== undefined) {
    return (
      <MapView
        style={styles.LocationMap}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}
      >
        <Circle
          center={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          radius={1000}
          strokeWidth={2}
          strokeColor="rgba(207,0,15,1)"
          fillColor="rgba(207,0,15,0.2)"
        />
      </MapView>
    );
  }
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

export default Location;
