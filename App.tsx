
// import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import MainDashboard from './MainDashboard';
import ProjectDashboard from './ProjectDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainDashboard" component={MainDashboard} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="ProjectDashboard" component={ProjectDashboard} options={{ title: 'Project Dashboard' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
