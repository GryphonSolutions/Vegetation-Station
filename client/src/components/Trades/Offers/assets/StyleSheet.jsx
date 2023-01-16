import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#283618',
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRigth: 20,
    marginVertical: 2,
  },

  yourItem: {
    textAlign: 'center',
    paddingLeft: '10%',
    width: '40%',
  },

  arrows: {
    textAlign: 'center',
    marginVertical: '15%',
    width: '15%',
  },

  otherItem: {
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

  plantImage: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },

  user: {
    fontSize: 20,
    fontWeight: 600,
    paddingBottom: 5,
    color: '#FEFAE0',
    textAlign: 'center',
  },

  accept: {
    color: 'white',
    backgroundColor: 'chartreuse',
    border: '1px solid green',
    borderRadius: '5%',
    alignSelf: 'center',
    marginTop: '10%',
    width: '70%',
    alignItems: 'center',
  },

  decline: {
    color: 'white',
    backgroundColor: 'red',
    border: '1px solid red',
    borderRadius: '5%',
    alignSelf: 'center',
    marginTop: '10%',
    width: '70%',
    alignItems: 'center',
  },

  cancel: {
    color: 'white',
    backgroundColor: 'orange',
    border: '1px solid orange',
    borderRadius: '5%',
    alignSelf: 'center',
    marginTop: '10%',
    width: '70%',
    alignItems: 'center',
  },

  message: {
    color: 'white',
    backgroundColor: 'lightgrey',
    border: '1px solid lightgrey',
    borderRadius: '5%',
    alignSelf: 'center',
    marginTop: '10%',
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
