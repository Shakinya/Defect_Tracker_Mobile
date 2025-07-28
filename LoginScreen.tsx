

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B3C53',
    paddingHorizontal: 16,
  },
  topArtWrap: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 4,
  },
  artImage: {
    width: 350,
    height: 220,
    marginBottom: -6,
  },
  // card and iconCircle removed
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 7,
    letterSpacing: 1.1,
  },
  pageSubtitle: {
    fontSize: 15,
    color: '#ebeefa',
    textAlign: 'center',
    marginBottom: 19,
    lineHeight: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    color: '#ffffff',
    marginBottom: 4,
    alignSelf: 'flex-start',
    marginLeft: 37,
  },
  input: {
    width: '77%',
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#232B5D',
    marginBottom: 8,
    backgroundColor: '#fff',
    borderWidth: 0,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '77%',
    marginBottom: 18,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginLeft: 6,
    marginRight: 4,
  },
  rememberMeText: {
    color: '#ffffff',
    fontSize: 12,
  },
  forgotText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 12,
    textDecorationColor: '#ffffff',
    textDecorationLine: 'underline',
  },
  button: {
    width: '35%',
    backgroundColor: '#1B3C53',
    borderRadius: 16,
    borderColor: '#ffffff',
    borderWidth: 2,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 1,
  },
 
});


function LoginScreen({ navigation }) {
  // Animation setup
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }
    // Dummy authentication logic
    navigation.navigate('MainDashboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topArtWrap}>
        <Animated.Image
          source={require('./assets/login.png')}
          style={[
            styles.artImage,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.pageTitle}>DefectTracker Pro</Text>
      <Text style={styles.pageSubtitle}>Sign in to your account</Text>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        placeholderTextColor="#94a3b8"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#94a3b8"
      />
      <View style={styles.optionsRow}>
        <View style={styles.checkboxRow}>
          <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkbox}>
            <Icon name={rememberMe ? "check-square" : "square"} size={14} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.rememberMeText}>Remember Me</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Sign In</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;

