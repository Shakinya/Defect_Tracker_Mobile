import axios from 'axios';

// COMMENTED OUT API BASE URL - Using mock data instead
// const API_BASE_URL = 'http://34.56.162.48:8087/api/v1';

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

// Mock data for defect type distribution
const mockDefectTypeDistribution: DefectType[] = [
  { defectType: 'Functionality', defectCount: 238, percentage: 52.8 },
  { defectType: 'UI', defectCount: 82, percentage: 18.2 },
  { defectType: 'Usability', defectCount: 30, percentage: 6.7 },
  { defectType: 'Validation', defectCount: 103, percentage: 22.3 },
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

// API service class
export class ApiService {
  private static instance: ApiService;
  // private axiosInstance;

  private constructor() {
    // COMMENTED OUT AXIOS INSTANCE - Using mock data instead
    /*
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for logging
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for logging
    this.axiosInstance.interceptors.response.use(
      (response) => {
        console.log('API Response:', response.status, response.config.url);
        console.log('Response data:', response.data);
        return response;
      },
      (error) => {
        console.error('API Response Error:', error.response?.status, error.response?.data);
        return Promise.reject(error);
      }
    );
    */
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Get all projects - using mock data
  async getProjects(): Promise<ApiProject[]> {
    try {
      // COMMENTED OUT ACTUAL API CALL - Using mock data instead
      /*
      const response = await this.axiosInstance.get('/projects');
      
      console.log('Raw API response:', response.data);
      
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

      // Transform API data to match our expected format
      const transformedProjects = projectsData.map((project: any, index: number) => ({
        id: project.id || project.projectId || index + 1,
        name: project.name || project.projectName || project.title || `Project ${index + 1}`,
        risk: project.risk || 'Medium',
      }));

      console.log('Transformed projects:', transformedProjects);
      return transformedProjects;
      */
      
      console.log('Using mock projects data');
      return mockProjects;
      
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch projects');
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

  // Get defect to remark ratio for a project - using mock data
  async getDefectRemarkRatio(projectId: number): Promise<DefectRemarkRatio> {
    try {
      // COMMENTED OUT ACTUAL API CALL - Using mock data instead
      /*
      const response = await this.axiosInstance.get(`/dashboard/defect-remark-ratio?projectId=${projectId}`);
      
      console.log('Defect Remark Ratio API response:', response.data);
      
      if (response.data && response.data.status === 'success' && response.data.data) {
        return response.data.data;
      } else {
        throw new Error('Invalid response format for defect remark ratio');
      }
      */
      
      console.log('Using mock defect remark ratio data for project:', projectId);
      return mockDefectRemarkRatio;
    } catch (error: any) {
      console.error('Error fetching defect remark ratio:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch defect remark ratio');
    }
  }

  // Get defect density for a project - using mock data
  async getDefectDensity(projectId: number): Promise<DefectDensity> {
    try {
      // COMMENTED OUT ACTUAL API CALL - Using mock data instead
      /*
      const url = `/dashboard/defect-density/${projectId}`;
      console.log('Calling defect density API with URL:', url);
      console.log('Full URL:', `${this.axiosInstance.defaults.baseURL}${url}`);
      
      const response = await this.axiosInstance.get(url);
      
      console.log('Defect Density API response:', response.data);
      console.log('Response status:', response.data?.status);
      console.log('Response data:', response.data?.data);
      console.log('HTTP status code:', response.status);
      
      if (response.data && response.data.status === 'success' && response.data.data) {
        const data = response.data.data;
        console.log('Raw defect density data:', data);
        console.log('Defects:', data.defects);
        console.log('KLOC:', data.kloc);
        console.log('Defect Density:', data.defectDensity);
        console.log('Color:', data.color);
        console.log('Meaning:', data.meaning);
        
        // Map the API response fields to our expected format
        const result = {
          defectCount: data.defects || 0,
          kloc: data.kloc || 0,
          density: data.defectDensity || 0,
          category: data.meaning || 'Medium',
          color: (data.color || 'Yellow').toLowerCase()
        };
        
        console.log('Processed defect density result:', result);
        return result;
      } else {
        console.log('Invalid response format - status:', response.data?.status);
        console.log('Response data structure:', response.data);
        throw new Error('Invalid response format for defect density');
      }
      */
      
      console.log('Using mock defect density data for project:', projectId);
      return mockDefectDensity;
    } catch (error: any) {
      console.error('Error fetching defect density:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch defect density');
    }
  }

  // Get defect severity index for a project - using mock data
  async getDefectSeverityIndex(projectId: number): Promise<DefectSeverityIndex> {
    try {
      // COMMENTED OUT ACTUAL API CALL - Using mock data instead
      /*
      const url = `/dashboard/dsi/${projectId}`;
      console.log('Calling defect severity index API with URL:', url);
      console.log('Full URL:', `${this.axiosInstance.defaults.baseURL}${url}`);
      
      const response = await this.axiosInstance.get(url);
      
      console.log('Defect Severity Index API response:', response.data);
      console.log('Response status:', response.data?.status);
      console.log('Response data:', response.data?.data);
      console.log('HTTP status code:', response.status);
      
      if (response.data && response.data.status === 'Success' && response.data.data) {
        const data = response.data.data;
        console.log('Raw defect severity index data:', data);
        console.log('Project ID:', data.projectId);
        console.log('Total Defects:', data.totalDefects);
        console.log('Actual Severity Score:', data.actualSeverityScore);
        console.log('Maximum Severity Score:', data.maximumSeverityScore);
        console.log('DSI Percentage:', data.dsiPercentage);
        console.log('Interpretation:', data.interpretation);
        
        // Map the API response fields to our expected format
        const result = {
          projectId: data.projectId || projectId,
          totalDefects: data.totalDefects || 0,
          actualSeverityScore: data.actualSeverityScore || 0,
          maximumSeverityScore: data.maximumSeverityScore || 0,
          dsiPercentage: data.dsiPercentage || 0,
          interpretation: data.interpretation || 'Medium risk'
        };
        
        console.log('Processed defect severity index result:', result);
        return result;
      } else {
        console.log('Invalid response format - status:', response.data?.status);
        console.log('Response data structure:', response.data);
        throw new Error('Invalid response format for defect severity index');
      }
      */
      
      console.log('Using mock defect severity index data for project:', projectId);
      return mockDefectSeverityIndex;
    } catch (error: any) {
      console.error('Error fetching defect severity index:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch defect severity index');
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
}

export default ApiService.getInstance();
