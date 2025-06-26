import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Passwordin from '../components/Passwordin';
import Footer from '../components/Footer';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const data = await AsyncStorage.getItem('user');
    if (!data) return alert('No user found. Sign up first.');

    const { email: storedEmail, password: storedPassword } = JSON.parse(data);
    if (email === storedEmail && password === storedPassword) {
      navigation.replace('MainApp');
    } else {
      alert('Incorrect email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
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

        <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.linkRight}>Forget Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <Text style={styles.textCenter}>For new account</Text>
        <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  logo: { width: 80, height: 80, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  form: { width: '80%', padding: 20, backgroundColor: '#fff', borderRadius: 15, elevation: 5 },
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
    backgroundColor: '#000',
    borderWidth: 2,
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  textCenter: { textAlign: 'center', marginVertical: 10 }
});

export default LoginScreen;
