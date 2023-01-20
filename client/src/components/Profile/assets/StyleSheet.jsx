import { StyleSheet, StatusBar, PixelRatio, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth * 0.92) / 3.1;

export default StyleSheet.create({
  headerContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
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
    left: 10,
  },

  contentContainer: {
    flex: 1,
    marginTop: '10%',
    marginHorizontal: '4%',
  },

  accountInfoContainer: {
    flexDirection: 'row',
    marginBottom: '8%',
  },

  profilePictureContainer: {},

  profilePicture: {
    width: imageWidth,
    maxWidth: 150,
    height: undefined,
    aspectRatio: 1,
    borderRadius: imageWidth / 2,
  },

  profileDetailsContainer: {
    flex: 1,
    paddingLeft: '6%',
    justifyContent: 'center',
  },

  profileDetailsText: {
    fontFamily: 'JosefinSans',
  },

  username: {
    fontFamily: 'JosefinSans-SemiBold',
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

  tradesListContainer: {
    marginVertical: '8%',
  },

  tradesListHeader: {
    fontFamily: 'JosefinSans-Medium',
    fontSize: 25,
  },

  tradesListBodyContainer: {
    marginTop: '8%',
  },

  itemsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginVertical: '0.8%',
  },

  itemImage: {
    width: imageWidth,
    height: undefined,
    aspectRatio: 1,
    borderRadius: imageWidth / 15,
  },
  tradeCounterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: '3%',
    color: 'gold',
  },
});
