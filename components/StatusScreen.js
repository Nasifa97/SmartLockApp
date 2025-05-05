import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { LogsContext } from './LogsContext'; // ✅ correct path

const StatusScreen = ({ navigation }) => {
  const { logs } = useContext(LogsContext); // ✅ Using global logs context

  const currentLog = logs[0];
  const previousLogs = logs.slice(1);

  const getIcon = (item) => {
    if (item.error) return '❗️';
    return item.action === 'Locked' ? '🔒' : '🔓';
  };

  const getErrorMessage = (item) => {
    if (!item.error) return null;
    if (item.action === 'Locked') return 'Door failed to lock — motor may be stuck.';
    if (item.action === 'Unlocked') return 'Unlock failed — door might be jammed.';
    return 'Unknown error occurred.';
  };

  const renderItem = ({ item }) => {
    const errorMessage = getErrorMessage(item);
    const content = `${item.time} — ${item.action} ${getIcon(item)}`;

    return (
      <View style={styles.logItem}>
        <Text style={styles.logDot}>🔷</Text>
        {item.error ? (
          <TouchableOpacity onPress={() => navigation.navigate('ErrorDetails', { errorMessage })}>
            <Text style={[styles.logText, styles.errorText]}>{content}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.logText}>{content}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Door Activity Log</Text>

      {currentLog && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current</Text>
          <View style={styles.logItem}>
            <Text style={styles.logDot}>🔷</Text>
            {currentLog.error ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ErrorDetails', {
                    errorMessage: getErrorMessage(currentLog),
                  })
                }
              >
                <Text style={[styles.logText, styles.errorText]}>
                  {currentLog.time} — {currentLog.action} {getIcon(currentLog)}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.logText}>
                {currentLog.time} — {currentLog.action} {getIcon(currentLog)}
              </Text>
            )}
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Previous</Text>
        <FlatList
          data={previousLogs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default StatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logDot: {
    marginRight: 8,
  },
  logText: {
    fontSize: 16,
  },
  errorText: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
});
