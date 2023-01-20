import { StyleSheet, StatusBar, Dimensions } from 'react-native';

export default StyleSheet.create({
  logoStyles: {
    position: 'absolute',
    top: '5%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  loginInputsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '6%',
  },

  inputLabels: {
    width: Dimensions.get('window').width * 0.84,
    fontFamily: 'JosefinSans-Medium',
    fontSize: 28,
    color: '#283618',
    marginTop: '8%',
  },

  loginInputs: {
    backgroundColor: '#d5dec6',
    fontFamily: 'JosefinSans',
    width: '100%',
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: '8%',
    marginTop: '4%',
  },

  button: {
    backgroundColor: '#dda15e',
    borderRadius: '8%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontFamily: 'JosefinSans',
    fontSize: 18,
  },

  // buttonContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderWidth: 0,
  //   backgroundColor: '#dda15e',
  //   marginTop: 25,
  //   marginLeft: 12,
  //   fontFamily: 'JosefinSans',
  //   width: 82.5,
  //   borderRadius: 7,
  // },

  // regButton: {
  //   fontFamily: 'JosefinSans',
  //   fontSize: 10,
  //   padding: 10,
  // },

  // above this line: Login.jsx

  loginButtons: {
    color: 'white',
    border: '2px solid black',
  },

  appTitle: {
    fontSize: '30px',
    color: 'green',
  },

  backButton: {
    border: '1px solid black',
    color: '#283618',
    alignSelf: 'start',
    float: 'left',
    margin: 5,
    padding: 5,
  },
  regHeader: {
    fontSize: 33,
    fontWeight: '500',
    alignSelf: 'center',
    color: '#283618',
    paddingTop: 50,
    fontFamily: 'JosefinSans',
    marginBottom: 53,
    // anonymous pro for emailand pass --NO
    // padding in login -- YES
    // font for button smaller --NO
    // no vegi stegi --YES
    // space between buttons center instead --YES
    // padding horizontal on button views ref message in profile
    // no border on button --YES
  },

  regSubmitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dda15e',
    width: 85,
    borderRadius: 7,
  },
});
