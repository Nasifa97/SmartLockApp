import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReassignLockScreen = () => {
  const [deviceId, setDeviceId] = useState('');
  const [newOwner, setNewOwner] = useState('');

  const handleReassign = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put(
        `http://172.20.10.2:8000/locks/${deviceId}/reassign?new_owner=${newOwner}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      Alert.alert('Success', response.data.message);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Device ID:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter device ID"
        value={deviceId}
        onChangeText={setDeviceId}
      />

      <Text style={styles.label}>New Owner Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new owner's username"
        value={newOwner}
        onChangeText={setNewOwner}
      />

      <Button title="Reassign Lock" onPress={handleReassign} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center', // vertical centering
    alignItems: 'center',     // horizontal centering
    padding: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default ReassignLockScreen;
