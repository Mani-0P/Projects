import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>@copyright Abdul Rehman Yaqoob</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  footerText: {
    color: 'black',
    fontSize: 13,
  },
});

export default Footer;
