import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, CheckCircle, Circle, AlertCircle } from 'lucide-react-native';
import { Card } from '../ui/Card';
import { Reminder } from '../../types/reminder.types';

interface ReminderCardProps {
  reminder: Reminder;
  onPress: () => void;
  onToggleComplete?: () => void;
}

export const ReminderCard: React.FC<ReminderCardProps> = ({
  reminder,
  onPress,
  onToggleComplete,
}) => {
  const getDaysUntilDue = (): number => {
    const dueDate = new Date(reminder.dueDate);
    const today = new Date();
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

  const getPriorityColor = (): string => {
    switch (reminder.priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
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

  const daysUntilDue = getDaysUntilDue();
  const priorityColor = getPriorityColor();
  const isOverdue = daysUntilDue < 0 && !reminder.isCompleted;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card
        style={[
          styles.card,
          reminder.isCompleted && styles.completedCard,
          isOverdue && styles.overdueCard,
        ]}
      >
        <View style={styles.content}>
          {/* Left: Checkbox */}
          <TouchableOpacity
            onPress={onToggleComplete}
            style={styles.checkboxContainer}
            activeOpacity={0.6}
          >
            {reminder.isCompleted ? (
              <CheckCircle color="#10B981" size={24} fill="#10B981" />
            ) : (
              <Circle color="#9CA3AF" size={24} />
            )}
          </TouchableOpacity>

          {/* Center: Content */}
          <View style={styles.mainContent}>
            <View style={styles.headerRow}>
              <Text
                style={[
                  styles.title,
                  reminder.isCompleted && styles.completedText,
                ]}
                numberOfLines={1}
              >
                {reminder.title}
              </Text>
              {isOverdue && (
                <AlertCircle color="#EF4444" size={18} style={styles.overdueIcon} />
              )}
            </View>

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

            <View style={styles.footer}>
              <View style={styles.footerLeft}>
                <View
                  style={[
                    styles.priorityBadge,
                    { backgroundColor: `${priorityColor}15` },
                  ]}
                >
                  <Text style={[styles.priorityText, { color: priorityColor }]}>
                    {getPriorityLabel()}
                  </Text>
                </View>

                {reminder.category && (
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{reminder.category}</Text>
                  </View>
                )}

                {reminder.isRecurring && (
                  <View style={styles.recurringBadge}>
                    <Text style={styles.recurringText}>Wiederkehrend</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Right: Date */}
          <View style={styles.dateContainer}>
            <Text
              style={[
                styles.date,
                isOverdue && styles.overdueDate,
                reminder.isCompleted && styles.completedText,
              ]}
            >
              {formatDate(reminder.dueDate)}
            </Text>
            {!reminder.isCompleted && (
              <Text
                style={[
                  styles.daysLeft,
                  isOverdue && styles.overdueDaysLeft,
                ]}
              >
                {isOverdue
                  ? `${Math.abs(daysUntilDue)} Tag${Math.abs(daysUntilDue) !== 1 ? 'e' : ''} überfällig`
                  : daysUntilDue === 0
                  ? 'Heute'
                  : daysUntilDue === 1
                  ? 'Morgen'
                  : `in ${daysUntilDue} Tagen`}
              </Text>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  completedCard: {
    opacity: 0.6,
  },
  overdueCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxContainer: {
    marginRight: 12,
    paddingTop: 2,
  },
  mainContent: {
    flex: 1,
    marginRight: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  overdueIcon: {
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
  },
  categoryText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  recurringBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#EEF2FF',
  },
  recurringText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '500',
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  overdueDate: {
    color: '#EF4444',
  },
  daysLeft: {
    fontSize: 12,
    color: '#6B7280',
  },
  overdueDaysLeft: {
    color: '#EF4444',
    fontWeight: '600',
  },
});
