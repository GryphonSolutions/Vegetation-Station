import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#283618',
  },

  item: {
    backgroundColor: '#606C38',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 8,
  },

  innerItem1: {
    textAlign: 'center',
    paddingLeft: '10%',
    width: '40%',
  },

  innerItem2: {
    textAlign: 'center',
    marginVertical: '5%',
    width: '10%',
  },

  innerItem3: {
    textAlign: 'center',

    paddingRight: '10%',
    width: '40%',
  },

  header: {
    fontSize: 32,
    textAlign: 'center',
    marginLeft: '-10%',
    marginRight: '-10%',
    color: '#FEFAE0',
    backgroundColor: '#49632a',
  },

  tinyLogo: {
    alignSelf: 'center',
    width: 50,
    height: 50,
  },

  title: {
    color: '#FEFAE0',
    textAlign: 'center',
  },

  accept: {
    color: 'white',
    backgroundColor: 'chartreuse',
    border: '1px solid green',
    borderRadius: '5%',
    alignSelf: 'center',
    marginTop: '5%',
    width: '70%',
    alignItems: 'center',
  },

  decline: {
    color: 'white',
    backgroundColor: 'red',
    border: '1px solid red',
    borderRadius: '5%',
    alignSelf: 'center',
    marginTop: '5%',
    width: '70%',
    alignItems: 'center',
  },

  cancel: {
    color: 'white',
    backgroundColor: 'orange',
    border: '1px solid orange',
    borderRadius: '5%',
    alignSelf: 'center',
    marginTop: '5%',
    width: '70%',
    alignItems: 'center',
  },

  message: {
    color: 'white',
    backgroundColor: 'lightgrey',
    border: '1px solid lightgrey',
    borderRadius: '5%',
    alignSelf: 'center',
    marginTop: '5%',
    width: '70%',
    alignItems: 'center',
  },

  arrowRight: {
    color: '#DC143C',
  },

  arrowLeft: {
    color: '#7FFF00',
  },
});
