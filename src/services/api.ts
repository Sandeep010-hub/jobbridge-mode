import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jobbridge_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jobbridge_token');
      localStorage.removeItem('jobbridge_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

// GitHub API
export const githubAPI = {
  connectGitHub: (code: string) => api.post('/github/oauth/callback', { code }),
  syncProjects: () => api.post('/github/sync'),
  getRepos: () => api.get('/github/repos'),
};

// Projects API
export const projectsAPI = {
  getProjects: (params?: any) => api.get('/projects', { params }),
  getProject: (id: string) => api.get(`/projects/${id}`),
  getUserProjects: (userId: string) => api.get(`/projects/user/${userId}`),
  createProject: (projectData: any) => api.post('/projects', projectData),
  updateProject: (id: string, projectData: any) => api.put(`/projects/${id}`, projectData),
  deleteProject: (id: string) => api.delete(`/projects/${id}`),
  likeProject: (id: string) => api.post(`/projects/${id}/like`),
  addComment: (id: string, comment: string) => api.post(`/projects/${id}/comments`, { content: comment }),
};

// Users API
export const usersAPI = {
  getUser: (id: string) => api.get(`/users/${id}`),
  updateProfile: (userData: any) => api.put('/users/profile', userData),
  searchUsers: (params: any) => api.get('/users/search', { params }),
  followUser: (id: string) => api.post(`/users/${id}/follow`),
  unfollowUser: (id: string) => api.delete(`/users/${id}/follow`),
};

// AI API
export const aiAPI = {
  generateProjectSummary: (projectData: any) => api.post('/ai/project-summary', projectData),
  generateUserSummary: (userId: string) => api.post(`/ai/user-summary/${userId}`),
  suggestTags: (projectData: any) => api.post('/ai/suggest-tags', projectData),
};

export default api;