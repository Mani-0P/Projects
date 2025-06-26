import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Passwordin from '../components/Passwordin';

const ChangePasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = async () => {
    if (!email || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem('user');
      if (!userData) {
        Alert.alert('Error', 'No user found');
        return;
      }

      const user = JSON.parse(userData);
      if (email !== user.email) {
        Alert.alert('Error', 'Email verification failed');
        return;
      }

      user.password = newPassword;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      Alert.alert('Success', 'Password changed successfully');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <TextInput
        placeholder="Enter your registered email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Passwordin
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        show={showNewPassword}
        setShow={setShowNewPassword}
      />
      <Passwordin
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        show={showConfirmPassword}
        setShow={setShowConfirmPassword}
      />

      <Button title="Update Password" onPress={handlePasswordChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
});

export default ChangePasswordScreen;
