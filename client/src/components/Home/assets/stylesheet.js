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
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    marginRight: 8,
    backgroundColor: '#FEFAE0',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#283618',
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
