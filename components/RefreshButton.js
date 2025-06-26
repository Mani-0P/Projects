import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

const RefreshButton = ({ onRefresh }) => (
  <View style={styles.container}>
    <Button title="Refresh" onPress={onRefresh} />
  </View>
);
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
export default RefreshButton;
