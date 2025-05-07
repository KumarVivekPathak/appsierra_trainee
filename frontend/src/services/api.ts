import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  signup: (data: { email: string; password: string; name: string; country: string }) =>
    api.post('/signup', data),
  login: (data: { email: string; password: string }) =>
    api.post('/login', data),
  getMe: () => api.get('/me'),
};

// Projects API
export const projectsApi = {
  getProjects: () => api.get('/projects'),
  getProject: (id: string) => api.get(`/projects/${id}`),
  createProject: (data: { name: string; description?: string }) =>
    api.post('/projects', data),
  updateProject: (id: string, data: { name: string; description?: string }) =>
    api.put(`/projects/${id}`, data),
  deleteProject: (id: string) => api.delete(`/projects/${id}`),
};

// Tasks API
export const tasksApi = {
  getTasks: (projectId?: string) =>
    api.get('/tasks', { params: { projectId } }),
  getTask: (id: string) => api.get(`/tasks/${id}`),
  createTask: (data: { title: string; description?: string; projectId?: string }) =>
    api.post('/tasks', data),
  updateTask: (id: string, data: { title?: string; description?: string; status?: string }) =>
    api.put(`/tasks/${id}`, data),
  deleteTask: (id: string) => api.delete(`/tasks/${id}`),
};

export default api;
