import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { LogsContext } from '../components/LogsContext';

const screenWidth = Dimensions.get('window').width;

const IssuesScreen = ({ navigation }) => {
  const { logs } = useContext(LogsContext);
  const errorLogs = logs.filter(log => log.error);
  const currentIssue = errorLogs[0];
  const pastIssues = errorLogs.slice(1);

  const getErrorMessage = (item) => {
    if (item.action === 'Locked') return 'Door failed to lock — motor may be stuck.';
    if (item.action === 'Unlocked') return 'Unlock failed — door might be jammed.';
    return 'Unknown smart lock issue.';
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ErrorDetails', { errorMessage: getErrorMessage(item) })}
      style={styles.cardWrapper}
    >
      <View style={styles.issueCard}>
        <Text style={styles.issueIcon}>❗️</Text>
        <View>
          <Text style={styles.issueText}>{getErrorMessage(item)}</Text>
          <Text style={styles.timestamp}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Ongoing Issue</Text>
        {currentIssue ? renderItem({ item: currentIssue }) : (
          <Text style={styles.empty}>No current issues</Text>
        )}

        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Past Issues</Text>
        <FlatList
          data={pastIssues}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.empty}>No past faults</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

export default IssuesScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f8f9fb',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  cardWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  issueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe6e6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    width: screenWidth * 0.92,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  issueIcon: {
    fontSize: 24,
    marginRight: 12,
    color: '#e74c3c',
  },
  issueText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  empty: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    paddingHorizontal: 10,
    marginTop: 5,
  },
});
