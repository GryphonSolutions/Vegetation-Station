import { StyleSheet, StatusBar, PixelRatio, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth * 0.92) / 3.1;

export default StyleSheet.create({
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
  searchBarContainer: {
    flex: 0,
    height: 40,
    flexDirection: 'row',
    marginTop: '4%',
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
    marginHorizontal: '4%',
  },
  itemsContainer: {
    flex: 1,
    marginTop: 18,
    alignItems: 'center',
  },
  itemImage: {
    width: imageWidth,
    height: undefined,
    aspectRatio: 1,
    borderRadius: imageWidth / 15,
    // margin: (screenWidth - 30) / 45,
  },

  // MODAL
  modalTitle: {
    padding: 10,
    margin: 30,
  },
  modalHeaderText: {
    fontSize: 30,
    alignSelf: 'center',
  },
  modalCats: {
    flexDirection: 'row',
  },
  modalCatsText: {
    margin: 10,
    fontSize: 20,
    color: 'black',
  },
});
