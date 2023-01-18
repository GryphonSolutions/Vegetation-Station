import { StyleSheet, StatusBar, PixelRatio, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth - 30) / 3.5;

export default StyleSheet.create({
  headerContainer: {
    flex: 0,
    backgroundColor: '#f0f4f1',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  headerText: {
    fontFamily: 'AnonymousPro-Bold',
    fontSize: 35,
    letterSpacing: 1,
    color: '#283618',
    paddingLeft: 30,
    paddingVertical: 20,
  },
  searchBarContainer: {
    flex: 0,
    height: 40,
    flexDirection: 'row',
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'JosefinSans',
    padding: 10,
    marginRight: 8,
    color: '#224722',
    backgroundColor: '#d5dec6',
    borderRadius: imageWidth / 15,
  },
  contentContainer: {
    flex: 1,
    // backgroundColor: '#FEFAE0',
    backgroundColor: '#f0f4f1',
  },
  itemsContainer: {
    flex: 1,
    margin: 15,
    marginBottom: 0,
    alignItems: 'center',
  },
  itemImage: {
    width: imageWidth,
    height: undefined,
    aspectRatio: 1,
    borderRadius: imageWidth / 15,
    margin: (screenWidth - 30) / 45,
  },
});
