import { create } from 'zustand';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

interface UIState {
  isLoading: boolean;
  toasts: ToastMessage[];

  // Actions
  setLoading: (loading: boolean) => void;
  showToast: (type: ToastMessage['type'], message: string, duration?: number) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  toasts: [],

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  showToast: (type, message, duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: ToastMessage = { id, type, message, duration };

    set((state) => ({
      toasts: [...state.toasts, toast],
    }));

    // Auto-remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearToasts: () => set({ toasts: [] }),
}));
