import { StyleSheet, StatusBar, PixelRatio, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth - 30) / 3.5;
export default StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  innerContentContainer: {
    // backgroundColor: 'red',
    marginHorizontal: '4%',
    paddingBottom: '8%',
  },
  postContainer: {
    borderRadius: imageWidth / 15,
    marginTop: '8%',
  },
  postTitle: {
    fontFamily: 'JosefinSans-SemiBold',
    color: '#283618',
    fontSize: 24,
    marginBottom: 20,
  },
  plantNameText: {
    fontFamily: 'JosefinSans-LightItalic',
    color: '#283618',
    fontSize: 26,
    marginBottom: 15,
  },
  preferredTradesHeader: {
    fontFamily: 'JosefinSans-Medium',
    color: '#283618',
    fontSize: 18,
  },
  preferredTradesText: {
    fontFamily: 'JosefinSans',
    fontSize: 18,
    color: '#283618',
    fontStyle: 'italic',
  },
  postDescriptionText: {
    fontFamily: 'JosefinSans',
    color: '#6c7962',
    fontSize: 18,
  },

  /* ----------------- Button Container ----------------- */

  buttonContainer: {
    // flex: -1,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  detailPageButton: {
    backgroundColor: '#DDA15E',
    fontSize: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'JosefinSans',
    fontSize: 20,
  },
  /* ------------------ Header Component ------------------*/

  headerContainer: {
    flex: 0,
    alignItems: 'center',
    marginVertical: '5%',
  },
  headerText: {
    fontFamily: 'AnonymousPro-Bold',
    fontSize: 35,
    letterSpacing: 1,
    color: '#283618',
  },
  backButton: {
    position: 'absolute',
    color: '#283618',
    left: '4%',
  },
  /* -------------- Location Component --------------*/

  locationContainer: {
    marginTop: 60,
    // backgroundColor: 'brown',
  },
  locationHeaderText: {
    fontFamily: 'JosefinSans-Medium',
    fontSize: 28,
    marginBottom: 20,
  },

  LocationMap: {
    width: '100%',
    aspectRatio: 1.618, // #GOLDENRATIO
  },

  /* -------------- Profile Ribbon Component --------------*/

  profileRibbon: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#DDA15E',
    paddingHorizontal: '4%',
    paddingVertical: '2%',
  },
  profileInfoContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  profileImage: {
    height: 60,
    aspectRatio: 1,
    borderRadius: 30,
  },
  profileUsername: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 20,
    marginBottom: 3,
    color: 'black',
  },
  tradeCount: {
    fontFamily: 'JosefinSans',
    fontSize: 17,
    marginTop: 4,
  },
  tradeCounterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileTextContainer: {
    marginLeft: '4%',
  },
});
