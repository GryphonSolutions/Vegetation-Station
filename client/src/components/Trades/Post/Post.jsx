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
  SafeAreaView,
  Dimensions,
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
  updateIsNavShown,
  updateFilteredCatalog,
} from '../../../reducers';
import { getCatalog } from '../../../actions';
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

  const { isNavShown, isDarkMode } = useSelector((state) => state.app);

  // for image aspect ratio
  const [aspectRatio, setAspectRatio] = useState(null);

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
      commonName: dropdownImg[dropdownValue]?.commonName || 'Missing Info',
      images: [
        dropdownImg[dropdownValue]?.imgLink ||
          'https://t4.ftcdn.net/jpg/00/89/55/15/360_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg',
      ],
      size: sizeDropdownValue || 'small',
      color: plantColor || 'green',
      poster: activeUser.username,
      description: plantDescription || 'Missing Info',
      preferedTrade: dropdownImg[preferredValue]?.commonName || 'Missing Info',
      isPosted: true,
      isTraded: false,
      postTitle: title || 'Missing Info',
    };
    axios
      .post(
        'http://ec2-54-177-159-203.us-west-1.compute.amazonaws.com:8080/api/catalog/listings',
        formInfo,
      )
      .then(() => {
        dispatch(getCatalog({ url: 'catalog/listings' }))
          .unwrap()
          .then(async (val) => {
            try {
              dispatch(updateFilteredCatalog(val));
              const listings = await val.filter((item) => {
                return (
                  (item.isPosted === true || item.isTraded === false) &&
                  item.poster !== activeUser.username
                );
              });
              dispatch(updateCurrentPosts(listings));
            } catch (err) {
              console.error(err);
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
    // dispatch(updateCatalog(formInfo));
  };
  if (image) {
    Image.getSize(image, (width, height) => {
      setAspectRatio(height / width);
    });
  }

  return (
    <KeyboardAvoidingView style={[styles.page]}>
      {!showCamera && (
        <View
          style={{
            flex: 1,
            backgroundColor: isDarkMode ? '#141312' : '#f0f4f1',
          }}
        >
          <SafeAreaView />
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginVertical: '5%',
              }}
            >
              <Text
                style={[
                  {
                    fontFamily: 'AnonymousPro-Bold',
                    fontSize: 35,
                    letterSpacing: 1,
                    color: isDarkMode ? 'white' : '#283618',
                  },
                ]}
              >
                Post a Plant
              </Text>
            </View>
            <ScrollView
              contentContainerStyle={{
                alignItems: 'center',
                paddingBottom: 250,
              }}
              style={[styles.container]}
              showsVerticalScrollIndicator={false}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setShowCamera(true);
                  dispatch(updateIsNavShown());
                  setStatusBarHidden(true, 'slide');
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: isDarkMode ? 'white' : 'black' },
                  ]}
                >
                  Take Photo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text
                  style={[
                    styles.buttonText,
                    { color: isDarkMode ? 'white' : 'black' },
                  ]}
                >
                  Select Photo
                </Text>
              </TouchableOpacity>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={[
                    styles.imageContainer,
                    {
                      width: Dimensions.get('window').width * 0.65,
                      height:
                        Dimensions.get('window').width * 0.65 * aspectRatio,
                      imageHeight: 10,
                    },
                  ]}
                />
              )}

              <Text
                style={[
                  styles.inputLabel,
                  { color: isDarkMode ? 'white' : 'black' },
                ]}
              >
                TITLE
              </Text>
              <TextInput
                maxLength={20}
                style={[
                  styles.input,
                  { color: isDarkMode ? '#141312' : '#224722' },
                ]}
                onChangeText={setTitle}
                value={title}
                placeholder="Enter Title..."
                placeholderTextColor="grey"
              />

              <Text
                style={[
                  styles.inputLabel,
                  { color: isDarkMode ? 'white' : 'black' },
                ]}
              >
                PLANT SPECIES
              </Text>
              <DropDownPicker
                style={{
                  width: '100%',
                  marginVertical: 10,
                  backgroundColor: '#d5dec6',
                  borderRadius: '15%',
                  borderWidth: 0,
                }}
                textStyle={{
                  color: isDarkMode ? '#141312' : '#224722',
                  paddingHorizontal: 5,
                  fontSize: 18,
                  fontFamily: 'JosefinSans',
                }}
                placeholderStyle={{
                  color: 'grey',
                  fontSize: 18,
                  fontFamily: 'JosefinSans',
                }}
                dropDownContainerStyle={{
                  width: '100%',
                  backgroundColor: '#bdcba6',
                  fontColor: 'white',
                  borderRadius: '15%',
                  borderWidth: 0,
                  padding: 10,
                }}
                selectedItemLabelStyle={{
                  color: 'black',
                  fontSize: 16,
                  fontFamily: 'JosefinSans-Bold',
                }}
                listItemLabelStyle={{
                  color: 'black',
                  fontSize: 16,
                  fontFamily: 'JosefinSans',
                }}
                listItemContainerStyle={{
                  padding: 8,
                }}
                searchContainerStyle={{
                  paddingBottom: 16,
                  paddingTop: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: '#8a947b',
                }}
                searchTextInputStyle={{
                  fontFamily: 'JosefinSans',
                }}
                bottomOffset={100}
                open={isDropdownOpen}
                value={dropdownValue}
                items={dropdownItems}
                onOpen={onPlantsOpen}
                setOpen={setIsDropdownOpen}
                setValue={setDropdownValue}
                setItems={setDropdownItems}
                zIndex={3000}
                zIndexInverse={1000}
                searchable
                searchPlaceholder="Search for species..."
              />

              <Text
                style={[
                  styles.inputLabel,
                  { color: isDarkMode ? 'white' : 'black' },
                ]}
              >
                PREFERRED TRADE:
              </Text>
              <DropDownPicker
                style={{
                  width: '100%',
                  marginVertical: 10,
                  backgroundColor: '#d5dec6',
                  borderRadius: '15%',
                  borderWidth: 0,
                }}
                textStyle={{
                  color: isDarkMode ? '#141312' : '#224722',
                  paddingHorizontal: 5,
                  fontSize: 18,
                  fontFamily: 'JosefinSans',
                }}
                placeholderStyle={{
                  color: 'grey',
                  fontSize: 18,
                  fontFamily: 'JosefinSans',
                }}
                dropDownContainerStyle={{
                  width: '100%',
                  backgroundColor: '#bdcba6',
                  fontColor: 'white',
                  borderRadius: '15%',
                  borderWidth: 0,
                  padding: 10,
                  zIndex: 10,
                }}
                selectedItemLabelStyle={{
                  color: 'black',
                  fontSize: 16,
                  fontFamily: 'JosefinSans-Bold',
                }}
                listItemLabelStyle={{
                  color: 'black',
                  fontSize: 16,
                  fontFamily: 'JosefinSans',
                }}
                listItemContainerStyle={{
                  padding: 8,
                }}
                searchContainerStyle={{
                  paddingBottom: 16,
                  paddingTop: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: '#8a947b',
                }}
                searchTextInputStyle={{
                  fontFamily: 'JosefinSans',
                }}
                bottomOffset={100}
                open={isPreferredOpen}
                value={preferredValue}
                items={dropdownItems}
                onOpen={onPreferredOpen}
                setOpen={setIsPreferredOpen}
                setValue={setPreferredValue}
                setItems={setDropdownItems}
                zIndex={2000}
                zIndexInverse={2000}
                searchable
                searchPlaceholder="Enter preferred species"
              />

              <Text
                style={[
                  styles.inputLabel,
                  { color: isDarkMode ? 'white' : 'black' },
                ]}
              >
                SIZE
              </Text>
              <DropDownPicker
                style={{
                  width: '100%',
                  marginVertical: 10,
                  backgroundColor: '#d5dec6',
                  borderRadius: '15%',
                  borderWidth: 0,
                }}
                textStyle={{
                  color: isDarkMode ? '#141312' : '#224722',
                  paddingHorizontal: 5,
                  fontSize: 18,
                  fontFamily: 'JosefinSans',
                }}
                placeholderStyle={{
                  color: 'grey',
                  fontSize: 18,
                  fontFamily: 'JosefinSans',
                }}
                dropDownContainerStyle={{
                  width: '100%',
                  backgroundColor: '#bdcba6',
                  fontColor: 'white',
                  borderRadius: '15%',
                  borderWidth: 0,
                  padding: 10,
                }}
                selectedItemLabelStyle={{
                  color: 'black',
                  fontSize: 16,
                  fontFamily: 'JosefinSans-Bold',
                }}
                listItemLabelStyle={{
                  color: 'black',
                  fontSize: 16,
                  fontFamily: 'JosefinSans',
                }}
                listItemContainerStyle={{
                  padding: 8,
                }}
                searchContainerStyle={{
                  paddingBottom: 16,
                  paddingTop: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: '#8a947b',
                }}
                searchTextInputStyle={{
                  fontFamily: 'JosefinSans',
                }}
                bottomOffset={100}
                open={isSizeDropdownOpen}
                value={sizeDropdownValue}
                items={sizeDropdownItems}
                zIndex={1000}
                zIndexInverse={3000}
                onOpen={onSizeOpen}
                setOpen={setIsSizeDropdownOpen}
                setValue={setSizeDropdownValue}
                setItems={setSizeDropdownItems}
                searchPlaceholder="Search for species..."
              />

              <Text
                style={[
                  styles.inputLabel,
                  { color: isDarkMode ? 'white' : 'black' },
                ]}
              >
                COLOR
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { color: isDarkMode ? '#141312' : '#224722' },
                ]}
                onChangeText={setPlantColor}
                value={plantColor}
                placeholder="Enter plant color..."
                placeholderTextColor="grey"
              />

              <Text
                style={[
                  styles.inputLabel,
                  { color: isDarkMode ? 'white' : 'black' },
                ]}
              >
                DESCRIPTION
              </Text>
              <TextInput
                multiline
                style={[
                  styles.inputDescription,
                  { color: isDarkMode ? '#141312' : '#224722' },
                ]}
                onChangeText={setPlantDescription}
                value={plantDescription}
                placeholder="Enter description..."
                placeholderTextColor="grey"
                maxLength={400}
              />

              <TouchableOpacity
                style={[styles.button, { marginTop: '8%' }]}
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
                <Text
                  style={[
                    styles.buttonText,
                    { color: isDarkMode ? 'white' : 'black' },
                  ]}
                >
                  Submit Plant
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      )}

      {/*

Separating camera and form

 */}

      {
        // show camera
        showCamera && isFocused && (
          <View style={styles.cameraContainer}>
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
                  <Text style={styles.buttonCameraText}>Flip</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonCamera}
                  onPress={() => {
                    takePhoto();
                    dispatch(updateIsNavShown());
                    setShowCamera(false);
                  }}
                >
                  <Text style={styles.buttonCameraText}>Take picture</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonCamera}
                  onPress={() => {
                    setShowCamera(false);
                    dispatch(updateIsNavShown());
                    setStatusBarHidden(false, 'slide');
                  }}
                >
                  <Text style={styles.buttonCameraText}>Exit</Text>
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
