import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { secureStorage } from '../storage/secureStorage';
import { API_CONFIG } from '../../config/api.config';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add JWT token to all requests
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await secureStorage.getToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expired - attempt refresh or logout
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await secureStorage.getRefreshToken();

        if (refreshToken) {
          // TODO: Implement refresh token logic
          // const response = await axios.post(`${getApiUrl()}/auth/refresh`, { refreshToken });
          // await secureStorage.setToken(response.data.accessToken);
          // return apiClient(originalRequest);
        }

        // If no refresh token or refresh failed, clear auth and redirect to login
        await secureStorage.clearAll();
        // TODO: Navigate to login screen

      } catch (refreshError) {
        await secureStorage.clearAll();
        return Promise.reject(refreshError);
      }
    }

    // Network error
    if (!error.response) {
      return Promise.reject({
        message: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.',
        code: 'NETWORK_ERROR',
      });
    }

    // Server error
    if (error.response.status >= 500) {
      return Promise.reject({
        message: 'Serverfehler. Bitte versuchen Sie es später erneut.',
        code: 'SERVER_ERROR',
      });
    }

    return Promise.reject(error);
  }
);
