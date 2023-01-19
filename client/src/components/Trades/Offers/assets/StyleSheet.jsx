import { StyleSheet, StatusBar, PixelRatio, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth - 30) / 3.5;

export default StyleSheet.create({
  // Offers Styles
  headerContainer: {
    flex: 0,
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
  },

  contentContainer: {
    flex: 1,
    marginTop: '10%',
  },

  sectionContainer: {
    flex: 1,
    marginHorizontal: '8%',
    marginVertical: '8%',
    paddingTop: 30,
    paddingBottom: 20,
    borderRadius: imageWidth / 7,
  },

  subHeaderContainerPositioner: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  subHeaderContainer: {
    width: 240,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: imageWidth / 7,
  },

  subHeader: {
    fontFamily: 'JosefinSans',
    fontSize: 25,
  },

  tradeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '8%',
    marginVertical: '5%',
  },

  itemContainer: {
    alignItems: 'center',
    width: screenWidth * 0.3,
  },

  arrowsContainer: {
    marginVertical: 30,
    justifyContent: 'center',
  },

  usernameContainer: {
    width: imageWidth,
    height: 30,
    alignItems: 'center',
  },

  username: {
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: 'JosefinSans',
    fontSize: 15,
  },

  plantImage: {
    width: imageWidth,
    height: undefined,
    aspectRatio: 1,
    borderRadius: imageWidth / 15,
  },

  buttonContainer: {},

  actionButton: {
    borderRadius: '5%',
    alignSelf: 'center',
    marginTop: 10,
    padding: 5,
    width: 100,
    alignItems: 'center',
  },

  buttonText: {
    color: '#f7f7f4',
    fontFamily: 'JosefinSans',
  },
});
