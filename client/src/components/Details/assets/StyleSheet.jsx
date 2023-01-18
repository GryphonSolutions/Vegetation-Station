import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#283618',
    // paddingTop: 60,
  },
  imageContainer: {
    flex: 2,
  },
  plantPic: {
    // flex: 2,
    // aspectRation: 1.5,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  postContainer: {
    flex: 3,
    backgroundColor: '#283618',
  },
  postTitle: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    marginTop: 10,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  plantNameContainer: {
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  plantNameText: {
    color: 'white',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  postDescContainer: {
    marginLeft: 25,
    marginRight: 25,
  },
  prefTradesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  descTradesText: {
    fontSize: 15,
    color: 'white',
  },
  prefTradeText: {
    fontSize: 15,
    color: 'white',
    fontStyle: 'italic',
  },
  plantPostDesc: {
    color: 'white',
    fontSize: 15,
    // marginBottom: 5,
  },

  /* ----------------- Button Container ----------------- */

  buttonContainer: {
    flex: -1,
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
  /* ------------------ Header Component ------------------*/

  headerContainer: {
    // flex: 1,
    // display: 'flex',
    color: '#FEFAE0',
    width: '100%',
    backgroundColor: '#49632a',
    flexDirection: 'row',
    paddingTop: 40,
    paddingRight: 40,
    paddingLeft: 15,
  },
  // headerInfo: {
  //   flexDirection: 'row',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   // textAlign: 'center',
  //   borderWidth: 1,
  //   borderColor: 'black',
  // },
  headerText: {
    fontSize: 30,
    color: 'white',
    display: 'flex',
    alignSelf: 'center',
    // textAlign: 'center',
    // justifyContent: 'center',
  },
  backButton: {
    // float: 'left',
    // alignSelf: 'start',
    color: 'white',
    // alignItems: 'flex-start',
    // display: 'inline-block',
  },
  /* -------------- Location Component --------------*/

  LocationContainer: {
    margin: 10,
    flex: 1,
    // marginLeft: 10,
    // marginRight: 10,
    // marginBottom: 5,
    // width: 100,
    // height: 100,
  },
  LocationImage: {
    flex: 1,
    // overflow: 'hidden',
  },

  /* -------------- Profile Ribbon Component --------------*/

  profileRibbon: {
    flex: -1,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#DDA15E',
    paddingLeft: 25,
    paddingRight: 25,
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
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  tradeNumber: {
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
  },
  usernameContainer: {
    // textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
});
