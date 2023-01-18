import { StyleSheet, StatusBar, PixelRatio, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth - 30) / 3.5;

export default StyleSheet.create({
  headerContainer: {
    flex: 0,
    backgroundColor: '#606C38',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    color: '#FEFAE0',
    fontSize: 30,
    fontFamily: 'Helvetica-Bold',
    paddingVertical: 20,
  },

  itemsContainer: {
    alignItems: 'center',
    backgroundColor: '#283618',
  },

  subHeader: {
    fontSize: 32,
    textAlign: 'center',
    marginLeft: '-10%',
    marginRight: '-10%',
    color: '#FEFAE0',
  },

  itemImage: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: imageWidth / 15,
    margin: 5,
  },

  container: {
    flex: 0,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#283618',
  },

  trade: {
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
    paddingLeft: '5%',
    width: '40%',
  },

  otherItem: {
    textAlign: 'center',
    paddingRight: '15%',
    width: '40%',
  },

  user: {
    fontSize: 20,
    // fontWeight: 600,
    paddingBottom: 5,
    color: '#FEFAE0',
    textAlign: 'center',
  },

  plantImage: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },

  arrows: {
    textAlign: 'center',
    marginVertical: '15%',
    width: '15%',
  },

  buttonText: {
    color: 'white',
  },

  accept: {
    backgroundColor: 'chartreuse',
    border: '1px solid green',
    borderRadius: '5%',
    alignSelf: 'center',
    marginTop: 10,
    padding: 5,
    width: 100,
    alignItems: 'center',
  },

  decline: {
    backgroundColor: 'red',
    border: '1px solid red',
    borderRadius: '5%',
    alignSelf: 'center',
    marginTop: 10,
    width: 100,
    padding: 5,
    alignItems: 'center',
  },

  cancel: {
    backgroundColor: 'orange',
    border: '1px solid orange',
    borderRadius: '5%',
    alignSelf: 'center',
    marginTop: 10,
    width: 100,
    padding: 5,
    alignItems: 'center',
  },

  message: {
    backgroundColor: 'lightgrey',
    border: '1px solid lightgrey',
    borderRadius: '5%',
    alignSelf: 'center',
    marginTop: 10,
    width: 100,
    padding: 5,
    alignItems: 'center',
  },

  arrowRight: {
    color: '#DC143C',
  },

  arrowLeft: {
    color: '#7FFF00',
  },
});
