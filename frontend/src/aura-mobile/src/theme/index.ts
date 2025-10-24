/**
 * Aura App - Theme System
 * Zentraler Export aller Design Tokens
 */

import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { borderRadius } from './borderRadius';
import { shadows } from './shadows';

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;

// Individual exports
export { colors } from './colors';
export { spacing } from './spacing';
export { typography } from './typography';
export { borderRadius } from './borderRadius';
export { shadows } from './shadows';
