import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#283618',
  },

  header: {
    fontSize: 32,
    textAlign: 'center',
    marginLeft: '-10%',
    marginRight: '-10%',
    color: '#FEFAE0',
    backgroundColor: '#49632a',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  tinyReact: {
    width: '100%',
    height: '50%',
  },
  practice: {
    // top: 100,
    // left: '30%',
    width: 200,
    height: 100,
    backgroundColor: 'brown',
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
