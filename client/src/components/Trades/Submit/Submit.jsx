import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';

import { data } from '../../../../../server/data/exampleData.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

const Submit = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const plantNames = data.map((plant) => {
      return {
        label: plant['Latin name'],
        value: plant,
      };
    });
    setItems(plantNames);
  }, []);

  const testButton = () => {
    Alert.alert(`The sample data name is: ${value['Latin name']}`);
  };

  return (
    <View style={styles.container}>
      <Text>Submit Page</Text>
      <Button
        onPress={testButton}
        title="Test Button"
        color="#841584"
        accessibilityLabel="This is only a test button"
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />

      <StatusBar style="auto" />
    </View>
  );
};

export default Submit;
