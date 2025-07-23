

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Platform.OS === 'ios' ? '#e0e7ff' : '#dbeafe',
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  iconCircle: {
    backgroundColor: '#e0e7ff',
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8fafc',
    fontSize: 16,
    marginBottom: 16,
    color: '#222',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 6,
  },
  rememberMeText: {
    color: '#222',
    fontSize: 14,
  },
  forgotText: {
    color: '#2563eb',
    fontWeight: '500',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 1,
  },
  demoBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 16,
    marginTop: 8,
    width: '100%',
  },
  demoTitle: {
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
    fontSize: 15,
  },
  demoText: {
    color: '#64748b',
    fontSize: 14,
  },
});


function LoginScreen({ navigation }) {
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
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Icon name="lock" size={32} color="#3b82f6" style={{ position: 'absolute', right:18, top: 18 }} />
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
              <Icon name={rememberMe ? "check-square" : "square"} size={20} color="#2563eb" />
            </TouchableOpacity>
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <View style={styles.buttonContent}>
            <Icon name="user" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Sign In</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>Demo Credentials:</Text>
          <Text style={styles.demoText}>Username: admin</Text>
          <Text style={styles.demoText}>Password: admin</Text>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;

