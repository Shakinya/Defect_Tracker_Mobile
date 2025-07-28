import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, FlatList, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Svg, Path, Circle, Text as SvgText, Polygon } from 'react-native-svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 10,
    paddingTop: 18,
  },
  backBtnWrap: {
    position: 'absolute',
    top: 18,
    right: 18,
    zIndex: 2,
  },
  backBtn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  projectSelectionWrap: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginBottom: 19,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  projectSelectionTitle: {
    fontSize: 15,
    color: '#222',
    marginBottom: 8,
    fontWeight: '600',
  },
  projectSelectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'nowrap',
    overflow: 'scroll',
  },
  projectPill: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginHorizontal: 2,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectPillActive: {
    backgroundColor: '#365e7a',
  },
  projectPillText: {
    fontSize: 13,
    color: '#222',
    fontWeight: '500',
  },
  projectPillTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  projectNameRow: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  projectName: {
    fontSize: 19,
    fontWeight: 600,
    color: '#222',
  },
  statusLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusLabel: {
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
    color: '#ad0c0c',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 4,
  },
  statusLabelMedium: {
    backgroundColor: '#fef9c3',
    color: '#e3b707',
  },
  statusLabelLow: {
    backgroundColor: '#dcfce7',
    color: '#0b9c40',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64748b',
    marginBottom: 11,
    marginLeft: 2,
  },
  defectCardsCol: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 12,
  },
  defectCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 2,
    padding: 11,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    minWidth: 100,
    maxWidth: 360,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderColor: '#ad0c0c',
  },
  defectCardMedium: {
    borderColor: '#e3b707',
  },
  defectCardLow: {
    borderColor: '#0b9c40',
  },
  defectCardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  defectCardTotal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
    alignSelf: 'flex-end',
  },
  defectTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 2,
    width: '100%',
  },
  defectTypeCol: {
    width: '53%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  defectTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  defectTypeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  defectTypeText: {
    fontSize: 13,
    color: '#222',
    fontWeight: '500',
    marginRight: 2,
  },
  defectTypeCount: {
    fontSize: 13,
    color: '#222',
    fontWeight: 'bold',
    marginRight: 6,
  },
  chartBtn: {
    backgroundColor: '#e1f0fa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  chartBtnText: {
    color: '#2e6387',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

// Dummy data for defects breakdown per project
const defectData: Record<number, ProjectDefectData> = {
  1: {
    name: 'Defect Tracker', risk: 'High',
    defects: {
      high: { total: 112, REOPEN: 3, NEW: 50, OPEN: 5, FIXED: 14, CLOSED: 37, REJECT: 0, DUPLICATE: 3 },
      medium: { total: 237, REOPEN: 5, NEW: 126, OPEN: 10, FIXED: 33, CLOSED: 60, REJECT: 0, DUPLICATE: 1 },
      low: { total: 96, REOPEN: 1, NEW: 57, OPEN: 0, FIXED: 10, CLOSED: 24, REJECT: 0, DUPLICATE: 3 },
    }
  },
  2: {
    name: 'QA testing', risk: 'High',
    defects: {
      high: { total: 80, REOPEN: 2, NEW: 40, OPEN: 3, FIXED: 10, CLOSED: 20, REJECT: 1, DUPLICATE: 4 },
      medium: { total: 120, REOPEN: 3, NEW: 60, OPEN: 5, FIXED: 20, CLOSED: 30, REJECT: 2, DUPLICATE: 0 },
      low: { total: 60, REOPEN: 1, NEW: 30, OPEN: 2, FIXED: 7, CLOSED: 15, REJECT: 0, DUPLICATE: 5 },
    }
  },
  3: {
    name: 'project 1', risk: 'Low',
    defects: {
      high: { total: 10, REOPEN: 0, NEW: 2, OPEN: 1, FIXED: 2, CLOSED: 5, REJECT: 0, DUPLICATE: 0 },
      medium: { total: 20, REOPEN: 1, NEW: 5, OPEN: 2, FIXED: 4, CLOSED: 7, REJECT: 0, DUPLICATE: 1 },
      low: { total: 30, REOPEN: 0, NEW: 10, OPEN: 3, FIXED: 5, CLOSED: 10, REJECT: 0, DUPLICATE: 2 },
    }
  },
  // ...add more dummy data for other projects as needed
};

const riskColors = {
  High: '#ad0c0c',
  Medium: '#e3b707',
  Low: '#0b9c40',
};

const defectTypeColors = {
  REOPEN: '#ef4444',
  NEW: '#3b82f6',
  OPEN: '#eab308',
  FIXED: '#22c55e',
  CLOSED: '#22c55e',
  REJECT: '#222',
  DUPLICATE: '#6b7280',
};

const projectList = [
  { id: 1, name: 'Defect Tracker', risk: 'High' },
  { id: 2, name: 'QA testing', risk: 'High' },
  { id: 3, name: 'project 1', risk: 'Low' },
  { id: 4, name: 'Heart', risk: 'Low' },
  { id: 5, name: 'Dashboard testing', risk: 'High' },
  { id: 6, name: 'JALI', risk: 'Low' },
  { id: 7, name: 'Hello world', risk: 'Low' },
  { id: 8, name: 'dashboard test', risk: 'High' },
  { id: 9, name: 'test dashboard', risk: 'High' },
];

type DefectType = 'REOPEN' | 'NEW' | 'OPEN' | 'FIXED' | 'CLOSED' | 'REJECT' | 'DUPLICATE';
type RiskLevel = 'High' | 'Medium' | 'Low';
type DefectBreakdown = { total: number } & { [K in DefectType]: number };
type ProjectDefectData = {
  name: string;
  risk: RiskLevel;
  defects: {
    high: DefectBreakdown;
    medium: DefectBreakdown;
    low: DefectBreakdown;
  };
};
type DefectItem = { id: string; assigned: string; reporter: string; release: string };

type RootStackParamList = {
  ProjectDashboard: { projectId: number };
};

interface ProjectDashboardProps {
  route: RouteProp<RootStackParamList, 'ProjectDashboard'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProjectDashboard'>;
}

export default function ProjectDashboard({ route, navigation }: ProjectDashboardProps) {
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
  const { projectId: initialProjectId } = route.params;
  const [selectedProjectId, setSelectedProjectId] = useState<number>(initialProjectId);
  const project: ProjectDefectData = defectData[selectedProjectId] || defectData[1];

  // Modal states for defect charts
  const [highChartVisible, setHighChartVisible] = useState(false);
  const [mediumChartVisible, setMediumChartVisible] = useState(false);
  const [lowChartVisible, setLowChartVisible] = useState(false);

  // Pie chart data for High defects (status breakdown)
  const highStatusData = [
    { label: 'REOPEN', value: project.defects.high.REOPEN || 0, color: '#ff2d2d' },
    { label: 'NEW', value: project.defects.high.NEW || 0, color: '#3b3bfa' },
    { label: 'OPEN', value: project.defects.high.OPEN || 0, color: '#facc15' },
    { label: 'FIXED', value: project.defects.high.FIXED || 0, color: '#22c55e' },
    { label: 'CLOSED', value: project.defects.high.CLOSED || 0, color: '#15803d' },
    { label: 'REJECT', value: project.defects.high.REJECT || 0, color: '#7f1d1d' },
    { label: 'DUPLICATE', value: project.defects.high.DUPLICATE || 0, color: '#64748b' },
  ];
  const highTotal = highStatusData.reduce((sum, d) => sum + d.value, 0);
  let startAngle = 0;
  const pieSegmentsHigh = highStatusData.map((d, idx) => {
    if (d.value === 0) return null;
    const angle = (d.value / (highTotal || 1)) * 2 * Math.PI;
    const endAngle = startAngle + angle;
    const r = 70, cx = 110, cy = 110;
    const x1 = cx + r * Math.cos(startAngle - Math.PI / 2);
    const y1 = cy + r * Math.sin(startAngle - Math.PI / 2);
    const x2 = cx + r * Math.cos(endAngle - Math.PI / 2);
    const y2 = cy + r * Math.sin(endAngle - Math.PI / 2);
    const largeArc = angle > Math.PI ? 1 : 0;
    const path = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;
    startAngle = endAngle;
    return (
      <Path key={d.label} d={path} fill={d.color} stroke="#fff" strokeWidth={2} />
    );
  });

  // Pie chart data for Medium defects
  const mediumStatusData = [
    { label: 'REOPEN', value: project.defects.medium.REOPEN || 0, color: '#ff2d2d' },
    { label: 'NEW', value: project.defects.medium.NEW || 0, color: '#3b3bfa' },
    { label: 'OPEN', value: project.defects.medium.OPEN || 0, color: '#facc15' },
    { label: 'FIXED', value: project.defects.medium.FIXED || 0, color: '#22c55e' },
    { label: 'CLOSED', value: project.defects.medium.CLOSED || 0, color: '#15803d' },
    { label: 'REJECT', value: project.defects.medium.REJECT || 0, color: '#7f1d1d' },
    { label: 'DUPLICATE', value: project.defects.medium.DUPLICATE || 0, color: '#64748b' },
  ];
  const mediumTotal = mediumStatusData.reduce((sum, d) => sum + d.value, 0);
  startAngle = 0;
  const pieSegmentsMedium = mediumStatusData.map((d, idx) => {
    if (d.value === 0) return null;
    const angle = (d.value / (mediumTotal || 1)) * 2 * Math.PI;
    const endAngle = startAngle + angle;
    const r = 70, cx = 110, cy = 110;
    const x1 = cx + r * Math.cos(startAngle - Math.PI / 2);
    const y1 = cy + r * Math.sin(startAngle - Math.PI / 2);
    const x2 = cx + r * Math.cos(endAngle - Math.PI / 2);
    const y2 = cy + r * Math.sin(endAngle - Math.PI / 2);
    const largeArc = angle > Math.PI ? 1 : 0;
    const path = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;
    startAngle = endAngle;
    return (
      <Path key={d.label} d={path} fill={d.color} stroke="#fff" strokeWidth={2} />
    );
  });

  // Pie chart data for Low defects
  const lowStatusData = [
    { label: 'REOPEN', value: project.defects.low.REOPEN || 0, color: '#ff2d2d' },
    { label: 'NEW', value: project.defects.low.NEW || 0, color: '#3b3bfa' },
    { label: 'OPEN', value: project.defects.low.OPEN || 0, color: '#facc15' },
    { label: 'FIXED', value: project.defects.low.FIXED || 0, color: '#22c55e' },
    { label: 'CLOSED', value: project.defects.low.CLOSED || 0, color: '#15803d' },
    { label: 'REJECT', value: project.defects.low.REJECT || 0, color: '#7f1d1d' },
    { label: 'DUPLICATE', value: project.defects.low.DUPLICATE || 0, color: '#64748b' },
  ];
  const lowTotal = lowStatusData.reduce((sum, d) => sum + d.value, 0);
  startAngle = 0;
  const pieSegmentsLow = lowStatusData.map((d, idx) => {
    if (d.value === 0) return null;
    const angle = (d.value / (lowTotal || 1)) * 2 * Math.PI;
    const endAngle = startAngle + angle;
    const r = 70, cx = 110, cy = 110;
    const x1 = cx + r * Math.cos(startAngle - Math.PI / 2);
    const y1 = cy + r * Math.sin(startAngle - Math.PI / 2);
    const x2 = cx + r * Math.cos(endAngle - Math.PI / 2);
    const y2 = cy + r * Math.sin(endAngle - Math.PI / 2);
    const largeArc = angle > Math.PI ? 1 : 0;
    const path = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;
    startAngle = endAngle;
    return (
      <Path key={d.label} d={path} fill={d.color} stroke="#fff" strokeWidth={2} />
    );
  });

  // Helper for status label style
  const getStatusLabelStyle = (risk: RiskLevel): any => {
    if (risk === 'High') return [styles.statusLabel, { backgroundColor: '#fee2e2', color: '#ad0c0c' }];
    if (risk === 'Medium') return [styles.statusLabel, styles.statusLabelMedium];
    if (risk === 'Low') return [styles.statusLabel, styles.statusLabelLow];
    return styles.statusLabel;
  };

  // Helper for defectTypeColors
  const getDefectTypeColor = (type: string): string => {
    return (defectTypeColors as Record<string, string>)[type] || '#222';
  };

  // Helper for count rendering
  const renderCount = (count: unknown): React.ReactNode => {
    return typeof count === 'number' ? count.toString() : '';
  };

  // Helper to split defect types into two columns
  function splitIntoColumns<T>(arr: T[]): [T[], T[]] {
    const mid = Math.ceil(arr.length / 2);
    return [arr.slice(0, mid), arr.slice(mid)];
  }

  return (
    <Animated.View style={{ flex: 1, backgroundColor: bgColor }}>
            {/* Blue gradient header with logo at top left and user image at right */}
            <Animated.View style={{ height: 180, width: '100%', backgroundColor: headerColor, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, overflow: 'hidden', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
                    {/* Logo at top left */}
                    <View style={{ position: 'absolute', top: 18, left: 15, zIndex: 2, flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={require('./assets/logo.png')} style={{ width: 44, height: 44 }} resizeMode="contain" />
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
                                  style={{ width: 46, height: 46, borderRadius: 22, overflow: 'hidden', borderWidth: 2, borderColor: '#fff', backgroundColor: '#e5e7eb', justifyContent: 'center', alignItems: 'center', top:59 , right:27 }}
                                  activeOpacity={0.7}
                                  onPress={() => navigation.navigate('Profile')}
                                >
                                  <Image source={require('./assets/user.jpg')} style={{ width: 46, height: 46, borderRadius: 22 }} />
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
      
            <ScrollView style={{ flex: 1, marginTop: 150 }} contentContainerStyle={{ paddingBottom: 32 }}> 

      {/* Project Selection Pills */}
    <View style={{ backgroundColor: '#fff', borderRadius: 24, marginHorizontal: 12, padding: 18, shadowColor: '#2563eb', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.10, shadowRadius: 16, elevation: 8 }}>
      <View style={styles.projectSelectionWrap}>
        <Text style={styles.projectSelectionTitle}>Project Selection</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.projectSelectionRow}>
            {projectList.map(p => (
              <TouchableOpacity
                key={p.id}
                style={[styles.projectPill, selectedProjectId === p.id && styles.projectPillActive]}
                onPress={() => setSelectedProjectId(p.id)}
                activeOpacity={0.85}
              >
                <Text style={[styles.projectPillText, selectedProjectId === p.id && styles.projectPillTextActive]}>{p.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Project Name and Status */}
      <View style={styles.projectNameRow}>
        <Text style={styles.projectName}>{project.name}</Text>
        <View style={styles.statusLabelWrap}>
          <Text style={getStatusLabelStyle(project.risk)}>{project.risk} Risk</Text>
        </View>
      </View>

      {/* Defect Severity Breakdown */}
      <Text style={styles.sectionTitle}>Defect Severity Breakdown</Text>
      <View style={styles.defectCardsCol}>
        {/* High */}
        <View style={[styles.defectCard, { borderColor: riskColors.High }]}> 
          <Text style={[styles.defectCardTitle, { color: riskColors.High }]}>Defects on High</Text>
          <Text style={styles.defectCardTotal}>Total: {project.defects.high.total}</Text>
          {/* Defect types in two columns */}
          {(() => {
            const defectTypes = Object.entries(project.defects.high).filter(([k]) => k !== 'total');
            const [col1, col2] = splitIntoColumns(defectTypes);
            return (
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ flex: 1 }}>
                  {col1.map(([type, count]) => (
                    <View key={type} style={styles.defectTypeCol}>
                      <View style={[styles.defectTypeDot, { backgroundColor: getDefectTypeColor(type) }]} />
                      <Text style={styles.defectTypeText}>{type}</Text>
                      <Text style={styles.defectTypeCount}>{renderCount(count)}</Text>
                    </View>
                  ))}
                </View>
                <View style={{ flex: 1 }}>
                  {col2.map(([type, count]) => (
                    <View key={type} style={styles.defectTypeCol}>
                      <View style={[styles.defectTypeDot, { backgroundColor: getDefectTypeColor(type) }]} />
                      <Text style={styles.defectTypeText}>{type}</Text>
                      <Text style={styles.defectTypeCount}>{renderCount(count)}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })()}
          <TouchableOpacity style={styles.chartBtn} onPress={() => setHighChartVisible(true)}>
            <Text style={styles.chartBtnText}>View Chart</Text>
          </TouchableOpacity>
          {/* Modal Pie Chart for High Defect Status Breakdown */}
          <Modal visible={highChartVisible} animationType="slide" transparent onRequestClose={() => setHighChartVisible(false)}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 18, width: '90%', maxHeight: '80%' }}>
                <TouchableOpacity onPress={() => setHighChartVisible(false)} style={{ position: 'absolute', top: 14, right: 14, zIndex: 10 }}>
                  <Icon name="x" size={26} color="#64748b" />
                </TouchableOpacity>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#222', marginBottom: 10 }}>Status Breakdown for High</Text>
                <View style={{ alignItems: 'center', marginBottom: 8 }}>
                  <Svg width={220} height={220}>
                    {pieSegmentsHigh}
                  </Svg>
                </View>
                {/* Legend */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
                  {highStatusData.map(d => d.value > 0 && (
                    <View key={d.label} style={{ flexDirection: 'row', alignItems: 'center', margin: 6 }}>
                      <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: d.color, marginRight: 7 }} />
                      <Text style={{ fontSize: 15, color: '#222', fontWeight: '500', marginRight: 7 }}>{d.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {/* Medium */}
        <View style={[styles.defectCard, styles.defectCardMedium]}> 
          <Text style={[styles.defectCardTitle, { color: riskColors.Medium }]}>Defects on Medium</Text>
          <Text style={styles.defectCardTotal}>Total: {project.defects.medium.total}</Text>
          {(() => {
            const defectTypes = Object.entries(project.defects.medium).filter(([k]) => k !== 'total');
            const [col1, col2] = splitIntoColumns(defectTypes);
            return (
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ flex: 1 }}>
                  {col1.map(([type, count]) => (
                    <View key={type} style={styles.defectTypeCol}>
                      <View style={[styles.defectTypeDot, { backgroundColor: getDefectTypeColor(type) }]} />
                      <Text style={styles.defectTypeText}>{type}</Text>
                      <Text style={styles.defectTypeCount}>{renderCount(count)}</Text>
                    </View>
                  ))}
                </View>
                <View style={{ flex: 1 }}>
                  {col2.map(([type, count]) => (
                    <View key={type} style={styles.defectTypeCol}>
                      <View style={[styles.defectTypeDot, { backgroundColor: getDefectTypeColor(type) }]} />
                      <Text style={styles.defectTypeText}>{type}</Text>
                      <Text style={styles.defectTypeCount}>{renderCount(count)}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })()}
          <TouchableOpacity style={styles.chartBtn} onPress={() => setMediumChartVisible(true)}>
            <Text style={styles.chartBtnText}>View Chart</Text>
          </TouchableOpacity>
          {/* Modal Pie Chart for Medium Defect Status Breakdown */}
          <Modal visible={mediumChartVisible} animationType="slide" transparent onRequestClose={() => setMediumChartVisible(false)}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 18, width: '90%', maxHeight: '80%' }}>
                <TouchableOpacity onPress={() => setMediumChartVisible(false)} style={{ position: 'absolute', top: 14, right: 14, zIndex: 10 }}>
                  <Icon name="x" size={26} color="#64748b" />
                </TouchableOpacity>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#222', marginBottom: 10 }}>Status Breakdown for Medium</Text>
                <View style={{ alignItems: 'center', marginBottom: 8 }}>
                  <Svg width={220} height={220}>
                    {pieSegmentsMedium}
                  </Svg>
                </View>
                {/* Legend */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
                  {mediumStatusData.map(d => d.value > 0 && (
                    <View key={d.label} style={{ flexDirection: 'row', alignItems: 'center', margin: 6 }}>
                      <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: d.color, marginRight: 7 }} />
                      <Text style={{ fontSize: 15, color: '#222', fontWeight: '500', marginRight: 7 }}>{d.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {/* Low */}
        <View style={[styles.defectCard, styles.defectCardLow]}> 
          <Text style={[styles.defectCardTitle, { color: riskColors.Low }]}>Defects on Low</Text>
          <Text style={styles.defectCardTotal}>Total: {project.defects.low.total}</Text>
          {(() => {
            const defectTypes = Object.entries(project.defects.low).filter(([k]) => k !== 'total');
            const [col1, col2] = splitIntoColumns(defectTypes);
            return (
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ flex: 1 }}>
                  {col1.map(([type, count]) => (
                    <View key={type} style={styles.defectTypeCol}>
                      <View style={[styles.defectTypeDot, { backgroundColor: getDefectTypeColor(type) }]} />
                      <Text style={styles.defectTypeText}>{type}</Text>
                      <Text style={styles.defectTypeCount}>{renderCount(count)}</Text>
                    </View>
                  ))}
                </View>
                <View style={{ flex: 1 }}>
                  {col2.map(([type, count]) => (
                    <View key={type} style={styles.defectTypeCol}>
                      <View style={[styles.defectTypeDot, { backgroundColor: getDefectTypeColor(type) }]} />
                      <Text style={styles.defectTypeText}>{type}</Text>
                      <Text style={styles.defectTypeCount}>{renderCount(count)}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })()}
          <TouchableOpacity style={styles.chartBtn} onPress={() => setLowChartVisible(true)}>
            <Text style={styles.chartBtnText}>View Chart</Text>
          </TouchableOpacity>
          {/* Modal Pie Chart for Low Defect Status Breakdown */}
          <Modal visible={lowChartVisible} animationType="slide" transparent onRequestClose={() => setLowChartVisible(false)}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 18, width: '90%', maxHeight: '80%' }}>
                <TouchableOpacity onPress={() => setLowChartVisible(false)} style={{ position: 'absolute', top: 14, right: 14, zIndex: 10 }}>
                  <Icon name="x" size={26} color="#64748b" />
                </TouchableOpacity>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#222', marginBottom: 10 }}>Status Breakdown for Low</Text>
                <View style={{ alignItems: 'center', marginBottom: 8 }}>
                  <Svg width={220} height={220}>
                    {pieSegmentsLow}
                  </Svg>
                </View>
                {/* Legend */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
                  {lowStatusData.map(d => d.value > 0 && (
                    <View key={d.label} style={{ flexDirection: 'row', alignItems: 'center', margin: 6 }}>
                      <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: d.color, marginRight: 7 }} />
                      <Text style={{ fontSize: 15, color: '#222', fontWeight: '500', marginRight: 7 }}>{d.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>   

      {/* Defect Density, Severity Index, Defect to Remark Ratio */}
      <View style={{ flexDirection: 'column', gap: 14, marginBottom: 18 }}>
        {/* Defect Density Card */}
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 8 }}>Defect Density</Text>
          {(() => {
            // Dynamic meter logic
            const kloc = 100; // Example value, replace with real
            const defectCount = 449; // Example value, replace with real
            const defectDensity = defectCount / kloc;
            const min = 0, max = 15;
            const cappedDensity = Math.max(min, Math.min(defectDensity, max));
            const angle = -90 + (cappedDensity / 15) * 180;
            // Arc helpers
            function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
              const rad = (angle - 90) * Math.PI / 180.0;
              return {
                x: cx + (r * Math.cos(rad)),
                y: cy + (r * Math.sin(rad))
              };
            }
            function describeArc(cx: number, cy: number, r: number, startValue: number, endValue: number) {
              const valueToAngle = (v: number) => -90 + (v / 15) * 180;
              const startAngle = valueToAngle(startValue);
              const endAngle = valueToAngle(endValue);
              const start = polarToCartesian(cx, cy, r, endAngle);
              const end = polarToCartesian(cx, cy, r, startAngle);
              const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
              return [
                'M', start.x, start.y,
                'A', r, r, 0, largeArcFlag, 0, end.x, end.y
              ].join(' ');
            }
            // Arc value ranges
            const arcGreenStart = 0, arcGreenEnd = 7;
            const arcYellowStart = 7.1, arcYellowEnd = 10;
            const arcRedStart = 10.1, arcRedEnd = 15;
            // Tick positions for 0, 7, 10
            const ticks = [0, 7, 10];
            const valueToAngle = (v: number) => -90 + (v / 15) * 180;
            const tickAngles = ticks.map(valueToAngle);
            const tickRadius = 79;
            const tickLabelRadius = 95;
            // Needle position (filled triangle, sharp tip)
            const needleAngle = valueToAngle(cappedDensity);
            const needleLength = 66;
            const baseRadius = 10; // distance from center for base points
            const baseHalfAngle = 13; // degrees offset from needle angle for base
            // Tip of the needle
            const tip = polarToCartesian(100, 100, needleLength, needleAngle);
            // Base left and right (small segment at center)
            const baseLeft = polarToCartesian(100, 100, baseRadius, needleAngle - baseHalfAngle);
            const baseRight = polarToCartesian(100, 100, baseRadius, needleAngle + baseHalfAngle);
            // Color zones for legend
            const getZoneColor = (val: number) => {
              if (val <= 7) return '#22c55e';
              if (val <= 10) return '#facc15';
              return '#ef4444';
            };
            const zoneColor = getZoneColor(cappedDensity);
            return (
              <>
                <Text style={{ fontSize: 15, color: '#222', textAlign: 'center', marginBottom: 2 }}>
                  Defect Density: <Text style={{ color: zoneColor, fontWeight: 'bold', fontSize: 18 }}>{isNaN(defectDensity) ? '0.00' : defectDensity.toFixed(2)}</Text>
                </Text>
                <View style={{ alignItems: 'center', marginTop: 8 }}>
                  <Svg width={200} height={120}>
                    {/* Meter background */}
                    <Path d={describeArc(100, 100, 70, 0, 15)} fill="none" stroke="#e5e7eb" strokeWidth={18} />
                    {/* Green arc: 0-7 */}
                    <Path d={describeArc(100, 100, 70, arcGreenStart, arcGreenEnd)} fill="none" stroke="#22c55e" strokeWidth={14} />
                    {/* Yellow arc: 7.1-10 */}
                    <Path d={describeArc(100, 100, 70, arcYellowStart, arcYellowEnd)} fill="none" stroke="#facc15" strokeWidth={14} />
                    {/* Red arc: 10.1-15 */}
                    <Path d={describeArc(100, 100, 70, arcRedStart, arcRedEnd)} fill="none" stroke="#ef4444" strokeWidth={14} />
                    {/* Needle (filled triangle, sharp tip) */}
                    <Polygon
                      points={`
                        ${tip.x},${tip.y}
                        ${baseLeft.x},${baseLeft.y}
                        ${baseRight.x},${baseRight.y}
                      `}
                      fill="#334155"
                    />
                    {/* Center dot */}
                    <Circle cx={100} cy={100} r={10} fill="#334155" />
                    {/* Tick marks and labels */}
                    {ticks.map((tick, i) => {
                      const a = tickAngles[i];
                      const tickStart = polarToCartesian(100, 100, tickRadius, a);
                      const tickEnd = polarToCartesian(100, 100, tickRadius + 8, a);
                      const labelPos = polarToCartesian(100, 100, tickLabelRadius, a);
                      return (
                        <>
                          <Path key={`tick-${tick}`} d={`M${tickStart.x},${tickStart.y} L${tickEnd.x},${tickEnd.y}`} stroke="#64748b" strokeWidth={2} />
                          <SvgText key={`label-${tick}`} x={labelPos.x} y={labelPos.y + 5} fontSize={13} fill="#64748b" textAnchor="middle">{tick}</SvgText>
                        </>
                      );
                    })}
                  </Svg>
                </View>
              </>
            );
          })()}
        </View>
        {/* Defect Severity Index Card */}
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 8 }}>Defect Severity Index</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <View style={{ width: 18, height: 80, backgroundColor: '#fef9c3', borderRadius: 9, marginRight: 12, justifyContent: 'flex-end', alignItems: 'center' }}>
              <View style={{ width: 18, height: 32, backgroundColor: '#eab308', borderRadius: 9 }} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#eab308', marginBottom: 2 }}>43.9</Text>
              <Text style={{ fontSize: 13, color: '#64748b' }}>Weighted severity score (higher = more severe defects)</Text>
            </View>
          </View>
        </View>
        {/* Defect to Remark Ratio Card */}
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 8 }}>Defect to Remark Ratio</Text>
          <View style={{ backgroundColor: '#fef9c3', borderRadius: 16, padding: 18, alignItems: 'center', marginBottom: 6 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#222', marginBottom: 2 }}>97.79%</Text>
            <Text style={{ fontSize: 13, color: '#222', marginBottom: 6 }}>Defect to Remark Ratio (%)</Text>
            <View style={{ backgroundColor: '#eab308', borderRadius: 12, paddingHorizontal: 18, paddingVertical: 4 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Medium</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Defects Reopened Multiple Times Pie Chart (Interactive) */}
      {(() => {
        // Dummy defect data for each category
        const defectReopenData = [
          { label: '2 times', value: 5, color: '#4285f4', defects: [
            { id: 'D-101', assigned: 'Alice', reporter: 'Bob', release: 'R1.2' },
            { id: 'D-102', assigned: 'Charlie', reporter: 'Dave', release: 'R1.2' },
            { id: 'D-103', assigned: 'Eve', reporter: 'Frank', release: 'R1.3' },
            { id: 'D-104', assigned: 'Grace', reporter: 'Heidi', release: 'R1.3' },
            { id: 'D-105', assigned: 'Ivan', reporter: 'Judy', release: 'R1.4' },
          ] },
          { label: '3 times', value: 2, color: '#34a853', defects: [
            { id: 'D-106', assigned: 'Mallory', reporter: 'Oscar', release: 'R1.4' },
            { id: 'D-107', assigned: 'Peggy', reporter: 'Sybil', release: 'R1.5' },
          ] },
          { label: '4 times', value: 1, color: '#fbbc05', defects: [
            { id: 'D-108', assigned: 'Trent', reporter: 'Victor', release: 'R1.5' },
          ] },
          { label: '5 times', value: 1, color: '#ea4335', defects: [
            { id: 'D-109', assigned: 'Walter', reporter: 'Yvonne', release: 'R1.6' },
          ] },
          { label: '>5 times', value: 1, color: '#9b59b6', defects: [
            { id: 'D-110', assigned: 'Zara', reporter: 'Quinn', release: 'R1.6' },
          ] },
        ];
        const total = defectReopenData.reduce((sum, d) => sum + d.value, 0);
        const [modalVisible, setModalVisible] = useState(false);
        const [selectedDefects, setSelectedDefects] = useState<DefectItem[]>([]);
        const [selectedLabel, setSelectedLabel] = useState('');

        // Pie chart segment generator
        let startAngle = 0;
        const pieSegments = defectReopenData.map((d, idx) => {
          const angle = (d.value / total) * 2 * Math.PI;
          const endAngle = startAngle + angle;
          // SVG arc math
          const r = 80, cx = 90, cy = 90;
          const x1 = cx + r * Math.cos(startAngle - Math.PI / 2);
          const y1 = cy + r * Math.sin(startAngle - Math.PI / 2);
          const x2 = cx + r * Math.cos(endAngle - Math.PI / 2);
          const y2 = cy + r * Math.sin(endAngle - Math.PI / 2);
          const largeArc = angle > Math.PI ? 1 : 0;
          const path = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;
          const seg = (
            <TouchableWithoutFeedback key={d.label} onPress={() => { setSelectedDefects(d.defects); setSelectedLabel(d.label); setModalVisible(true); }}>
              <Path d={path} fill={d.color} stroke="#fff" strokeWidth={2} />
            </TouchableWithoutFeedback>
          );
          startAngle = endAngle;
          return seg;
        });

        return (
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 8 }}>Defects Reopened Multiple Times</Text>
            <View style={{ alignItems: 'center', marginBottom: 8 }}>
              <Svg width={180} height={180}>
                {pieSegments}
              </Svg>
            </View>
            {/* Legend */}
            <View style={{ flexDirection: 'column', marginTop: 4, marginLeft: 8 }}>
              {defectReopenData.map(d => (
                <View key={d.label} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                  <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: d.color, marginRight: 7 }} />
                  <Text style={{ fontSize: 15, color: '#222', fontWeight: '500' }}>{d.label}: <Text style={{ fontWeight: 'bold' }}>{d.value}</Text> <Text style={{ color: '#64748b', fontSize: 13 }}>({((d.value/total)*100).toFixed(1)}%)</Text></Text>
                </View>
              ))}
            </View>
            {/* Modal for defect list as a responsive table */}
            <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 18, width: '90%', maxHeight: '70%' }}>
                  <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', top: 14, right: 14, zIndex: 10 }}>
                    <Icon name="x" size={26} color="#64748b" />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#222', marginBottom: 10 }}>{selectedLabel} Defects</Text>
                  {/* Table header */}
                  <View style={{ flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#e5e7eb', paddingBottom: 6, marginBottom: 4 }}>
                    <Text style={{ flex: 1.4, fontWeight: 'bold', color: '#2563eb', fontSize: 15 }}>Defect ID</Text>
                    <Text style={{ flex: 1.5, fontWeight: 'bold', color: '#222', fontSize: 15 }}>Assigned</Text>
                    <Text style={{ flex: 1.5, fontWeight: 'bold', color: '#222', fontSize: 15 }}>Reporter</Text>
                    <Text style={{ flex: 1.2, fontWeight: 'bold', color: '#64748b', fontSize: 15 }}>Release</Text>
                  </View>
                  {/* Table rows */}
                  <FlatList
                    data={selectedDefects}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingVertical: 7 }}>
                        <Text style={{ flex: 1.5, color: '#2563eb', fontWeight: 'bold', fontSize: 14 }}>{item.id}</Text>
                        <Text style={{ flex: 1.5, color: '#222', fontSize: 14 }}>{item.assigned}</Text>
                        <Text style={{ flex: 1.5, color: '#222', fontSize: 14 }}>{item.reporter}</Text>
                        <Text style={{ flex: 1.2, color: '#64748b', fontSize: 14 }}>{item.release}</Text>
                      </View>
                    )}
                  />
                </View>
              </View>
            </Modal>
          </View>
        );
      })()}

      {/* Defect Distribution by Type Pie Chart */}
      {(() => {
        // Dummy defect type data
        const defectTypeData = [
          { label: 'Functionality', value: 238, color: '#4285f4' },
          { label: 'UI', value: 82, color: '#00bfae' },
          { label: 'Usability', value: 30, color: '#fbbc05' },
          { label: 'Validation', value: 103, color: '#ea4335' },
        ];
        const total = defectTypeData.reduce((sum, d) => sum + d.value, 0);
        // Pie chart segment generator
        let startAngle = 0;
        const pieSegments = defectTypeData.map((d, idx) => {
          const angle = (d.value / total) * 2 * Math.PI;
          const endAngle = startAngle + angle;
          // SVG arc math
          const r = 80, cx = 90, cy = 90;
          const x1 = cx + r * Math.cos(startAngle - Math.PI / 2);
          const y1 = cy + r * Math.sin(startAngle - Math.PI / 2);
          const x2 = cx + r * Math.cos(endAngle - Math.PI / 2);
          const y2 = cy + r * Math.sin(endAngle - Math.PI / 2);
          const largeArc = angle > Math.PI ? 1 : 0;
          const path = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;
          startAngle = endAngle;
          return (
            <Path key={d.label} d={path} fill={d.color} stroke="#fff" strokeWidth={2} />
          );
        });
        return (
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 8 }}>Defect Distribution by Type</Text>
            <View style={{ alignItems: 'center', marginBottom: 8 }}>
              <Svg width={180} height={180}>
                {pieSegments}
              </Svg>
            </View>
            {/* Legend */}
            <View style={{ flexDirection: 'column', marginTop: 4, marginLeft: 8 }}>
              {defectTypeData.map(d => (
                <View key={d.label} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                  <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: d.color, marginRight: 7 }} />
                  <Text style={{ fontSize: 15, color: '#222', fontWeight: '500' }}>{d.label}: <Text style={{ fontWeight: 'bold' }}>{d.value}</Text> <Text style={{ color: '#64748b', fontSize: 13 }}>({((d.value/total)*100).toFixed(1)}%)</Text></Text>
                </View>
              ))}
            </View>
          </View>
        );
      })()}

      {/* Time to Find Defects Line Chart (Single) */}
      <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 12 }}>Time to Find Defects</Text>
        <View style={{ alignItems: 'center' }}>
          <Svg width={320} height={213}>
            {/* Axes */}
            <Path d="M40,180 L300,180" stroke="#222" strokeWidth={2} />
            <Path d="M40,180 L40,30" stroke="#222" strokeWidth={2} />
            {/* Grid lines */}
            {[1,2,3,4].map(i => (
              <Path key={i} d={`M40,${180-i*30} L300,${180-i*30}`} stroke="#e5e7eb" strokeWidth={1} />
            ))}
            {/* Dummy data points */}
            {(() => {
              const data = [2,3,1,4,2,3,2,1,2,1];
              const points = data.map((v,i) => {
                const x = 40 + (260/9)*i;
                const y = 180 - (v-1)*37.5;
                return { x, y };
              });
              // Line path
              const linePath = points.map((p,i) => i===0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`).join(' ');
              return (
                <>
                  <Path d={linePath} stroke="#2563eb" strokeWidth={3} fill="none" />
                  {points.map((p,i) => (
                    <Circle key={i} cx={p.x} cy={p.y} r={6} fill="#2563eb" stroke="#fff" strokeWidth={2} />
                  ))}
                </>
              );
            })()}
            {/* Y axis labels */}
            {[1,2,3,4,5].map(i => (
              <SvgText key={i} x={20} y={180-(i-1)*30+6} fontSize={13} fill="#64748b">{i}</SvgText>
            ))}
            {/* X axis labels */}
            {Array.from({length:10}).map((_,i) => (
              <SvgText key={i} x={40+(260/9)*i-12} y={195} fontSize={7} fill="#64748b">Day {i+1}</SvgText>
            ))}
            {/* Axis titles */}
            <SvgText x={-25} y={20} fontSize={10} fill="#64748b" rotation={-90} textAnchor="middle">Def Count</SvgText>
            <SvgText x={152} y={211} fontSize={10} fill="#64748b" textAnchor="middle">Time (Day)</SvgText>
          </Svg>
        </View>
      </View>
      {/* Time to Fix Defects Line Chart (Single) */}
      <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 12 }}>Time to Fix Defects</Text>
        <View style={{ alignItems: 'center' }}>
          <Svg width={320} height={215}>
            {/* Axes */}
            <Path d="M40,180 L300,180" stroke="#222" strokeWidth={2} />
            <Path d="M40,180 L40,30" stroke="#222" strokeWidth={2} />
            {/* Grid lines */}
            {[1,2,3,4].map(i => (
              <Path key={i} d={`M40,${180-i*30} L300,${180-i*30}`} stroke="#e5e7eb" strokeWidth={1} />
            ))}
            {/* Dummy data points */}
            {(() => {
              const data = [3,2,4,3,2,3,2,2,1,2];
              const points = data.map((v,i) => {
                const x = 40 + (260/9)*i;
                const y = 180 - (v-1)*37.5;
                return { x, y };
              });
              // Line path
              const linePath = points.map((p,i) => i===0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`).join(' ');
              return (
                <>
                  <Path d={linePath} stroke="#22c55e" strokeWidth={3} fill="none" />
                  {points.map((p,i) => (
                    <Circle key={i} cx={p.x} cy={p.y} r={6} fill="#22c55e" stroke="#fff" strokeWidth={2} />
                  ))}
                </>
              );
            })()}
            {/* Y axis labels */}
            {[1,2,3,4,5].map(i => (
              <SvgText key={i} x={20} y={180-(i-1)*30+6} fontSize={13} fill="#64748b">{i}</SvgText>
            ))}
            {/* X axis labels */}
            {Array.from({length:10}).map((_,i) => (
              <SvgText key={i} x={40+(260/9)*i-12} y={195} fontSize={7} fill="#64748b">Day {i+1}</SvgText>
            ))}
            {/* Axis titles */}
            <SvgText x={-45} y={20} fontSize={10} fill="#64748b" rotation={-90}>Def Count</SvgText>
            <SvgText x={122} y={211} fontSize={10} fill="#64748b">Time (Day)</SvgText>
          </Svg>
        </View>
      </View>

      {/* Defects by Module Pie Chart */}
      {(() => {
        // Dummy module data (4 main modules)
        const moduleData = [
          { label: 'Configurations', value: 77, color: '#4285f4' },
          { label: 'Project Management', value: 53, color: '#00bfae' },
          { label: 'Bench', value: 58, color: '#fbbc05' },
          { label: 'Defects', value: 64, color: '#ea4335' },
        ];
        const total = moduleData.reduce((sum, d) => sum + d.value, 0);
        let startAngle = 0;
        const pieSegments = moduleData.map((d, idx) => {
          const angle = (d.value / total) * 2 * Math.PI;
          const endAngle = startAngle + angle;
          const r = 80, cx = 90, cy = 90;
          const x1 = cx + r * Math.cos(startAngle - Math.PI / 2);
          const y1 = cy + r * Math.sin(startAngle - Math.PI / 2);
          const x2 = cx + r * Math.cos(endAngle - Math.PI / 2);
          const y2 = cy + r * Math.sin(endAngle - Math.PI / 2);
          const largeArc = angle > Math.PI ? 1 : 0;
          const path = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;
          startAngle = endAngle;
          return (
            <Path key={d.label} d={path} fill={d.color} stroke="#fff" strokeWidth={2} />
          );
        });
        return (
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 8, textAlign: 'center' }}>Defects by Module</Text>
            <View style={{ alignItems: 'center', marginBottom: 8 }}>
              <Svg width={180} height={180}>
                {pieSegments}
              </Svg>
            </View>
            {/* Legend */}
            <View style={{ flexDirection: 'column', marginTop: 4, marginLeft: 8 }}>
              {moduleData.map(d => (
                <View key={d.label} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                  <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: d.color, marginRight: 7 }} />
                  <Text style={{ fontSize: 15, color: '#222', fontWeight: '500' }}>{d.label}: <Text style={{ fontWeight: 'bold' }}>{d.value}</Text> <Text style={{ color: '#64748b', fontSize: 13 }}>({((d.value/total)*100).toFixed(2)}%)</Text></Text>
                </View>
              ))}
            </View>
          </View>
        );
      })()}
      </View>
    </ScrollView>
    </Animated.View>
  );
}
