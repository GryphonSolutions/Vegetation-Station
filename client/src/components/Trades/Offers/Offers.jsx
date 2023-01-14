import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  SectionList,
  StatusBar,
} from 'react-native';

const image = 'data:image/jpeg;base64,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';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const DATA = [
  {
    title: 'Your Offers',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Your Trade Requests',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
];

const Offers = () => (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image
            style={styles.logo}
            source={{
              uri: image,
            }}
          />
          <Text style={styles.title}>{item}</Text>
          <Image
            style={styles.logo}
            source={{
              uri: image,
            }}
          />
          <Text style={styles.title}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View>
          <Text style={styles.header}>{title}</Text>

        </View>
      )}
    />
  </SafeAreaView>
);

export default Offers;