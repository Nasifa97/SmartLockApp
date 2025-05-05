import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'http://172.20.10.2:8000'; // ✅ your backend local IP

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });

      const token = response.data.token;
      await AsyncStorage.setItem('token', token);

      console.log('✅ Login successful!');

      // 👉 After login, register the device
      try {
        const registerResponse = await axios.post(`${BASE_URL}/locks/register`, 
          {
            device_id: 'device-1',
            name: 'My Smart Lock',
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log('✅ Lock registered successfully:', registerResponse.data);
      } catch (registerError) {
        if (registerError.response?.data?.error === "Device already registered") {
          console.log('ℹ️ Lock already registered. Continuing...');
        } else {
          console.error('❌ Lock registration failed:', registerError);
          Alert.alert('Warning', 'Login successful but failed to register lock.');
        }
      }

      // ✅ Navigate to main app screen
      navigation.navigate('MainTabs', { logs: [] });

    } catch (error) {
      console.error('❌ Login error:', error);
      Alert.alert('Login failed', 'Please check your credentials and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Lock Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signUpWrapper}>
        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <Text style={styles.linkText} onPress={() => navigation.navigate('SignUp')}>
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#2e86de',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpWrapper: {
    marginTop: 20,
  },
  signUpText: {
    color: '#555',
    fontSize: 14,
  },
  linkText: {
    color: '#2e86de',
    fontWeight: 'bold',
  },
});
