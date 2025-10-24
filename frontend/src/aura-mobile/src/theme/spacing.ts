/**
 * Aura App - Spacing System
 * 8pt Grid System für konsistente Abstände
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export type Spacing = typeof spacing;
