import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  page: {
    backgroundColor: '#FEFAE0',
    flex: 1,
  },
  container: {
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
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
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
    padding: 10,
  },
  // ----INPUT---------------------------------
  input: {
    borderWidth: 1,
    alignSelf: 'center',
    width: '65%',
    height: '5%',
    marginBottom: 10,
    flex: 1,
  },
  inputLabel: {
    fontSize: 20,
    marginLeft: '17%',
    flex: 1,
  },
  inputDescription: {
    borderWidth: 1,
    alignSelf: 'center',
    width: '65%',
    height: 100,
    marginBottom: 10,
    // flex: 1,
    minHeight: '20%',
    maxHeight: '20%',
  },
  plantTitle: {
    fontSize: 25,
    alignSelf: 'center',
    flex: 1,
    marginBottom: 10,
  },
  plantDesription: {
    fontSize: 18,
    alignSelf: 'center',
    flex: 1,
  },
});
