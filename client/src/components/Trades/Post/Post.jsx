import React, { useState, useEffect, useRef } from 'react';
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
import { Camera, CameraType, takePictureAsync } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { useIsFocused } from '@react-navigation/native';
import styles from './StyleSheet';
import plantData from '../../../../../server/data/plants.js';
import catalog from '../../../../../server/data/catalog.js';

const Post = () => {
  // is this a trade
  const [isTrade, setIsTrade] = useState(false);
  // hooks for camera
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(CameraType.back); // set to back camera by default
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null); // to access image from photo library
  const isFocused = useIsFocused(); // to unmount camera when it is not in focus
  const photoRef = useRef(null); // to create reference to take a photo
  // hooks for form data
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // hooks for DropDownPicker
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState([]);
  const [dropdownItems, setDropdownItems] = useState([]);

  const { currentPlant } = useSelector((state) => state.data);
  useEffect(() => {
    const plantNames = plantData.map((plant) => {
      return {
        label: plant['Latin name'],
        value: plant,
      };
    });
    setDropdownItems(plantNames);
    console.log(currentPlant.images[0]);
  }, []);

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

  // take picture
  const takePhoto = async () => {
    const data = await camera.takePictureAsync(null);
    setImage(data.uri);
  };
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
            {!catalog[0].isTraded ? (
              <View>
                <Text style={styles.title}>Propose A Trade</Text>
                <Image
                  source={{ uri: currentPlant.images[0] }}
                  style={styles.imageContainer}
                />
                <Text style={styles.plantTitle}>
                  Request: {currentPlant.preferredTrade}
                </Text>
                <Text style={styles.plantDesription}>Offer:</Text>
              </View>
            ) : (
              <Text style={styles.title}>Post A Plant</Text>
            )}
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
            <DropDownPicker
              open={isDropdownOpen}
              value={dropdownValue}
              items={dropdownItems}
              setOpen={setIsDropdownOpen}
              setValue={setDropdownValue}
              setItems={setDropdownItems}
              searchable
              searchPlaceholder="Search for species..."
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

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // clear out all form data
                Alert.alert('Plant has been posted');
                setTitle('');
                setDescription('');
                setDropdownValue('');
                setImage(null);
              }}
            >
              <Text style={styles.buttonText}>Submit Plant</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      {
        // show camera
        showCamera && isFocused && (
          <View style={styles.page}>
            <Camera
              style={styles.camera}
              type={type}
              ref={(ref) => setCamera(ref)}
            >
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
                    takePhoto();
                  }}
                >
                  <Text style={styles.text}>Take picture</Text>
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
