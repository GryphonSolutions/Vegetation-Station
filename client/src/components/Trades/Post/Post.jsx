import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
// import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import {
  updateSelectedUser,
  updateSearchMessages,
  updateUserMessageSearch,
} from '../../../reducers';
import styles from './StyleSheet';
import plantData from '../../../../../server/data/plants.js';
import catalog from '../../../../../server/data/catalog.js';
import {
  updateCurrentPosts,
  updateCatalog,
} from '../../../reducers/dataReducer.js';

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
  const [plantDescription, setPlantDescription] = useState('');
  const [plantColor, setPlantColor] = useState('');
  // hooks for DropDownPicker
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [dropdownImg, setDropdownImg] = useState([]);

  const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
  const dispatch = useDispatch();

  // for selecting size
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [sizeDropdownValue, setSizeDropdownValue] = useState(null);
  const [sizeDropdownItems, setSizeDropdownItems] = useState([
    { label: 'small', value: 'small' },
    { label: 'medium', value: 'medium' },
    { label: 'large', value: 'large' },
  ]);

  // for selecting a preferred plant
  const [isPreferredOpen, setIsPreferredOpen] = useState(false);
  const [preferredValue, setPreferredValue] = useState(null);

  const { activeUser, currentPlant, currentPosts } = useSelector(
    (state) => state.data,
  );
  useEffect(() => {
    const plantNames = plantData.map((plant, index) => {
      return {
        label: plant['Latin name'],
        value: index,
      };
    });
    const plantInfo = plantData.map((plant) => {
      return {
        imgLink: plant.img,
        commonName: plant.commonName,
      };
    });
    setDropdownItems(plantNames.slice(0, 100));
    setDropdownImg(plantInfo.slice(0, 100));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = () => {
        dispatch(updateSearchMessages(false));
        dispatch(updateUserMessageSearch(''));
      };

      return unsubscribe();
    }, []),
  );

  // make sure only one drop box is open at a time
  const onPlantsOpen = useCallback(() => {
    setIsSizeDropdownOpen(false);
    setIsPreferredOpen(false);
  });

  const onSizeOpen = useCallback(() => {
    setIsDropdownOpen(false);
    setIsPreferredOpen(false);
  });

  const onPreferredOpen = useCallback(() => {
    setIsDropdownOpen(false);
    setIsSizeDropdownOpen(false);
  });
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

  //  send form data
  const updatePosts = () => {
    const formInfo = {
      commonName: dropdownImg[dropdownValue].commonName,
      images: [dropdownImg[dropdownValue].imgLink],
      size: sizeDropdownValue,
      color: plantColor,
      poster: activeUser.username,
      description: plantDescription,
      preferedTrade: dropdownImg[preferredValue].commonName,
      isPosted: true,
      isTraded: false,
      postTitle: title,
    };
    axios
      .post(
        'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/catalog/listings',
        formInfo,
      )
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(updateCatalog(formInfo));
  };

  return (
    <KeyboardAvoidingView style={styles.page}>
      {!showCamera && (
        <ScrollView style={styles.container}>
          <View style={styles.container}>
            {catalog[0].isTraded ? (
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
              placeholder="Enter Title..."
            />

            <Text style={styles.inputLabel}>PLANT SPECIES</Text>
            <DropDownPicker
              style={{
                width: '66%',
                marginVertical: 10,
                marginHorizontal: '17%',
                backgroundColor: '#d5dec6',
              }}
              open={isDropdownOpen}
              value={dropdownValue}
              items={dropdownItems}
              onOpen={onPlantsOpen}
              setOpen={setIsDropdownOpen}
              setValue={setDropdownValue}
              setItems={setDropdownItems}
              dropDownContainerStyle={{
                width: '66%',
                marginHorizontal: '17%',
                backgroundColor: '#d5dec6',
              }}
              searchable
              searchPlaceholder="Search for species..."
            />

            <Text style={styles.inputLabel}>PREFERED TRADE:</Text>
            <DropDownPicker
              style={{
                width: '66%',
                marginVertical: 10,
                marginHorizontal: '17%',
                backgroundColor: '#d5dec6',
              }}
              open={isPreferredOpen}
              value={preferredValue}
              items={dropdownItems}
              onOpen={onPreferredOpen}
              setOpen={setIsPreferredOpen}
              setValue={setPreferredValue}
              setItems={setDropdownItems}
              dropDownContainerStyle={{
                width: '66%',
                marginHorizontal: '17%',
                backgroundColor: '#d5dec6',
              }}
              searchable
              searchPlaceholder="Enter preferred species"
            />

            <Text style={styles.inputLabel}>SIZE</Text>
            <DropDownPicker
              style={{
                width: '66%',
                marginVertical: 10,
                marginHorizontal: '17%',
                backgroundColor: '#d5dec6',
              }}
              open={isSizeDropdownOpen}
              value={sizeDropdownValue}
              items={sizeDropdownItems}
              onOpen={onSizeOpen}
              setOpen={setIsSizeDropdownOpen}
              setValue={setSizeDropdownValue}
              setItems={setSizeDropdownItems}
              dropDownContainerStyle={{
                width: '66%',
                marginHorizontal: '17%',
                backgroundColor: '#d5dec6',
              }}
              searchPlaceholder="Search for species..."
            />

            <Text style={styles.inputLabel}>COLOR</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPlantColor}
              value={plantColor}
              placeholder="Enter plant color..."
            />

            <Text style={styles.inputLabel}>DESCRIPTIOIN</Text>
            <TextInput
              multiline
              style={styles.inputDescription}
              onChangeText={setPlantDescription}
              value={plantDescription}
              placeholder="Enter description..."
              maxLength={60}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // clear out all form data
                Alert.alert('Plant has been posted');
                updatePosts();
                setTitle('');
                setPlantColor('');
                setSizeDropdownValue('');
                setPlantDescription('');
                setPreferredValue(null);
                setDropdownValue(null);
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
                    setShowCamera(false);
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
