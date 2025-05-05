import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { LogsContext } from './LogsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const BASE_URL = 'http://172.20.10.2:8000';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isLocked, setIsLocked] = useState(true);
  const [loading, setLoading] = useState(false);
  const { addLog } = useContext(LogsContext);

  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };

  const handleLock = async () => {
    if (!isLocked) {
      const token = await getToken();
      try {
        setLoading(true);
        const response = await axios.post(`${BASE_URL}/api/lock?device_id=device-1`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsLocked(true);
        addLog('Locked');
        console.log('✅ Lock success:', response.data);
        Alert.alert('Success', 'Lock command sent successfully!');
      } catch (error) {
        console.error('❌ Lock error:', error.response?.data || error.message);
        addLog('Locked', 'Device failed to lock');
        const message = error.response?.data?.error || error.message;
        if (message.includes('Device is offline')) {
          Alert.alert('Offline', 'The device is offline. Please check your ESP32 or Wi-Fi connection.');
        } else {
          Alert.alert('Error', 'Failed to send lock command.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUnlock = async () => {
    if (isLocked) {
      const token = await getToken();
      try {
        setLoading(true);
        const response = await axios.post(`${BASE_URL}/api/unlock?device_id=device-1`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsLocked(false);
        addLog('Unlocked');
        console.log('✅ Unlock success:', response.data);
        Alert.alert('Success', 'Unlock command sent successfully!');
      } catch (error) {
        console.error('❌ Unlock error:', error.response?.data || error.message);
        addLog('Unlocked', 'Device failed to unlock');
        const message = error.response?.data?.error || error.message;
        if (message.includes('Device is offline')) {
          Alert.alert('Offline', 'The device is offline. Please check your ESP32 or Wi-Fi connection.');
        } else {
          Alert.alert('Error', 'Failed to send unlock command.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  const handleViewLogs = () => {
    navigation.navigate('Status');
  };

  return (
    <View style={styles.container}>
      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.statusText}>
        {isLocked ? '🔒 Door Locked' : '🔓 Door Unlocked'}
      </Text>

      <View style={[styles.iconCircle, { backgroundColor: isLocked ? '#007bff' : '#28a745' }]}>
        <Text style={styles.icon}>{isLocked ? '🔒' : '🔓'}</Text>
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#007bff" style={{ marginBottom: 20 }} />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007bff' }]}
          onPress={handleLock}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Lock</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#28a745' }]}
          onPress={handleUnlock}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Unlock</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.viewLogButton} onPress={handleViewLogs}>
        <Text style={styles.viewLogText}>View Status Logs</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoutContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    fontSize: 60,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewLogButton: {
    marginTop: 30,
  },
  viewLogText: {
    fontSize: 14,
    color: '#2e86de',
    fontWeight: '600',
  },
});
