import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#283618',
  },

  header: {
    display: 'inline',
    fontSize: 32,
    textAlign: 'center',
    color: '#FEFAE0',
    backgroundColor: '#49632a',
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

  headerText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 600,
    marginLeft: -10,
    alignSelf: 'center',
    display: 'inline-block',
  },

  accountInfo: {
    display: 'inline',
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
    float: 'left',
    marginLeft: '5%',
  },

  message: {
    color: 'black',
    backgroundColor: '#dda15e',
    border: '1px solid #dda15e',
    borderRadius: '5%',
    marginTop: '2%',
    width: '100%',
    alignItems: 'center',
  },

  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 500,
    paddingBottom: 5,
  },

  subHeader: {
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
    fontWeight: 600,
    paddingLeft: '5%',
    paddingBottom: 4,
  },

  row: {
    flexDirection: 'row',
  },

  col: {
    borderWidth: 1,
    flex: 1,
    width: 120,
    height: 120,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '3%',
  },

  title: {
    color: '#FEFAE0',
    textAlign: 'center',
  },
});
