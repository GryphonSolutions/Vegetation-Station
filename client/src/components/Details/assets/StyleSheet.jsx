import { StyleSheet, StatusBar, PixelRatio, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth - 30) / 3.5;
export default StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#f0f4f1',
    // paddingTop: 60,
  },
  imageContainer: {
    // marginTop: 10,
    // flex: 2,
  },
  plantPic: {
    // flex: 2,
    // // aspectRation: 1.5,
    position: 'fixed',
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    // width: imageWidth,
    // height: undefined,
    // aspectRatio: 1,
    // borderRadius: imageWidth / 15,
    // margin: (screenWidth - 30) / 45,
  },
  postContainer: {
    flex: 2,
    backgroundColor: '#d5dec6',
    borderRadius: imageWidth / 15,
    marginTop: 5,
    paddingBottom: 20,
  },
  postTitle: {
    fontFamily: 'JosefinSans',
    textAlign: 'center',
    fontSize: 20,
    color: '#283618',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  plantNameContainer: {
    textAlign: 'left',
    paddingLeft: 5,
    marginBottom: 5,
  },
  plantNameText: {
    fontFamily: 'JosefinSans',
    color: '#283618',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  postDescContainer: {
    fontFamily: 'JosefinSans',
    paddingLeft: 10,
    paddingRight: 10,
    // marginLeft: 30,
    // marginRight: 25,
  },
  prefTradesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  descTradesText: {
    fontFamily: 'JosefinSans',
    fontSize: 15,
    color: '#283618',
  },
  prefTradeText: {
    fontFamily: 'AnonymousPro-Bold',
    fontSize: 15,
    color: '#283618',
    fontStyle: 'italic',
  },
  plantPostDesc: {
    fontFamily: 'AnonymousPro-Bold',
    color: '#283618',
    fontSize: 15,
    // marginBottom: 5,
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
    // display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: '5%',
  },
  headerText: {
    fontFamily: 'AnonymousPro-Bold',
    fontSize: 35,
    letterSpacing: 1,
    color: '#283618',
    paddingHorizontal: '8%',
    // textAlign: 'center',
    // justifyContent: 'center',
  },
  backButton: {
    // float: 'left',
    // alignSelf: 'start',
    color: '#283618',
    marginLeft: 6,
    // marginLeft: 5,
    // alignItems: 'flex-start',
    // display: 'inline-block',
  },
  /* -------------- Location Component --------------*/

  LocationContainer: {
    margin: 10,
    // flex: 1,
    // marginLeft: 10,
    // marginRight: 10,
    // marginBottom: 5,
    // width: 100,
    // height: 100,
  },
  LocationMap: {
    flex: 0,
    width: '100%',
    height: '100%',
    // overflow: 'hidden',
  },

  /* -------------- Profile Ribbon Component --------------*/

  profileRibbon: {
    flex: 0,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#DDA15E',
    // paddingLeft: 25,
    // paddingRight: 25,
    marginTop: 10,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    display: 'flex',
    // width: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileImage: {
    // flex: 1,
    height: 70,
    width: 70,
    margin: 5,
    borderRadius: 50,
  },
  profileUsername: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'JosefinSans',
    letterSpacing: 1.5,
  },
  tradeNumber: {
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'JosefinSans',
  },
  usernameContainer: {
    // textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
});
