import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Change your password</Text>
        <Button title="Change Password" onPress={() => navigation.navigate('ChangePassword')} />
      </View>

      <View style={styles.section}>
        <Button title="Log Out" color="red" onPress={() => navigation.replace('Login')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 45, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 25 },
  section: { marginBottom: 30 },
  label: { fontSize: 16, marginBottom: 10 }
});

export default SettingsScreen;
