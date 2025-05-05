import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../components/LoginScreen';
import SignUpScreen from '../components/SignUpScreen';
import ErrorDetailsScreen from '../components/ErrorDetailsScreen';
import TabNavigator from './TabNavigator';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* Auth Screens */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      {/* Main App with Bottom Tabs */}
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }} // hides header inside tab nav
      />

      {/* Standalone screen accessible from Status or Issues */}
      <Stack.Screen
        name="ErrorDetails"
        component={ErrorDetailsScreen}
        options={{ title: 'ErrorDetails' }}
      />
    </Stack.Navigator>
  );
}
