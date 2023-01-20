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
    fontFamily: 'JosefinSans-Medium',
    color: '#283618',
  },
  modalCats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  modalCatsText: {
    margin: 10,
    padding: 5,
    fontSize: 26,
    fontFamily: 'AnonymousPro',
    color: '#283618',
  },
  iconStyling: {
    justifyContent: 'flex-end',
    padding: 12,
    color: '#dda15e',
  },
});
