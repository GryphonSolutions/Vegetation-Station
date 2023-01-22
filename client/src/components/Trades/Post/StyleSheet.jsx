// mine
import { StyleSheet, StatusBar, PixelRatio, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth - 30) / 3.5;

export default StyleSheet.create({
  page: {
    flex: 1,
    // alignItems: 'flex-end',
  },
  container: {
    paddingTop: 20,
    // backgroundColor: 'red',
    marginHorizontal: '4%',
    flex: 1,
  },
  title: {
    fontFamily: 'AnonymousPro-Bold',
    fontSize: 35,
    letterSpacing: 1,
    color: '#283618',
    textAlign: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    // margin: 5,
  },
  button: {
    borderRadius: '15%',
    backgroundColor: '#DDA15E',
    alignSelf: 'center',
    width: '60%',
    marginVertical: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'JosefinSans',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'JosefinSans',
  },
  // ----Camera and image---------------------------------
  cameraContainer: {
    flex: 1,
    opacity: '100%',
  },
  camera: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonCamera: {
    backgroundColor: '#d5dec6',
    borderRadius: '5%',
    margin: 5,
    padding: 5,
    // alignSelf: 'flex-end',
    // width: '50%',
    // alignItems: 'center',
  },
  imageContainer: {
    width: '65%',
    borderWidth: 2,
    borderColor: 'black',
    margin: 25,
  },
  buttonCameraText: {
    fontSize: 25,
    color: '#283618',
    fontFamily: 'JosefinSans-Medium',
  },
  // ----INPUT---------------------------------
  input: {
    width: '100%',
    flex: 1,
    fontSize: 18,
    fontFamily: 'JosefinSans',
    margin: 10,
    padding: 15,
    backgroundColor: '#d5dec6',
    borderRadius: '15%',
  },
  inputLabel: {
    fontSize: 18,
    flex: 1,
    fontFamily: 'JosefinSans',
    marginTop: '8%',
  },
  inputDescription: {
    width: '100%',
    height: '20%',
    fontSize: 18,
    lineHeight: 27,
    fontFamily: 'JosefinSans',
    marginVertical: 10,
    padding: 15,
    color: '#224722',
    backgroundColor: '#d5dec6',
    borderRadius: '15%',
  },
  plantTitle: {
    fontSize: 25,
    alignSelf: 'center',
    flex: 1,
    marginBottom: 10,
    fontFamily: 'JosefinSans',
  },
  plantDesription: {
    fontSize: 18,
    alignSelf: 'center',
    flex: 1,
    fontFamily: 'JosefinSans',
  },
});
