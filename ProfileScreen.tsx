import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ProfileScreen = () => {
  // For navigation, use the useNavigation hook
  // @ts-ignore
  const navigation = (typeof useNavigation !== 'undefined') ? useNavigation() : null;
  // Night mode state and animation
  const [isNight, setIsNight] = useState(false);
  const bgAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: isNight ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isNight]);
  const bgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1B3C53', '#101624'],
  });
  const cardColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#232a3a'],
  });
  const textColor = isNight ? '#222' : '#1B3C53';
  const labelColor = isNight ? '#60a5fa' : '#365e7a'; 
  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}> 
      {/* Header with logo, project name, notification, toggle */}
      <Animated.View style={[styles.header, { backgroundColor: isNight ? '#181e2b' : '#1B3C53' }]}> 
        <View style={styles.headerLeft}>
          <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.projectName}>Defect Tracker</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={{ marginRight: 18 }} activeOpacity={0.7}>
            <Icon name="bell" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsNight(n => !n)} activeOpacity={0.7}>
            <Icon name={isNight ? "moon" : "sun"} size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View style={[styles.profileCard, { backgroundColor: cardColor }]}> 
        <Image source={require('./assets/user.jpg')} style={styles.avatar} />
        <Text style={[styles.name, { color: textColor }]}>John Doe</Text>
        <Text style={styles.email}>john.doe@email.com</Text>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: labelColor }]}>Role:</Text>
          <Text style={[styles.value, { color: textColor }]}>QA Engineer</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: labelColor }]}>Joined:</Text>
          <Text style={[styles.value, { color: textColor }]}>Jan 2023</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: labelColor }]}>Team:</Text>
          <Text style={[styles.value, { color: textColor }]}>Defect Trackers</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: labelColor }]}>Experience:</Text>
          <Text style={[styles.value, { color: textColor }]}>Three Years</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.8}
          onPress={() => navigation && navigation.navigate('Login')}
        >
          <Icon name="log-out" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#1B3C53',
    paddingHorizontal: 0,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 38,
    paddingBottom: 18,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 44,
    height: 44,
    marginRight: 8,
  },
  projectName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
    top: -2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileCard: {
    borderRadius: 28,
    paddingHorizontal: 28,
    paddingVertical: 32,
    alignItems: 'center',
    width: '90%',
    maxWidth: 380,
    alignSelf: 'center',
    marginTop: 12,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 18,
    borderWidth: 4,
    borderColor: '#1B3C53',
    backgroundColor: '#e5e7eb',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B3C53',
    marginBottom: 4,
    letterSpacing: 1.1,
  },
  email: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 18,
    letterSpacing: 0.2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    width: '100%',
    maxWidth: 320,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 15,
    color: '#365e7a',
    fontWeight: '600',
    marginRight: 8,
    width: 80,
  },
  value: {
    fontSize: 15,
    color: '#1B3C53',
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B3C53',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginTop: 28,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default ProfileScreen;
