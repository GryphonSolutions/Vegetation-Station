import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Image,
  Button,
  Alert,
} from 'react-native';

const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1WmVyuYaItZbybhamm-BZv7TAniCg-qONA&usqp=CAU';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
    backgroundColor: '#283618',
  },
  item: {
    backgroundColor: '#606C38',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 8,
  },
  innerItem1: {
    textAlign: 'center',
    paddingLeft: '10%',
    width: '40%',
  },
  innerItem2: {
    textAlign: 'center',
    marginVertical: '10%',
    width: '20%',
  },
  innerItem3: {
    textAlign: 'center',
    alignSelf: 'flex-end',
    paddingRight: '10%',
    width: '40%',
  },
  header: {
    fontSize: 32,
    textAlign: 'center',
    marginLeft: '-10%',
    marginRight: '-10%',
    color: '#FEFAE0',
    backgroundColor: '#49632a',
  },
  tinyLogo: {
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  title: {
    color: '#FEFAE0',
    textAlign: 'center',
  },
  accept: {
    color: 'green',
    backgroundColor: 'green',
  },
  decline: {
    color: 'red',
    backgroundColor: 'red',
  },
  arrowRight: {
    color: '#DC143C',
  },
  arrowLeft: {
    color: '#7FFF00',
  },
});

const DATA = [
  { title: 'Your Offers', data: ['Cactus', 'Flower', 'Shrub'] },
  { title: 'Your Requests', data: ['Tree', 'Herb', 'Flower'] }];
const arrowRight = '--------->';
const arrowLeft = '<---------';

const Offers = () => (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.innerItem1}>
            <Text style={styles.title}>You</Text>
            <Image
              style={styles.tinyLogo}
              source={{ uri: image }}
            />
            <Button
              title="Accept"
              color="chartreuse"
              style={styles.accept}
              onPress={() => Alert.alert('Accept Button pressed')}
            />
          </View>
          <View style={styles.innerItem2}>
            <Text style={styles.arrowRight}>{arrowRight}</Text>
            <Text style={styles.arrowLeft}>{arrowLeft}</Text>
          </View>
          <View style={styles.innerItem3}>
            <Text style={styles.title}>Matt</Text>
            <Image
              style={styles.tinyLogo}
              source={{ uri: image }}
            />
            <Button
              color="red"
              title="Decline"
              style={styles.decline}
              onPress={() => Alert.alert('Decline Button pressed')}
            />
          </View>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  </SafeAreaView>
);

export default Offers;
