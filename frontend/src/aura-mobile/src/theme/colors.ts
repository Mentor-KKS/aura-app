/**
 * Aura App - Color Palette
 * Zentrale Definition aller Farben für konsistentes Design
 */

export const colors = {
  // Primary Colors
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#4F46E5', // Main primary color
    600: '#4338CA',
    700: '#3730A3',
    800: '#312E81',
    900: '#1E1B4B',
  },

  // Gray Scale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Status Colors
  success: {
    light: '#D1FAE5',
    main: '#10B981',
    dark: '#065F46',
  },

  warning: {
    light: '#FEF3C7',
    main: '#F59E0B',
    dark: '#92400E',
  },

  error: {
    light: '#FEE2E2',
    main: '#EF4444',
    dark: '#991B1B',
  },

  info: {
    light: '#DBEAFE',
    main: '#3B82F6',
    dark: '#1E40AF',
  },

  // Semantic Colors (für Fristen-Status)
  deadline: {
    overdue: '#EF4444',     // Rot - Überfällig
    thisWeek: '#F59E0B',    // Orange - Diese Woche
    thisMonth: '#10B981',   // Grün - Diesen Monat
    later: '#6B7280',       // Grau - Später
    completed: '#9CA3AF',   // Hellgrau - Erledigt
  },

  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
  },

  // Text Colors
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
    disabled: '#D1D5DB',
  },

  // Border Colors
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
    focus: '#4F46E5',
    error: '#EF4444',
  },

  // Contract Type Colors
  contractType: {
    subscription: '#8B5CF6', // Lila
    contract: '#F59E0B',     // Orange
    membership: '#10B981',   // Grün
  },
} as const;

export type Colors = typeof colors;
