import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputError: {
    borderColor: '#d73a4a',
  },
  input: {
    borderColor: '#d2d2cf',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 10,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.input, error && styles.inputError];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
