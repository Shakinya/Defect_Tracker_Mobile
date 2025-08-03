import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

export default function LandingScreen({ navigation }) {
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

  return (
    <View style={styles.container}>
      <View style={styles.topArtWrap}>
        <Animated.Image
          source={require('../assets/image.png')} 
          style={[
            styles.artImage,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>Defect Tracker</Text>
      <Text style={styles.subtitle}> Struggling with defects?{"\n"}Streamline your QA process with us</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginBtnText}>GET STARTED </Text>
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
    marginTop: -12,
    marginBottom: 18,
    alignItems: 'center',
  },
  artImage: {
    width: width * 0.9,
    height: 240,
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 7,
    letterSpacing: 1.2,
    marginTop:-25,
  },
  subtitle: {
    fontSize: 15,
    color: '#e0e7ff',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  loginBtn: {
    width: '48%',
    backgroundColor: '#1B3C53',
    borderColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 9,
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
    fontSize: 17,
    letterSpacing: 1.1,
  },
});
