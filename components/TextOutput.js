import React from 'react';
import { TextInput, StyleSheet, ActivityIndicator } from 'react-native';
const TextOutput = ({ loading, translatedText }) =>
  loading ? (
    <ActivityIndicator style={{ marginTop: 20 }} />
  ) : (
    <TextInput
      style={styles.output}
      multiline
      editable={false}
      value={translatedText}
    />
  );
const styles = StyleSheet.create({
  output: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    marginTop: 20,
    backgroundColor: '#f0f0f0',
  },
});
export default TextOutput;
