// mine
import { StyleSheet, StatusBar, PixelRatio, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth - 30) / 3.5;

export default StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    paddingTop: 20,
  },
  title: {
    fontFamily: 'AnonymousPro-Bold',
    fontSize: 35,
    letterSpacing: 1,
    color: '#283618',
    paddingHorizontal: '8%',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    borderRadius: '5%',
    backgroundColor: '#DDA15E',
    width: '65%',
    alignSelf: 'center',
    margin: 10,
    padding: 5,
  },
  buttonText: {
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'JosefinSans',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'JosefinSans',
  },
  // ----Camera and image---------------------------------
  camera: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonCamera: {
    color: 'white',
    backgroundColor: 'blue',
    borderRadius: '5%',
    alignSelf: 'flex-end',
    width: '50%',
    alignItems: 'center',
  },
  imageContainer: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'black',
    margin: 25,
  },
  // ----INPUT---------------------------------
  input: {
    alignSelf: 'center',
    width: '65%',
    flex: 1,
    fontSize: 20,
    fontFamily: 'JosefinSans',
    padding: 10,
    marginRight: 8,
    color: '#224722',
    backgroundColor: '#d5dec6',
    borderRadius: imageWidth / 15,
  },
  inputLabel: {
    fontSize: 20,
    marginLeft: '17%',
    flex: 1,
    fontFamily: 'JosefinSans',
  },
  inputDescription: {
    alignSelf: 'center',
    width: '65%',
    minHeight: '20%',
    maxHeight: '20%',
    flex: 1,
    fontSize: 20,
    fontFamily: 'JosefinSans',
    padding: 10,
    marginRight: 8,
    color: '#224722',
    backgroundColor: '#d5dec6',
    borderRadius: imageWidth / 15,
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
