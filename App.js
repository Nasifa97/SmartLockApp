import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { LogsProvider } from './components/LogsContext'; // adjust path if needed
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Unlock error:',               // suppress unlock errors
  'Access denied to this lock',  // suppress permission errors
  'Device is offline',           // suppress ESP32 offline errors
]);


export default function App() {
  return (
    <NavigationContainer>
      <LogsProvider>
        <AppNavigator />
      </LogsProvider>
    </NavigationContainer>
  );
}
