
// import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import MainDashboard from './MainDashboard';
import ProjectDashboard from './ProjectDashboard';
import LandingScreen from './LandingScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

// Placeholder SignUp screen
function SignUpScreen() {
  return (
    <></>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Forgot Password', headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="MainDashboard" component={MainDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="ProjectDashboard" component={ProjectDashboard} options={{ headerShown: false  }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={ {title: 'Profile', headerShown: false} } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
