import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../theme';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

/**
 * Wiederverwendbare Status Badge Component
 * Für Status-Anzeigen, Kategorien, Tags, etc.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'neutral',
  style,
}) => {
  return (
    <View style={[styles.container, styles[variant], style]}>
      <Text style={[styles.label, styles[`${variant}Text`]]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },

  // Variants
  success: {
    backgroundColor: colors.success.light,
  },
  successText: {
    color: colors.success.dark,
  },

  warning: {
    backgroundColor: colors.warning.light,
  },
  warningText: {
    color: colors.warning.dark,
  },

  error: {
    backgroundColor: colors.error.light,
  },
  errorText: {
    color: colors.error.dark,
  },

  info: {
    backgroundColor: colors.info.light,
  },
  infoText: {
    color: colors.info.dark,
  },

  neutral: {
    backgroundColor: colors.gray[100],
  },
  neutralText: {
    color: colors.gray[700],
  },
});
