import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

export default function ForgotPasswordScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = () => {
    if (!email) return;
    setSubmitted(true);
    // Here you would trigger your password reset logic
  };

  return (
    <View style={styles.container}>
      <View style={styles.topArtWrap}>
        <Animated.Image
          source={require('./assets/forgot.png')}
          style={[
            styles.artImage,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your email address and we'll send you a link to reset your password.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#94a3b8"
        editable={!submitted}
      />
      <TouchableOpacity
        style={[styles.loginBtn, { backgroundColor: email ? '#0256c4' : '#1B3C53', borderColor: '#ffffff', borderWidth:2}]}
        onPress={handleSubmit}
        disabled={!email || submitted}
      >
        <Text style={styles.loginBtnText}>{submitted ? 'Link Sent!' : 'SEND RESET LINK'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B3C53',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  topArtWrap: {
    marginTop: -50,
    marginBottom: -10,
    alignItems: 'center',
  },
  artImage: {
    width: width * 0.8,
    height: 280,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 1.1,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e7ff',
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 22,
  },
  input: {
    width: '68%',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#232B5D',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderWidth: 0,
    textAlign: 'center',
  },
  loginBtn: {
    width: '68%',
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1.1,
  },
  backText: {
    color: '#edf3f5ff',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
    textDecorationColor: '#edf3f5ff',
    textDecorationLine: 'underline',
  },
});
