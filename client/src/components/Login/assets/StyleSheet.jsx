import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    color: '#283618',
  },
  loginInputs: {
    border: 'solid black 1px',
    backgroundColor: '#d5dec6',
    borderRadius: '3%',
    margin: '5%',
    height: 30,
    width: 200,
    padding: 5,
  },
  registerLabels: {
    fontSize: 25,
    color: '#283618',
    alignSelf: 'flex-start',
    fontFamily: 'JosefinSans',
  },

  loginInputsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },

  loginButtons: {
    color: 'white',
    border: '2px solid black',
  },

  appTitle: {
    fontSize: '30px',
    color: 'green',
  },
  logoStyles: {
    height: '44%',
    width: '70%',
    alignSelf: 'center',
    margin: 20,
    padding: 20,
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
  regButton: {
    fontFamily: 'JosefinSans',
    fontSize: 2,
    padding: 10,
  },

  regSubmitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dda15e',
    width: 85,
    borderRadius: 7,
  },
  logSubmitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    backgroundColor: '#dda15e',
    marginTop: 25,
    marginLeft: 12,
    fontFamily: 'JosefinSans',
    width: 82.5,
    borderRadius: 7,
  },
});
