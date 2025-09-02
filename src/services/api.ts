import axios from 'axios';

// API BASE URL for local development
// Use appropriate host for platform
import { Platform } from 'react-native';
const API_HOST = Platform.OS === 'android' ? '192.168.1.8' : '192.168.1.8';
const API_BASE_URL = `http://${API_HOST}:3000/api`;

// Mock data for projects
const mockProjects: ApiProject[] = [
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

// Mock data for defect remark ratio
const mockDefectRemarkRatio: DefectRemarkRatio = {
  remarks: 449,
  defects: 459,
  ratio: '97.79%',
  category: 'Medium',
  color: 'yellow'
};

// Mock data for defect density
const mockDefectDensity: DefectDensity = {
  defectCount: 449,
  kloc: 100,
  density: 4.49,
  category: 'Medium',
  color: 'yellow'
};

// Mock data for defect severity index
const mockDefectSeverityIndex: DefectSeverityIndex = {
  projectId: 1,
  totalDefects: 445,
  actualSeverityScore: 43.9,
  maximumSeverityScore: 100,
  dsiPercentage: 43.9,
  interpretation: 'Medium risk'
};

// Mock data for project card color
const mockProjectCardColor: ProjectCardColor = {
  projectId: 1,
  projectName: 'Defect Tracker',
  availableRiskLevels: ['High', 'Medium', 'Low'],
  projectCardColor: 'bg-gradient-to-r from-red-400 to-red-500'
};

// Mock data for all project card colors (fallback)
const mockAllProjectCardColors: ProjectCardColorAll[] = [
  {
    projectName: 'Alpha Platform',
    severityIndex: 'High',
    remarkRatio: 'High',
    densityMeter: 'Medium',
    status: 'High Risk',
    colorCode: 'Red'
  },
  {
    projectName: 'Beta Mobile App',
    severityIndex: 'High',
    remarkRatio: 'Low',
    densityMeter: 'Low',
    status: 'High Risk',
    colorCode: 'Red'
  },
  {
    projectName: 'Gama App',
    severityIndex: 'Low',
    remarkRatio: 'Low',
    densityMeter: 'Low',
    status: 'Low Risk',
    colorCode: 'Green'
  }
];

// Mock data for defect type distribution
const mockDefectTypeDistribution: DefectType[] = [
  { defectType: 'Functionality', defectCount: 238, percentage: 52.8 },
  { defectType: 'UI', defectCount: 82, percentage: 18.2 },
  { defectType: 'Usability', defectCount: 30, percentage: 6.7 },
  { defectType: 'Validation', defectCount: 103, percentage: 22.3 },
];

// Mock data for defect distribution by type
const mockDefectDistributionByType: DefectDistributionByType = {
  defectTypes: [
    { defectType: 'Epic', defectCount: 1, percentage: 50 },
    { defectType: 'UI', defectCount: 1, percentage: 50 },
  ],
  totalDefectCount: 2,
  mostCommonDefectType: 'Epic',
  mostCommonDefectCount: 1,
};

// Mock data for defect count by module
const mockDefectCountByModule: DefectCountByModule[] = [
  { moduleId: 24, name: 'Authentication', value: 1, percentage: 50 },
  { moduleId: 25, name: 'Public API', value: 1, percentage: 50 },
];

// Mock data for defect severity breakdown
const mockDefectSeverityBreakdown: DefectSeveritySummary[] = [
  {
    severity: 'High',
    Severity_color: '#ad0c0c',
    total: 112,
    statuses: {
      REOPEN: { color: '#ff2d2d', count: 3 },
      NEW: { color: '#3b3bfa', count: 50 },
      OPEN: { color: '#facc15', count: 5 },
      FIXED: { color: '#22c55e', count: 14 },
      CLOSED: { color: '#15803d', count: 37 },
      REJECT: { color: '#7f1d1d', count: 0 },
      DUPLICATE: { color: '#64748b', count: 3 },
    }
  },
  {
    severity: 'Medium',
    Severity_color: '#e3b707',
    total: 237,
    statuses: {
      REOPEN: { color: '#ff2d2d', count: 5 },
      NEW: { color: '#3b3bfa', count: 126 },
      OPEN: { color: '#facc15', count: 10 },
      FIXED: { color: '#22c55e', count: 33 },
      CLOSED: { color: '#15803d', count: 60 },
      REJECT: { color: '#7f1d1d', count: 0 },
      DUPLICATE: { color: '#64748b', count: 1 },
    }
  },
  {
    severity: 'Low',
    Severity_color: '#0b9c40',
    total: 96,
    statuses: {
      REOPEN: { color: '#ff2d2d', count: 1 },
      NEW: { color: '#3b3bfa', count: 57 },
      OPEN: { color: '#facc15', count: 0 },
      FIXED: { color: '#22c55e', count: 10 },
      CLOSED: { color: '#15803d', count: 24 },
      REJECT: { color: '#7f1d1d', count: 0 },
      DUPLICATE: { color: '#64748b', count: 3 },
    }
  }
];

// Mock data for defect reopen summary
const mockDefectReopenSummary: DefectReopenSummary[] = [
  { label: '2 times', count: 5 },
  { label: '3 times', count: 2 },
  { label: '4 times', count: 1 },
  { label: '5 times', count: 1 },
  { label: '>5 times', count: 1 },
];

// API response types
export interface ApiProject {
  id: number;
  name: string;
  risk?: 'High' | 'Medium' | 'Low';
}

// Defect to Remark Ratio response types
export interface DefectRemarkRatioResponse {
  status: string;
  message: string;
  data: {
    remarks: number;
    defects: number;
    ratio: string;
    category: string;
    color: string;
  };
  statusCode: number;
}

export interface DefectRemarkRatio {
  remarks: number;
  defects: number;
  ratio: string;
  category: string;
  color: string;
}

// Defect Density response types
export interface DefectDensityResponse {
  status: string;
  message: string;
  data: {
    defectCount: number;
    kloc: number;
    density: number;
    category: string;
    color: string;
  };
  statusCode: number;
}

export interface DefectDensity {
  defectCount: number;
  kloc: number;
  density: number;
  category: string;
  color: string;
}

// Defect Severity Index response types
export interface DefectSeverityIndexResponse {
  status: string;
  message: string;
  data: {
    projectId: number;
    totalDefects: number;
    actualSeverityScore: number;
    maximumSeverityScore: number;
    dsiPercentage: number;
    interpretation: string;
  };
  statusCode: number;
}

export interface DefectSeverityIndex {
  projectId: number;
  totalDefects: number;
  actualSeverityScore: number;
  maximumSeverityScore: number;
  dsiPercentage: number;
  interpretation: string;
}

// Project Card Color response types
export interface ProjectCardColorResponse {
  status: string;
  message: string;
  data: {
    projectId: number;
    projectName: string;
    availableRiskLevels: string[];
    projectCardColor: string;
  };
  statusCode: number;
}

export interface ProjectCardColor {
  projectId: number;
  projectName: string;
  availableRiskLevels: string[];
  projectCardColor: string;
}

// All Project Card Colors response types
export interface ProjectCardColorAllResponse {
  status: string;
  message: string;
  statusCode: number;
  data: ProjectCardColorAll[];
}

export interface ProjectCardColorAll {
  projectName: string;
  severityIndex: string;
  remarkRatio: string;
  densityMeter: string;
  status: string;
  colorCode: string; // e.g., Red/Green/Yellow
}

// Defect Type Distribution response types
export interface DefectTypeResponse {
  status: string;
  message: string;
  data: {
    projectId: number;
    defectTypes: {
      defectType: string;
      defectCount: number;
      percentage: number;
    }[];
    totalDefectCount: number;
    mostCommonDefectType: string;
    mostCommonDefectCount: number;
  };
  statusCode: number;
}

export interface DefectType {
  defectType: string;
  defectCount: number;
  percentage: number;
}

// Defect Severity Summary response types
export interface DefectSeveritySummaryResponse {
  status: string;
  message: string;
  data: {
    projectId: number;
    projectName: string;
    totalDefects: number;
    defectSummary: {
      severity: string;
      Severity_color: string;
      total: number;
      statuses: {
        [key: string]: {
          color: string;
          count: number;
        };
      };
    }[];
  };
  statusCode: number;
}

export interface DefectSeveritySummary {
  severity: string;
  Severity_color: string;
  total: number;
  statuses: {
    [key: string]: {
      color: string;
      count: number;
    };
  };
}

// Defect Reopen Summary response types
export interface DefectReopenSummaryResponse {
  status: string;
  message: string;
  data: {
    label: string;
    count: number;
  }[];
  statusCode: number;
}

export interface DefectReopenSummary {
  label: string;
  count: number;
}

// Defect Distribution by Type response types
export interface DefectDistributionByTypeResponse {
  status: string;
  message: string;
  data: {
    defectTypes: {
      defectType: string;
      defectCount: number;
      percentage: number;
    }[];
    totalDefectCount: number;
    mostCommonDefectType: string;
    mostCommonDefectCount: number;
  };
  statusCode: number;
}

export interface DefectDistributionByType {
  defectTypes: {
    defectType: string;
    defectCount: number;
    percentage: number;
  }[];
  totalDefectCount: number;
  mostCommonDefectType: string;
  mostCommonDefectCount: number;
}

// Defect Count by Module response types
export interface DefectCountByModuleResponse {
  status: string;
  message: string;
  data: {
    moduleId: number;
    name: string;
    value: number;
    percentage: number;
  }[];
  statusCode: number;
}

export interface DefectCountByModule {
  moduleId: number;
  name: string;
  value: number;
  percentage: number;
}

// API service class
export class ApiService {
  private static instance: ApiService;
  private axiosInstance: any;

  private constructor() {
    // Initialize axios instance for real API calls
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for logging
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
      },
      (error: any) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for logging
    this.axiosInstance.interceptors.response.use(
      (response: any) => {
        console.log('API Response:', response.status, response.config.url);
        console.log('Response data:', response.data);
        return response;
      },
      (error: any) => {
        console.error('API Response Error:', error.response?.status, error.response?.data);
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Get all projects from API
  async getProjects(): Promise<ApiProject[]> {
    try {
      console.log('Making API call to:', `${API_BASE_URL}/projects`);
      const response = await this.axiosInstance.get('/projects');
      
      console.log('Raw API response:', response.data);
      console.log('Response type:', typeof response.data);
      console.log('Is array:', Array.isArray(response.data));
      
      // Handle different possible response formats
      let projectsData = response.data;
      
      // If response has a data property, use that
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        projectsData = response.data.data;
      }
      // If response is directly an array
      else if (response.data && Array.isArray(response.data)) {
        projectsData = response.data;
      }
      // If response is an object with projects property
      else if (response.data && response.data.projects && Array.isArray(response.data.projects)) {
        projectsData = response.data.projects;
      }
      // If response is a single object, wrap it in array
      else if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
        projectsData = [response.data];
      }
      else {
        throw new Error('Unexpected response format');
      }

      console.log('Projects data before transformation:', projectsData);
      
      // Transform API data to match our expected format
      const transformedProjects = projectsData.map((project: any, index: number) => {
        const transformed = {
          id: parseInt(project.id) || index + 1,
          name: project.project_name || project.name || project.projectName || project.title || `Project ${index + 1}`,
          risk: this.determineRiskLevel(project.kloc, project.project_status) || 'Medium',
        };
        console.log(`Transforming project ${index}:`, project, '->', transformed);
        return transformed;
      });

      console.log('Final transformed projects:', transformedProjects);
      return transformedProjects;
      
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        config: error.config,
        request: error.request,
        response: error.response
      });
      // Fallback to mock data if API fails
      console.log('API call failed, falling back to mock projects data');
      console.log('Mock projects:', mockProjects);
      return mockProjects;
    }
  }

  // Get project by ID - using mock data
  async getProjectById(id: number): Promise<ApiProject | null> {
    try {
      // COMMENTED OUT ACTUAL API CALL - Using mock data instead
      /*
      const response = await this.axiosInstance.get(`/projects/${id}`);
      return response.data;
      */
      
      console.log('Using mock project data for ID:', id);
      return mockProjects.find(p => p.id === id) || null;
    } catch (error: any) {
      console.error('Error fetching project:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch project');
    }
  }

  // Get defect to remark ratio for a project from API
  async getDefectRemarkRatio(projectId: number): Promise<DefectRemarkRatio> {
    try {
      console.log('Calling defect remark ratio API for project:', projectId);
      const response = await this.axiosInstance.get(`/defects/remark-ratio?projectId=${projectId}`);
      
      console.log('Defect Remark Ratio API response:', response.data);
      
      // Handle different possible response formats
      let data = response.data;
      
      // If response has a data property, use that
      if (response.data && response.data.data) {
        data = response.data.data;
      }
      
      // Transform API data to match our expected format
      const result = {
        remarks: data.totalDefects || data.remarks || data.remarkCount || 0,
        defects: data.validDefects || data.defects || data.defectCount || 0,
        ratio: `${data.ratioPct || data.ratio || data.percentage || 0}%`,
        category: data.meaning || data.category || data.riskLevel || 'Medium',
        color: data.color || 'yellow'
      };
      
      console.log('Transformed defect remark ratio:', result);
      return result;
      
    } catch (error: any) {
      console.error('Error fetching defect remark ratio:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        config: error.config,
        request: error.request,
        response: error.response
      });
      // Fallback to mock data if API fails
      console.log('Falling back to mock defect remark ratio data');
      return mockDefectRemarkRatio;
    }
  }

  // Get defect density for a project from API
  async getDefectDensity(projectId: number): Promise<DefectDensity> {
    try {
      console.log('Calling defect density API for project:', projectId);
      const response = await this.axiosInstance.get(`/defects/density?projectId=${projectId}`);
      
      console.log('Defect Density API response:', response.data);
      
      // Handle different possible response formats
      let data = response.data;
      
      // If response has a data property, use that
      if (response.data && response.data.data) {
        data = response.data.data;
      }
      
      // Transform API data to match our expected format
      const result = {
        defectCount: data.defects || data.defectCount || data.totalDefects || 0,
        kloc: data.kloc || data.klocCount || 0,
        density: data.defectDensity || data.density || data.densityValue || 0,
        category: data.meaning || data.category || data.riskLevel || 'Medium',
        color: (data.color || 'Yellow').toLowerCase()
      };
      
      console.log('Transformed defect density:', result);
      return result;
      
    } catch (error: any) {
      console.error('Error fetching defect density:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        config: error.config,
        request: error.request,
        response: error.response
      });
      // Fallback to mock data if API fails
      console.log('Falling back to mock defect density data');
      return mockDefectDensity;
    }
  }

  // Get defect severity index for a project from API
  async getDefectSeverityIndex(projectId: number): Promise<DefectSeverityIndex> {
    try {
      console.log('Calling defect severity index API for project:', projectId);
      const response = await this.axiosInstance.get(`/defects/severity-index?projectId=${projectId}`);
      
      console.log('Defect Severity Index API response:', response.data);
      
      // Handle different possible response formats
      let data = response.data;
      
      // If response has a data property, use that
      if (response.data && response.data.data) {
        data = response.data.data;
      }
      
      // Transform API data to match our expected format
      const result = {
        projectId: data.projectId || projectId,
        totalDefects: data.totalDefects || data.totalDefectCount || 0,
        actualSeverityScore: data.severityIndex || data.actualSeverityScore || data.severityScore || data.score || 0,
        maximumSeverityScore: data.maximumSeverityScore || data.maxScore || 100,
        dsiPercentage: data.severityIndexPct || data.dsiPercentage || data.percentage || data.actualSeverityScore || 0,
        interpretation: data.meaning || data.interpretation || data.category || 'Medium risk'
      };
      
      console.log('Transformed defect severity index:', result);
      return result;
      
    } catch (error: any) {
      console.error('Error fetching defect severity index:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        config: error.config,
        request: error.request,
        response: error.response
      });
      // Fallback to mock data if API fails
      console.log('Falling back to mock defect severity index data');
      return mockDefectSeverityIndex;
    }
  }

  // Get project card color for a project - using mock data
  async getProjectCardColor(projectId: number): Promise<ProjectCardColor> {
    try {
      // COMMENTED OUT ACTUAL API CALL - Using mock data instead
      /*
      const url = `/dashboard/project-card-color/${projectId}`;
      console.log('Calling project card color API with URL:', url);
      console.log('Full URL:', `${this.axiosInstance.defaults.baseURL}${url}`);
      
      const response = await this.axiosInstance.get(url);
      
      console.log('Project Card Color API response:', response.data);
      console.log('Response status:', response.data?.status);
      console.log('Response data:', response.data?.data);
      console.log('HTTP status code:', response.status);
      
      if (response.data && response.data.status === 'success' && response.data.data) {
        const data = response.data.data;
        console.log('Raw project card color data:', data);
        console.log('Project ID:', data.projectId);
        console.log('Project Name:', data.projectName);
        console.log('Available Risk Levels:', data.availableRiskLevels);
        console.log('Project Card Color:', data.projectCardColor);
        
        // Map the API response fields to our expected format
        const result = {
          projectId: data.projectId || projectId,
          projectName: data.projectName || '',
          availableRiskLevels: data.availableRiskLevels || [],
          projectCardColor: data.projectCardColor || 'bg-gradient-to-r from-yellow-400 to-yellow-500'
        };
        
        console.log('Processed project card color result:', result);
        return result;
      } else {
        console.log('Invalid response format - status:', response.data?.status);
        console.log('Response data structure:', response.data);
        throw new Error('Invalid response format for project card color');
      }
      */
      
      console.log('Using mock project card color data for project:', projectId);
      return mockProjectCardColor;
    } catch (error: any) {
      console.error('Error fetching project card color:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch project card color');
    }
  }

  // Get all project card colors
  async getAllProjectCardColors(): Promise<ProjectCardColorAll[]> {
    try {
      console.log('Calling all project card colors API');
      const response = await this.axiosInstance.get('/projects/card-color/all');
      console.log('All Project Card Colors API response:', response.data);

      let data = response.data;
      if (response.data && response.data.data) {
        data = response.data.data;
      }

      // Expecting an array of items
      const result: ProjectCardColorAll[] = Array.isArray(data) ? data : [];
      console.log('Transformed all project card colors:', result);
      return result.length > 0 ? result : mockAllProjectCardColors;
    } catch (error: any) {
      console.error('Error fetching all project card colors:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        config: error.config,
        request: error.request,
        response: error.response
      });
      console.log('Falling back to mock all project card colors data');
      return mockAllProjectCardColors;
    }
  }

  // Get defect type distribution for a project - using mock data
  async getDefectTypeDistribution(projectId: number): Promise<DefectType[]> {
    try {
      // COMMENTED OUT ACTUAL API CALL - Using mock data instead
      /*
      const url = `/dashboard/defect-type/${projectId}`;
      console.log('Calling defect type distribution API with URL:', url);
      console.log('Full URL:', `${this.axiosInstance.defaults.baseURL}${url}`);
      
      const response = await this.axiosInstance.get(url);
      
      console.log('Defect Type Distribution API response:', response.data);
      console.log('Response status:', response.data?.status);
      console.log('Response data:', response.data?.data);
      console.log('HTTP status code:', response.status);
      
      if (response.data && response.data.status === 'success' && response.data.data) {
        const data = response.data.data;
        console.log('Raw defect type distribution data:', data);
        console.log('Project ID:', data.projectId);
        console.log('Defect Types:', data.defectTypes);
        
        // Map the API response fields to our expected format
        const result = data.defectTypes || [];
        
        console.log('Processed defect type distribution result:', result);
        return result;
      } else {
        console.log('Invalid response format - status:', response.data?.status);
        console.log('Response data structure:', response.data);
        throw new Error('Invalid response format for defect type distribution');
      }
      */
      
      console.log('Using mock defect type distribution data for project:', projectId);
      return mockDefectTypeDistribution;
    } catch (error: any) {
      console.error('Error fetching defect type distribution:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch defect type distribution');
    }
  }

  // Get defect severity breakdown for a project - using mock data
  async getDefectSeverityBreakdown(projectId: number): Promise<DefectSeveritySummary[]> {
    try {
      // COMMENTED OUT ACTUAL API CALL - Using mock data instead
      /*
      const url = `/dashboard/defect_severity_summary/${projectId}`;
      console.log('Calling defect severity breakdown API with URL:', url);
      console.log('Full URL:', `${this.axiosInstance.defaults.baseURL}${url}`);
      
      const response = await this.axiosInstance.get(url);
      
      console.log('Defect Severity Breakdown API response:', response.data);
      console.log('Response status:', response.data?.status);
      console.log('Response data:', response.data?.data);
      console.log('HTTP status code:', response.status);
      
      if (response.data && response.data.status === 'success' && response.data.data) {
        const data = response.data.data;
        console.log('Raw defect severity breakdown data:', data);
        console.log('Project ID:', data.projectId);
        console.log('Project Name:', data.projectName);
        console.log('Total Defects:', data.totalDefects);
        console.log('Defect Summary:', data.defectSummary);
        
        // Map the API response fields to our expected format
        const result = data.defectSummary || [];
        
        console.log('Processed defect severity breakdown result:', result);
        return result;
      } else {
        console.log('Invalid response format - status:', response.data?.status);
        console.log('Response data structure:', response.data);
        throw new Error('Invalid response format for defect severity breakdown');
      }
      */
      
      console.log('Using mock defect severity breakdown data for project:', projectId);
      return mockDefectSeverityBreakdown;
    } catch (error: any) {
      console.error('Error fetching defect severity breakdown:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch defect severity breakdown');
    }
  }

  // Helper method to determine risk level based on KLOC and project status
  private determineRiskLevel(kloc?: number, projectStatus?: string): 'High' | 'Medium' | 'Low' {
    if (!kloc) return 'Medium';
    
    // Higher KLOC generally means higher complexity and risk
    if (kloc > 100) return 'High';
    if (kloc > 50) return 'Medium';
    return 'Low';
  }

  // Get defect reopen summary for a project - using mock data
  async getDefectReopenSummary(projectId: number): Promise<DefectReopenSummary[]> {
    try {
      // COMMENTED OUT ACTUAL API CALL - Using mock data instead
      /*
      const url = `/dashboard/reopen-count_summary/${projectId}`;
      console.log('Calling defect reopen summary API with URL:', url);
      console.log('Full URL:', `${this.axiosInstance.defaults.baseURL}${url}`);
      
      const response = await this.axiosInstance.get(url);
      
      console.log('Defect Reopen Summary API response:', response.data);
      console.log('Response status:', response.data?.status);
      console.log('Response data:', response.data?.data);
      console.log('HTTP status code:', response.status);
      
      if (response.data && response.data.status === 'OK' && response.data.data) {
        const result = response.data.data;
        console.log('Processed defect reopen summary result:', result);
        return result;
      } else {
        console.log('Invalid response format - status:', response.data?.status);
        console.log('Response data structure:', response.data);
        throw new Error('Invalid response format for defect reopen summary');
      }
      */
      
      console.log('Using mock defect reopen summary data for project:', projectId);
      return mockDefectReopenSummary;
    } catch (error: any) {
      console.error('Error fetching defect reopen summary:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch defect reopen summary');
    }
  }

  // Get defect distribution by type for a project from API
  async getDefectDistributionByType(projectId: number): Promise<DefectDistributionByType> {
    try {
      console.log('Calling defect distribution by type API for project:', projectId);
      const response = await this.axiosInstance.get(`/defects/distribution-by-type?projectId=${projectId}`);
      
      console.log('Defect Distribution by Type API response:', response.data);
      
      // Handle different possible response formats
      let data = response.data;
      
      // If response has a data property, use that
      if (response.data && response.data.data) {
        data = response.data.data;
      }
      
      // Transform API data to match our expected format
      const result: DefectDistributionByType = {
        defectTypes: data.defectTypes || [],
        totalDefectCount: data.totalDefectCount || 0,
        mostCommonDefectType: data.mostCommonDefectType || '',
        mostCommonDefectCount: data.mostCommonDefectCount || 0,
      };
      
      console.log('Transformed defect distribution by type:', result);
      return result;
      
    } catch (error: any) {
      console.error('Error fetching defect distribution by type:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        config: error.config,
        request: error.request,
        response: error.response
      });
      // Fallback to mock data if API fails
      console.log('Falling back to mock defect distribution by type data');
      return mockDefectDistributionByType;
    }
  }

  // Get defect count by module for a project from API
  async getDefectCountByModule(projectId: number): Promise<DefectCountByModule[]> {
    try {
      console.log('Calling defect count by module API for project:', projectId);
      const response = await this.axiosInstance.get(`/defects/count-by-module?projectId=${projectId}`);
      
      console.log('Defect Count by Module API response:', response.data);
      
      // Handle different possible response formats
      let data = response.data;
      
      // If response has a data property, use that
      if (response.data && response.data.data) {
        data = response.data.data;
      }
      
      // Transform API data to match our expected format
      const result: DefectCountByModule[] = data || [];
      
      console.log('Transformed defect count by module:', result);
      return result;
      
    } catch (error: any) {
      console.error('Error fetching defect count by module:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        config: error.config,
        request: error.request,
        response: error.response
      });
      // Fallback to mock data if API fails
      console.log('Falling back to mock defect count by module data');
      return mockDefectCountByModule;
    }
  }
}

export default ApiService.getInstance();
