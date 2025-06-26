import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const TextsInput = ({ inputText, setInputText }) => (
  <TextInput
    style={styles.input}
    multiline
    placeholder="Enter text to translate"
    value={inputText}
    onChangeText={setInputText}
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    marginBottom: 10,
  },
});

export default TextsInput;
