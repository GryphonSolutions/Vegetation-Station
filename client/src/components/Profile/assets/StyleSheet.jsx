import { StyleSheet, StatusBar, PixelRatio, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth - 30) / 3.5;

export default StyleSheet.create({
  headerContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: '5%',
  },

  backButton: {
    position: 'absolute',
    color: '#283618',
    left: 10,
  },

  headerText: {
    fontFamily: 'AnonymousPro-Bold',
    fontSize: 35,
    letterSpacing: 1,
    color: '#283618',
  },

  contentContainer: {
    flex: 1,
    marginTop: '10%',
    marginHorizontal: '8%',
  },

  accountInfoContainer: {
    // flex: 0,
    flexDirection: 'row',
    // justifyContent: 'center',
    // backgroundColor: 'red',
    // width: '80%',
  },

  profilePictureContainer: {
    // backgroundColor: 'yellow',
  },

  profilePicture: {
    width: imageWidth,
    maxWidth: 150,
    height: undefined,
    aspectRatio: 1,
    borderRadius: '50%',
  },

  profileDetailsContainer: {
    flex: 1,
    paddingLeft: '4%',
    // backgroundColor: 'blue',
    justifyContent: 'center',
  },

  profileDetailsText: {
    fontFamily: 'JosefinSans',
  },

  username: {
    fontSize: 20,
  },

  userLocation: {
    fontSize: 16,
    marginTop: 10,
  },

  userTrades: {
    fontSize: 16,
    marginTop: 5,
  },

  button: {
    backgroundColor: '#dda15e',
    borderRadius: '5%',
    marginTop: 10,
    width: 100,
    padding: 5,
  },

  buttonText: {
    textAlign: 'center',
    fontFamily: 'JosefinSans',
  },

  starIcon: {
    paddingRight: '2%',
    color: 'gold',
  },

  body: {
    backgroundColor: '#606C38',
  },

  item: {
    backgroundColor: '#606C38',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 8,
  },

  header2: {
    fontSize: 20,
    flex: 2,
    // fontWeight: 600,
    paddingLeft: '14%',
    paddingBottom: 4,
  },

  header3: {
    // color: 'white',
    fontSize: 20,
    flex: 2,
    // fontWeight: 600,
    paddingLeft: '14%',
    paddingTop: 4,
    paddingBottom: 4,
  },

  row: {
    flexDirection: 'row',
    marginLeft: '10%',
    marginRight: '10%',
  },

  col: {
    borderWidth: 1,
    flex: -1,
    width: 80,
    height: 80,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '3%',
  },

  title: {
    color: '#FEFAE0',
    textAlign: 'center',
  },
});
