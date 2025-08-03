// Risk color mapping
const riskColors = {
  High: '#ad0c0c',
  Medium: '#e3b707',
  Low: '#0b9c40',
};

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Image } from 'react-native';
import apiService, { ApiProject, ProjectCardColor } from '../services/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingTop: 24,
  },
  summaryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  summaryCount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  title: {
    fontSize: 31,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 19,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    marginHorizontal: 2,
  },
  statusCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statusCount: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statusDesc: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    justifyContent: 'flex-start',
  },
  filterLabel: {
    fontSize: 13,
    color: '#64748b',
    marginRight: 8,
    alignSelf: 'center',
  },
  // Pills filter styles
  filterPillsScroll: {
    paddingRight: 12,
    paddingLeft: 0,
    minHeight: 56,
    alignItems: 'center',
  },
  filterPillsRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 30,
    padding: 2,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    minHeight: 48,
    justifyContent: 'flex-start',
    gap: 2,
  },
  filterPill: {
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 10,
    minWidth: 70,
    marginHorizontal: 2,
    marginVertical: 0,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
    overflow: 'hidden', // For gradient
  },
  filterPillText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#2563eb',
    textAlign: 'center',
  },
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 0,
  },
  projectCard: {
    flexBasis: '48%',
    aspectRatio: 1,
    borderRadius: 80,
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 4,
    borderColor: '#f3f4f6',
    overflow: 'hidden',
  },
  projectCircle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  projectName: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 12,
    zIndex: 1,
  },
  riskLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 6,
    alignSelf: 'center',
    marginTop: 8,
    zIndex: 1,
  },
  projectIcon: {
    marginBottom: 10,
    zIndex: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionAccent: {
    width: 4,
    height: 24,
    backgroundColor: '#2563eb',
    borderRadius: 2,
    marginRight: 8,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  sectionUnderline: {
    height: 1,
    backgroundColor: '#e0e7ff',
    marginBottom: 22,
  },
  statusCardsContainer: {
    flexDirection: 'column',
    gap: 1,
    marginBottom: 15,
    alignItems: 'stretch', // Stretch cards horizontally
  },
  statusCardMobile: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    padding: 20,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  statusCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 2,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    minWidth: 320,
    maxWidth: 370,
    alignSelf: 'center',
    position: 'relative',
  },
  statusCardLeftIconWrap: {
    marginRight: 18,
    marginLeft: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusCardLeftCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 0,
  },
  statusCardTextCol: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 0,
  },
  statusCardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  statusCardTitleExactLeft: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'left',
    marginBottom: 0,
    marginTop: 0,
  },
  statusCardCountExactLeft: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#c90404',
    textAlign: 'left',
    marginBottom: 0,
  },
  statusCardDescExactLeft: {
    fontSize: 13,
    textAlign: 'left',
    marginTop: 2,
    marginBottom: 0,
    fontWeight: '500',
  },
  statusCardDotWrap: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 2,
  },
  statusCardDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statusCardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 2,
    marginTop: 2,
  },
  statusCardCount: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
  },
  statusCardDesc: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 2,
  },
  underline: {
    height: 4,
    width: 80,
    backgroundColor: '#6366f1',
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: 13,
  },
  divider: {
    height: 2,
    backgroundColor: '#e5e7eb',
    marginVertical: 5,
    borderRadius: 1,
    marginBottom: 22,
  },
  projectsHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 9,
    marginLeft: 2,
  },
  // New styles for horizontal summary cards
  statusCardsScroll: {
    marginBottom: 18,
  },
  statusCardsRow: {
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 2,
  },
  statusCardExact: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 2,
    paddingVertical: 9, // Reduce height
    paddingHorizontal: 4,
    minWidth: 340,
    maxWidth: 360,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    position: 'relative',
  },
  statusIconCircleExact: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statusCardTitleExact: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 2,
    marginTop: 2,
  },
  statusCardCountExact: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
    textAlign: 'center',
  },
  statusCardDescExact: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 2,
    fontWeight: '500',
  },
});



import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
type RootStackParamList = {
  ProjectDashboard: { projectId: number };
  Profile: undefined;
};

interface MainDashboardProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export default function MainDashboard({ navigation }: MainDashboardProps) {
  const [filter, setFilter] = useState('All');
  const [isNight, setIsNight] = useState(false);
  const [bgAnim, setBgAnim] = useState(new (require('react-native')).Animated.Value(0));
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectColors, setProjectColors] = useState<Record<number, ProjectCardColor>>({});

  // Helper function to parse Tailwind CSS color classes
  const parseTailwindColor = (tailwindClass: string): string => {
    if (tailwindClass.includes('yellow')) return '#facc15';
    if (tailwindClass.includes('red')) return '#ef4444';
    if (tailwindClass.includes('green')) return '#22c55e';
    if (tailwindClass.includes('blue')) return '#3b82f6';
    if (tailwindClass.includes('purple')) return '#8b5cf6';
    if (tailwindClass.includes('orange')) return '#f97316';
    return '#facc15'; // Default to yellow
  };

  // Helper function to get primary risk level from availableRiskLevels
  const getPrimaryRiskLevel = (availableRiskLevels: string[], fallbackRisk: string): string => {
    if (availableRiskLevels.length === 0) return fallbackRisk;
    // Priority: High > Medium > Low
    if (availableRiskLevels.includes('High')) return 'High';
    if (availableRiskLevels.includes('Medium')) return 'Medium';
    if (availableRiskLevels.includes('Low')) return 'Low';
    return fallbackRisk;
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProjects();
      setProjects(data);
      
      // Fetch colors for each project
      const colorsMap: Record<number, ProjectCardColor> = {};
      for (const project of data) {
        try {
          const colorData = await apiService.getProjectCardColor(project.id);
          colorsMap[project.id] = colorData;
        } catch (err) {
          console.error(`Error fetching color for project ${project.id}:`, err);
          // Use default color if API fails
          colorsMap[project.id] = {
            projectId: project.id,
            projectName: project.name,
            availableRiskLevels: [project.risk || 'Medium'],
            projectCardColor: 'bg-gradient-to-r from-yellow-400 to-yellow-500'
          };
        }
      }
      setProjectColors(colorsMap);
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      if (err.message.includes('403')) {
        setError('Access denied. Please check API authentication.');
      } else {
        setError('Failed to fetch projects');
      }
      Alert.alert('Error', 'Failed to fetch projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    const interval = setInterval(fetchProjects, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const highCount = projects.filter(p => {
    const projectColor = projectColors[p.id];
    return getPrimaryRiskLevel(projectColor?.availableRiskLevels || [], p.risk || 'Medium') === 'High';
  }).length;
  const mediumCount = projects.filter(p => {
    const projectColor = projectColors[p.id];
    return getPrimaryRiskLevel(projectColor?.availableRiskLevels || [], p.risk || 'Medium') === 'Medium';
  }).length;
  const lowCount = projects.filter(p => {
    const projectColor = projectColors[p.id];
    return getPrimaryRiskLevel(projectColor?.availableRiskLevels || [], p.risk || 'Medium') === 'Low';
  }).length;

  // Sort projects by risk order: High, Medium, Low
  const riskOrder: Record<'High' | 'Medium' | 'Low', number> = { High: 0, Medium: 1, Low: 2 };
  const filteredProjects =
    filter === 'All'
      ? [...projects].sort((a, b) => {
          const aRisk = getPrimaryRiskLevel(projectColors[a.id]?.availableRiskLevels || [], a.risk || 'Medium');
          const bRisk = getPrimaryRiskLevel(projectColors[b.id]?.availableRiskLevels || [], b.risk || 'Medium');
          return riskOrder[aRisk as 'High' | 'Medium' | 'Low'] - riskOrder[bRisk as 'High' | 'Medium' | 'Low'];
        })
      : projects.filter(p => {
          const projectRisk = getPrimaryRiskLevel(projectColors[p.id]?.availableRiskLevels || [], p.risk || 'Medium');
          return projectRisk === filter;
        });

  const filterPills = [
    { key: 'All', label: 'All Projects', color: '#1B3C53' },
    { key: 'High', label: 'High Risk', color: riskColors.High },
    { key: 'Medium', label: 'Medium Risk', color: riskColors.Medium },
    { key: 'Low', label: 'Low Risk', color: riskColors.Low }
  ];

  const renderFilterPills = filterPills.map(({ key, label, color }) => {
    const isActive = filter === key;
    // Special style for 'All Projects' pill when active
    if (key === 'All' && isActive) {
      return (
        <View key={key} style={{ borderRadius: 18, marginHorizontal: 2, minWidth: 70, overflow: 'hidden' }}>
          <TouchableOpacity
            style={[styles.filterPill, {
              backgroundColor: undefined,
              borderColor: '#1B3C53',
              shadowColor: '#1B3C53',
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 4,
            }]}
            onPress={() => setFilter(key)}
            activeOpacity={0.85}
          >
            <View style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              borderRadius: 18,
              backgroundColor: undefined,
              zIndex: -1,
            }}>
              {/* Simulate gradient with two overlapping Views */}
              <View style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                borderRadius: 18,
                backgroundColor: '#2563eb',
                opacity: 0.85,
              }} />
              <View style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                borderRadius: 18,
                backgroundColor: '#365e7a',
                opacity: 0.65,
              }} />
            </View>
            <Text style={[styles.filterPillText, { color: '#fff' }]}> 
              {label}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <TouchableOpacity
        key={key}
        style={[styles.filterPill, { borderColor: color }, isActive ? { backgroundColor: color, shadowColor: color, shadowOpacity: 0.12, shadowRadius: 8, elevation: 2 } : null]}
        onPress={() => setFilter(key)}
        activeOpacity={0.85}
      >
        <Text style={[styles.filterPillText, isActive ? { color: '#fff' } : { color }]}> 
          {label}
        </Text>
      </TouchableOpacity>
    );
  });

  // Animate background color on toggle
  React.useEffect(() => {
    require('react-native').Animated.timing(bgAnim, {
      toValue: isNight ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isNight]);

  const bgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ebf3faff', '#101624'],
  });
  const headerColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1B3C53', '#181e2b'],
  });
  const cardColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#232a3a'],
  });

  if (loading && projects.length === 0) {
    return (
      <Animated.View style={{ flex: 1, backgroundColor: bgColor }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: isNight ? '#e0e7ff' : '#222' }}>Loading projects...</Text>
        </View>
      </Animated.View>
    );
  }

  if (error) {
    return (
      <Animated.View style={{ flex: 1, backgroundColor: bgColor }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#ef4444' }}>{error}</Text>
          <TouchableOpacity 
            style={{ marginTop: 16, padding: 12, backgroundColor: '#2563eb', borderRadius: 8 }}
            onPress={() => fetchProjects()}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Retry</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={{ flex: 1, backgroundColor: bgColor }}>
      {/* Blue gradient header with logo at top left and user image at right */}
      <Animated.View style={{ height: 180, width: '100%', backgroundColor: headerColor, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, overflow: 'hidden', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        {/* Logo at top left */}
        <View style={{ position: 'absolute', top: 18, left: 15, zIndex: 2, flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../assets/logo.png')} style={{ width: 44, height: 44 }} resizeMode="contain" />
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600', top:-4, right:5}}> Defect Tracker </Text>
        </View>
        {/* Top right icons row */}
        <View style={{ position: 'absolute', top: 18, right: 18, zIndex: 2, flexDirection: 'row', alignItems: 'center' }}>
          {/* Notification icon */}
          <TouchableOpacity style={{ marginRight: -46 , bottom:2 }} activeOpacity={0.7}>
            <Icon name="bell" size={18} color="#fff" />
          </TouchableOpacity>
          {/* Day/Night toggle icon (sun/moon) */}
          <TouchableOpacity style={{ marginRight: -7, bottom: 3 }} activeOpacity={0.7} onPress={() => setIsNight(n => !n)}>
            <Icon name={isNight ? "moon" : "sun"} size={18} color="#fff" />
          </TouchableOpacity>
          {/* User image */}
          <TouchableOpacity
            style={{ width: 48, height: 48, borderRadius: 22, overflow: 'hidden', borderWidth: 2, borderColor: '#fff', backgroundColor: '#e5e7eb', justifyContent: 'center', alignItems: 'center', top:58 , right:27 }}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image source={require('../assets/user.jpg')} style={{ width: 50, height: 50, borderRadius: 22 }} />
          </TouchableOpacity>
        </View>
        {/* Greeting row (below logo, left-aligned) */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22, paddingTop: 75, paddingBottom: 18, width: '100%' }}>
          <View style={{ flex: 1, marginLeft: 23 }}>
            <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600', marginBottom: 2 }}>Hello Zayan,</Text>
            <Text style={{ color: isNight ? '#cbd5e1' : '#fff', fontSize: 14, fontWeight: '300', marginTop: 2 }}>Check defect updates!</Text>
          </View>
        </View>
      </Animated.View>
    
      {/* Main content overlay card */}
      <ScrollView style={{ flex: 1, marginTop: 150 }} contentContainerStyle={{ paddingBottom: 32 }}>
        <Animated.View style={{ backgroundColor: cardColor, borderRadius: 24, marginHorizontal: 12, padding: 18, shadowColor: isNight ? '#181e2b' : '#2563eb', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.10, shadowRadius: 16, elevation: 8 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: isNight ? '#e0e7ff' : '#1B3C53', textAlign: 'center', marginBottom: 4 }}>Dashboard Overview</Text>
          
          <View style={{ height: 4, width: 80, backgroundColor: '#6366f1', alignSelf: 'center', borderRadius: 2, marginBottom: 13 }} />
          <Text style={{ fontSize: 15, color: isNight ? '#94a3b8' : '#64748b', textAlign: 'center', marginBottom: 19 }}>
            Gain insights into your projects with real-time health metrics and status summaries
          </Text>
          {/* Section Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: isNight ? '#e0e7ff' : '#222' }}>Project Status Insights</Text>
          </View>
          <View style={{ height: 1, backgroundColor: '#e0e7ff', marginBottom: 22 }} />
          {/* Summary Cards - Horizontal Row, icon at left, text at right, count between title and subtitle, dot at top right */}
          <View style={styles.statusCardsContainer}>
            {/* High Risk Card */}
            <View style={[styles.statusCardRow, { borderColor: riskColors.High }]}> 
              <View style={styles.statusCardDotWrap}>
                <View style={[styles.statusCardDot, { backgroundColor: riskColors.High }]} />
              </View>
              <View style={styles.statusCardLeftIconWrap}>
                <View style={[styles.statusCardLeftCircle, { backgroundColor: riskColors.High }]}> 
                  <Icon name="alert-circle" size={32} color="#fff" />
                </View>
              </View>
              <View style={styles.statusCardTextCol}>
                <Text style={styles.statusCardTitleExactLeft}>High Risk Projects</Text>
                <Text style={[styles.statusCardCountExactLeft, { color: riskColors.High }]}>{highCount}</Text>
                <Text style={[styles.statusCardDescExactLeft, { color: riskColors.High }]}>Immediate attention required</Text>
              </View>
            </View>
            {/* Medium Risk Card */}
            <View style={[styles.statusCardRow, { borderColor: riskColors.Medium }]}> 
              <View style={styles.statusCardDotWrap}>
                <View style={[styles.statusCardDot, { backgroundColor: riskColors.Medium }]} />
              </View>
              <View style={styles.statusCardLeftIconWrap}>
                <View style={[styles.statusCardLeftCircle, { backgroundColor: riskColors.Medium }]}> 
                  <Icon name="clock" size={32} color="#fff" />
                </View>
              </View>
              <View style={styles.statusCardTextCol}>
                <Text style={styles.statusCardTitleExactLeft}>Medium Risk Projects</Text>
                <Text style={[styles.statusCardCountExactLeft, { color: riskColors.Medium }]}>{mediumCount}</Text>
                <Text style={[styles.statusCardDescExactLeft, { color: riskColors.Medium }]}>Monitor progress closely</Text>
              </View>
            </View>
            {/* Low Risk Card */}
            <View style={[styles.statusCardRow, { borderColor: riskColors.Low }]}> 
              <View style={styles.statusCardDotWrap}>
                <View style={[styles.statusCardDot, { backgroundColor: riskColors.Low }]} />
              </View>
              <View style={styles.statusCardLeftIconWrap}>
                <View style={[styles.statusCardLeftCircle, { backgroundColor: riskColors.Low }]}> 
                  <Icon name="check-circle" size={32} color="#fff" />
                </View>
              </View>
              <View style={styles.statusCardTextCol}>
                <Text style={styles.statusCardTitleExactLeft}>Low Risk Projects</Text>
                <Text style={[styles.statusCardCountExactLeft, { color: riskColors.Low }]}>{lowCount}</Text>
                <Text style={[styles.statusCardDescExactLeft, { color: riskColors.Low }]}>Stable and on track</Text>
              </View>
            </View>
          </View>
          {/* Divider */}
          <View style={styles.divider} />
          {/* All Projects Header */}
          <Text style={[styles.projectsHeader, { color: isNight ? '#e0e7ff' : '#222' }]}>All Projects</Text>
          <View style={styles.filterRow}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterPillsScroll}
            >
              <View style={styles.filterPillsRow}>
                {renderFilterPills}
              </View>
            </ScrollView>
          </View>
          {/* Projects Grid */}
          <View style={styles.projectsGrid}>
            {filteredProjects.length === 0 ? (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
                <Icon name="folder" size={48} color={isNight ? '#64748b' : '#94a3b8'} />
                <Text style={{ fontSize: 16, color: isNight ? '#e0e7ff' : '#64748b', marginTop: 12, textAlign: 'center' }}>
                  {projects.length === 0 ? 'No projects available' : 'No projects match the selected filter'}
                </Text>
              </View>
            ) : (
              filteredProjects.map(project => {
                // Get color from API or use default
                const projectColor = projectColors[project.id];
                const baseColor = parseTailwindColor(projectColor?.projectCardColor || 'bg-gradient-to-r from-yellow-400 to-yellow-500');
                const riskLevel = getPrimaryRiskLevel(projectColor?.availableRiskLevels || [], project.risk || 'Medium');
                
                // Create gradient colors based on API color
                let gradientColors;
                if (riskLevel === 'High') {
                  gradientColors = [baseColor, '#b71c1c'];
                } else if (riskLevel === 'Low') {
                  gradientColors = [baseColor, '#038c35'];
                } else {
                  gradientColors = [baseColor, '#facc15'];
                }
                
                return (
                  <TouchableOpacity
                    key={project.id}
                    style={styles.projectCard}
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate('ProjectDashboard', { projectId: project.id })}
                  >
                    {/* Gradient background */}
                    <View style={[styles.projectCircle, {
                      backgroundColor: gradientColors[0],
                    }]} />
                    <View style={[styles.projectCircle, {
                      backgroundColor: gradientColors[1],
                      opacity: 0.7,
                      position: 'absolute',
                      left: 0,
                      top: 0,
                    }]} />
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                      <Icon name="check-circle" size={20} color="#fff" style={styles.projectIcon} />
                      <Text style={styles.projectName}>{project.name}</Text>
                      <View style={styles.riskLabel}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 10 }}>{riskLevel} Risk</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </Animated.View>
      </ScrollView>
    </Animated.View>
  );
}

