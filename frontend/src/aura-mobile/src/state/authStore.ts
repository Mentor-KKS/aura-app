import { create } from 'zustand';
import { User, LoginData, RegisterData, AuthError } from '../types/auth.types';
import { authApi } from '../services/api/authApi';
import { secureStorage } from '../services/storage/secureStorage';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;

  // Actions
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  loadStoredAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (data: LoginData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.login(data);

      // Store tokens securely
      await secureStorage.setToken(response.accessToken);
      await secureStorage.setRefreshToken(response.refreshToken);
      await secureStorage.setUser(response.user);

      set({
        user: response.user,
        token: response.accessToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err: any) {
      const error: AuthError = {
        message: err.response?.data?.message || 'Anmeldung fehlgeschlagen',
        code: err.response?.status?.toString(),
      };

      set({
        isLoading: false,
        error,
        isAuthenticated: false,
        user: null,
        token: null,
      });

      throw error;
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.register(data);

      // Store tokens securely
      await secureStorage.setToken(response.accessToken);
      await secureStorage.setRefreshToken(response.refreshToken);
      await secureStorage.setUser(response.user);

      set({
        user: response.user,
        token: response.accessToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err: any) {
      const error: AuthError = {
        message: err.response?.data?.message || 'Registrierung fehlgeschlagen',
        code: err.response?.status?.toString(),
      };

      set({
        isLoading: false,
        error,
        isAuthenticated: false,
        user: null,
        token: null,
      });

      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      await authApi.logout();
      await secureStorage.clearAll();

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (err: any) {
      // Clear local state even if API call fails
      await secureStorage.clearAll();

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  loadStoredAuth: async () => {
    set({ isLoading: true });

    try {
      const token = await secureStorage.getToken();
      const user = await secureStorage.getUser();

      if (token && user) {
        set({
          token,
          user: user as User,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (err) {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
