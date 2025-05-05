import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const ErrorDetailsScreen = ({ route }) => {
  const { errorMessage } = route.params || {};
  const message = errorMessage || 'An unknown error occurred with the lock.';

  const handleRetry = () => {
    // 🔁 Simulate retry logic
    Alert.alert('Retry Sent', 'The lock/unlock command has been retried.');
    // 👉 You can replace this with real logic later (MQTT or API)
  };

  return (
    <View style={styles.container}>
      <View style={styles.errorBox}>
        <Text style={styles.errorIcon}>❗️</Text>
        <Text style={styles.errorTitle}>Error!</Text>
        <Text style={styles.errorMessage}>{message}</Text>

        {/* 🔁 Retry Button */}
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ErrorDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorBox: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  errorIcon: {
    fontSize: 36,
    color: '#e74c3c',
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 6,
  },
  errorMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
