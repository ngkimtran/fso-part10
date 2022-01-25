import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 20,
  },
});

const SortPicker = ({ order, setOrder }) => {
  const picker = [
    {
      label: 'Latest repositories',
      value: 'latest',
    },
    {
      label: 'Highest rated repositories',
      value: 'highest',
    },
    {
      label: 'Lowest rated repositories',
      value: 'lowest',
    },
  ];

  return (
    <Picker
      style={styles.container}
      prompt={'Select an item...'}
      selectedValue={order}
      onValueChange={(itemValue, itemIndex) => setOrder(itemValue)}
    >
      {picker.map((p) => (
        <Picker.Item key={p.label} label={p.label} value={p.value} />
      ))}
    </Picker>
  );
};

export default SortPicker;
