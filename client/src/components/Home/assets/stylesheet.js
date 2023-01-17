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
  searchBarContainer: {
    flex: 0,
    height: 40,
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
  searchBar: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    marginRight: 8,
    color: 'red',
    backgroundColor: '#FEFAE0',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#283618',
  },
  itemsContainer: {
    margin: 15,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  itemImage: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: imageWidth / 15,
    margin: 5,
  },
});
