import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, setStatusBarHidden } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
// import {
//   Camera,
//   CameraPermissionStatus,
//   useCameraDevices,
// } from 'react-native-vision-camera';
import { Camera, CameraType } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import styles from './StyleSheet';

const Post = () => {
  const [type, setType] = useState(CameraType.back); // set
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const isFocused = useIsFocused(); // this is to unmount camera when it is not in focus

  // page is still checking camera priveledges
  if (!permission) {
    return <View />;
  }

  // prompt user to give camera priveledges
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  return (
    <View style={styles.container}>
      {!showCamera && (
        <View style={styles.container}>
          <Text>Post A Plant</Text>
          <Button
            style={styles.button}
            onPress={() => {
              setShowCamera(true);
              setStatusBarHidden(true, 'slide');
            }}
            title="Show camera test button"
            accessibilityLabel="This is only a test button"
          />
        </View>
      )}
      {showCamera && isFocused && (
        <View style={styles.camera}>
          <Camera style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  toggleCameraType();
                }}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setShowCamera(false);
                  setStatusBarHidden(false, 'slide');
                }}
              >
                <Text style={styles.text}>Leave Camera</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )}
    </View>
  );
};

export default Post;
