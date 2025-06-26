import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Passwordin from '../components/Passwordin';
import Footer from '../components/Footer';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || password !== confirmPassword) {
      alert('Please fill all fields correctly');
      return;
    }

    await AsyncStorage.setItem('user', JSON.stringify({ email, password }));
    navigation.replace('MainApp');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
      <Text style={styles.title}>Create new account</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Username or Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#555"
        />

        <Text style={styles.label}>Password</Text>
        <Passwordin
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          show={showPassword}
          setShow={setShowPassword}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <Passwordin
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          show={showPassword}
          setShow={setShowPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <Text style={styles.textCenter}>
          Already have account?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Sign in</Text>
        </Text>
      </View>
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  logo: { width: 80, height: 80, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  form: { width: '80%', padding: 20, backgroundColor: '#fff', borderRadius: 10, elevation: 5 },
  label: { marginBottom: 5, fontWeight: 'bold' },
  input: {
    backgroundColor: '#d3d3d3',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#000'
  },
  linkRight: { textAlign: 'right', color: 'gray', marginBottom: 20 },
  button: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  buttonOutline: {
    borderColor: '#000',
    borderWidth: 2,
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  textCenter: { textAlign: 'center', marginVertical: 10 },
});
export default SignUpScreen;
