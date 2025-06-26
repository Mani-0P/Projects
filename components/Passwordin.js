// components/Passwordin.js
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Passwordin = ({ value, onChangeText, placeholder, show, setShow }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!show}
        placeholderTextColor="#555"
        style={styles.input}
      />
      <TouchableOpacity onPress={() => setShow(prev => !prev)}>
        <Ionicons name={show ? 'eye-off' : 'eye'} size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    color: '#000',
    paddingVertical: 10,
  },
});

export default Passwordin;
