import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#283618',
  },

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

  backButton: {
    color: 'white',
    size: '20px',
    alignSelf: 'start',
    paddingTop: 5,
    paddingLeft: 5,
    float: 'left',
    display: 'inline-block',
  },

  itemsContainer: {
    backgroundColor: '#283618',
  },

  accountInfo: {
    display: 'inline',
    flex: -1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },

  profile: {
    width: 100,
    height: 100,
    marginLeft: '10%',
    borderRadius: '50%',
    display: 'inline-block',
    float: 'left',
  },

  details: {
    float: 'right',
    display: 'inline-block',
    marginLeft: '5%',
    // display: 'inline-block',
  },

  button: {
    color: 'black',
    backgroundColor: '#dda15e',
    border: '1px solid #dda15e',
    borderRadius: '5%',
    marginTop: '2%',
    width: 100,
    padding: 5,
    alignSelf: 'center',
  },

  buttonText: {
    textAlign: 'center',
    color: 'white',
  },

  name: {
    color: 'white',
    fontSize: 20,
    // fontWeight: 500,
    paddingBottom: 5,
  },

  location: {
    color: 'white',
    fontSize: 16,
    paddingBottom: 5,
  },

  trades: {
    color: 'white',
    fontSize: 16,
    paddingBottom: 5,
  },

  starIcon: {
    paddingRight: '2%',
    color: 'gold',
  },

  item: {
    backgroundColor: '#606C38',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 8,
  },

  header2: {
    color: 'white',
    fontSize: 20,
    flex: 2,
    // fontWeight: 600,
    paddingLeft: '14%',
    paddingBottom: 4,
  },

  header3: {
    color: 'white',
    fontSize: 20,
    flex: 2,
    // fontWeight: 600,
    paddingLeft: '14%',
    paddingTop: 4,
    paddingBottom: 4,
  },

  row: {
    flexDirection: 'row',
    marginLeft: '10%',
    marginRight: '10%',
  },

  col: {
    borderWidth: 1,
    flex: -1,
    width: 80,
    height: 80,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '3%',
  },

  title: {
    color: '#FEFAE0',
    textAlign: 'center',
  },
});
