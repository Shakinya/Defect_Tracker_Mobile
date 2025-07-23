import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Svg, Path, Circle, Text as SvgText } from 'react-native-svg';

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
    backgroundColor: '#2563eb',
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
    marginBottom: 2,
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
    width: '48%',
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
    backgroundColor: '#e0e7ff',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  chartBtnText: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 13,
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

type RootStackParamList = {
  ProjectDashboard: { projectId: number };
};

interface ProjectDashboardProps {
  route: RouteProp<RootStackParamList, 'ProjectDashboard'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProjectDashboard'>;
}

export default function ProjectDashboard({ route, navigation }: ProjectDashboardProps) {
  const { projectId: initialProjectId } = route.params;
  const [selectedProjectId, setSelectedProjectId] = useState<number>(initialProjectId);
  const project: ProjectDefectData = defectData[selectedProjectId] || defectData[1];

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
    <ScrollView style={styles.container}>

      {/* Project Selection Pills */}
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
          <TouchableOpacity style={styles.chartBtn}>
            <Text style={styles.chartBtnText}>View Chart</Text>
          </TouchableOpacity>
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
          <TouchableOpacity style={styles.chartBtn}>
            <Text style={styles.chartBtnText}>View Chart</Text>
          </TouchableOpacity>
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
          <TouchableOpacity style={styles.chartBtn}>
            <Text style={styles.chartBtnText}>View Chart</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Defect Density, Severity Index, Defect to Remark Ratio */}
      <View style={{ flexDirection: 'column', gap: 14, marginBottom: 18 }}>
        {/* Defect Density Card */}
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 8 }}>Defect Density</Text>
          <Text style={{ fontSize: 15, color: '#222', textAlign: 'center', marginBottom: 2 }}>Defect Density: <Text style={{ color: '#e11d48', fontWeight: 'bold', fontSize: 18 }}>29.53</Text></Text>
          {/* Exact Semi-Circular Meter using SVG */}
          <View style={{ alignItems: 'center', marginTop: 8 }}>
            <Svg width={180} height={110}>
              {/* Green arc */}
              <Path d="M20,100 A70,70 0 0,1 90,30" stroke="#22c55e" strokeWidth={12} fill="none" />
              {/* Yellow arc */}
              <Path d="M90,30 A70,70 0 0,1 160,100" stroke="#eab308" strokeWidth={12} fill="none" />
              {/* Red arc */}
              <Path d="M160,100 A70,70 0 0,1 20,100" stroke="#e11d48" strokeWidth={12} fill="none" />
              {/* Ticks and labels */}
              <SvgText x={20} y={105} fontSize={13} fill="#222">0</SvgText>
              <SvgText x={85} y={25} fontSize={13} fill="#222">7</SvgText>
              <SvgText x={160} y={105} fontSize={13} fill="#222">10</SvgText>
              {/* Pointer (needle) */}
              <Path d="M90,100 L170,100" stroke="#222" strokeWidth={4} />
              <Circle cx={90} cy={100} r={7} fill="#222" />
            </Svg>
          </View>
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
    </ScrollView>
  );
}
