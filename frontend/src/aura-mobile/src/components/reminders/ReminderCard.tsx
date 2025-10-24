import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, CheckCircle, Circle, AlertCircle } from 'lucide-react-native';
import { Card } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';
import { Reminder } from '../../types/reminder.types';
import { colors, spacing, typography, borderRadius } from '../../theme';

interface ReminderCardProps {
  reminder: Reminder;
  onPress: () => void;
  onToggleComplete?: () => void;
}

/**
 * Refactored ReminderCard mit Theme System
 * - Verwendet Theme statt hardcoded colors
 * - Nutzt StatusBadge Component
 * - Cleaner Code Structure
 */
export const ReminderCard: React.FC<ReminderCardProps> = ({
  reminder,
  onPress,
  onToggleComplete,
}) => {
  // Helper Functions
  const getDaysUntilDue = (): number => {
    const dueDate = new Date(reminder.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getPriorityVariant = (): "success" | "warning" | "error" | "neutral" => {
    switch (reminder.priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'neutral';
    }
  };

  const getPriorityLabel = (): string => {
    switch (reminder.priority) {
      case 'high':
        return 'Hoch';
      case 'medium':
        return 'Mittel';
      case 'low':
        return 'Niedrig';
      default:
        return '';
    }
  };

  const getUrgencyInfo = () => {
    const daysUntil = getDaysUntilDue();

    if (reminder.isCompleted) {
      return { text: 'Erledigt', color: colors.text.tertiary, icon: 'completed' };
    }

    if (daysUntil < 0) {
      return { text: `${Math.abs(daysUntil)} Tage überfällig`, color: colors.deadline.overdue, icon: 'overdue' };
    } else if (daysUntil === 0) {
      return { text: 'Heute fällig', color: colors.deadline.thisWeek, icon: 'today' };
    } else if (daysUntil === 1) {
      return { text: 'Morgen fällig', color: colors.deadline.thisWeek, icon: 'soon' };
    } else if (daysUntil <= 7) {
      return { text: `In ${daysUntil} Tagen`, color: colors.deadline.thisMonth, icon: 'normal' };
    } else {
      return { text: `In ${daysUntil} Tagen`, color: colors.text.secondary, icon: 'normal' };
    }
  };

  const urgency = getUrgencyInfo();

  const getIconComponent = () => {
    if (reminder.isCompleted) {
      return <CheckCircle size={20} color={colors.success.main} />;
    }

    switch (urgency.icon) {
      case 'overdue':
        return <AlertCircle size={20} color={colors.error.main} />;
      case 'today':
      case 'soon':
        return <Bell size={20} color={colors.warning.main} />;
      default:
        return <Circle size={20} color={colors.text.tertiary} />;
    }
  };

  const cardStyle = reminder.isCompleted
    ? { ...styles.card, ...styles.completedCard }
    : styles.card;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card
        variant="elevated"
        style={cardStyle}
      >
        <View style={styles.content}>
          {/* Left: Icon */}
          {onToggleComplete && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={onToggleComplete}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {getIconComponent()}
            </TouchableOpacity>
          )}

          {/* Middle: Content */}
          <View style={styles.textContent}>
            <Text
              style={[
                styles.title,
                reminder.isCompleted && styles.completedText,
              ]}
            >
              {reminder.title}
            </Text>

            {reminder.description && (
              <Text
                style={[
                  styles.description,
                  reminder.isCompleted && styles.completedText,
                ]}
                numberOfLines={2}
              >
                {reminder.description}
              </Text>
            )}

            <View style={styles.meta}>
              <Text style={[styles.dueDate, { color: urgency.color }]}>
                {urgency.text} • {formatDate(reminder.dueDate)}
              </Text>
            </View>
          </View>

          {/* Right: Priority Badge */}
          <StatusBadge
            label={getPriorityLabel()}
            variant={getPriorityVariant()}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  completedCard: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: spacing.md,
    paddingTop: spacing.xs,
  },
  textContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.text.tertiary,
  },
});
