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
  },
  registerLabels: {
    fontSize: 22,
    color: 'white',
    alignSelf: 'flex-start',
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
  },

  backButton: {
    border: '1px solid black',
    color: 'white',
    alignSelf: 'start',
    float: 'left',
    margin: 5,
    padding: 5,
  },
  regHeader: {
    fontSize: 33,
    fontWeight: '500',
    alignSelf: 'center',
    paddingTop: 50,
    color: 'black',
    fontFamily: 'JosefinSans',
  },

  regSubmitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'grey',
    width: 100,
    borderRadius: 7,
  },
  logSubmitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'grey',

    borderRadius: 7,
  },
});
