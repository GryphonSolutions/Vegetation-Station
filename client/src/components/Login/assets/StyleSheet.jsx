import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#283618',
  },
  loginInputs: {
    border: 'solid black 1px',
    backgroundColor: 'white',
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

  backButton: {
    border: '1px solid black',
    color: 'white',
    alignSelf: 'start',
    float: 'left',
    margin: 5,
    padding: 5,
  },
  regHeader: {
    fontSize: '30px',
    fontWeight: '500',
    alignSelf: 'center',
    padding: '15%',
    color: 'white',
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
