import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/HomeScreen';
import StatusScreen from '../components/StatusScreen';
import IssuesScreen from '../components/IssuesScreen';
import { Ionicons } from '@expo/vector-icons';
import ReassignLockScreen from '../components/ReassignLockScreen';


const Tab = createBottomTabNavigator();

export default function TabNavigator({ route }) {
  const logs = route?.params?.logs || [];
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        initialParams={{ logs }}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Status" 
        component={StatusScreen}
        initialParams={{ logs }}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="lock-closed-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Issues" 
        component={IssuesScreen}
        initialParams={{ logs }}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="alert-circle-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
  name="Reassign"
  component={ReassignLockScreen}
  options={{
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="person-add-outline" color={color} size={size} />
    )
  }}
/>

    </Tab.Navigator>
  );
}
