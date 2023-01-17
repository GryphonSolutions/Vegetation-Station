import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  loginInputs: {
    border: 'solid black 1px',
    borderRadius: '7px',
    margin: '5px',
    padding: '5px',
  },

  loginButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '5px',
    padding: '5px',
  },

  loginButtons: {
    color: 'white',
    border: '2px solid black',
    height: '50px',
  },

  appTitle: {
    fontSize: '30px',
    color: 'green',
    marginBottom: '20%',
  },

  backButton: {
    flex: '1',
    padding: '10px',
    border: '1px solid black',
  },
});
