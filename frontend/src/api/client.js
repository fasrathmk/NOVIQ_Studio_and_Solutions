import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('noviq_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthRequest = error.config?.url?.includes('/auth/login');
      if (!isAuthRequest) {
        localStorage.removeItem('noviq_access_token');
        if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
          window.location.assign('/admin/login');
        }
      }
    }
    return Promise.reject(error);
  },
);

export function getApiErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  const data = error?.response?.data;
  if (!data) {
    return fallback;
  }
  if (Array.isArray(data.fieldErrors) && data.fieldErrors.length > 0) {
    return data.fieldErrors.map((item) => item.message).join(' ');
  }
  return data.message || fallback;
}

export default api;
