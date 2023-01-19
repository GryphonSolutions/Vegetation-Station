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
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { useIsFocused } from '@react-navigation/native';
import styles from './StyleSheet';
import plantData from './sampleData.js';

const Post = () => {
  // hooks for camera
  const [type, setType] = useState(CameraType.back); // set to back camera by default
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null); // to access photo library
  const isFocused = useIsFocused(); // this is to unmount camera when it is not in focus
  // hooks for form data
  const [title, setTitle] = useState('');
  const [trades, setTrades] = useState('');
  const [description, setDescription] = useState('');
  // hooks for DropDownPicker
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [dropValue, setDropValue] = useState([]);
  const [dropItems, setDropItems] = useState([]);

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

  // toggle front and back camera
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  //  read and photo from library
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.page}>
      {!showCamera && (
        <ScrollView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.title}>Post A Plant</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setShowCamera(true);
                setStatusBarHidden(true, 'slide');
              }}
            >
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Select Photo</Text>
            </TouchableOpacity>
            {image && (
              <Image source={{ uri: image }} style={styles.imageContainer} />
            )}

            <Text style={styles.inputLabel}>TITLE</Text>
            <TextInput
              maxLength={20}
              style={styles.input}
              onChangeText={setTitle}
              value={title}
              placeholder="Enter Title"
            />

            <Text style={styles.inputLabel}>PLANT SPECIES</Text>

            <TextInput
              style={styles.input}
              onChangeText={setTrades}
              value={trades}
              placeholder="Enter species"
            />

            <Text style={styles.inputLabel}>DESCRIPTIOIN</Text>
            <TextInput
              multiline
              style={styles.inputDescription}
              onChangeText={setDescription}
              value={description}
              placeholder="Enter description"
              maxLength={60}
            />
          </View>
        </ScrollView>
      )}
      {
        // show camera
        showCamera && isFocused && (
          <View style={styles.page}>
            <Camera style={styles.camera} type={type}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonCamera}
                  onPress={() => {
                    toggleCameraType();
                  }}
                >
                  <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonCamera}
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
        )
      }
    </KeyboardAvoidingView>
  );
};

export default Post;
