export interface Reminder {
  id: string;
  userId: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  completedAt?: string;
  isRecurring: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReminderData {
  title: string;
  description?: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  isRecurring?: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  category?: string;
}

export interface UpdateReminderData {
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  isCompleted?: boolean;
  isRecurring?: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  category?: string;
}

export const PRIORITY_LABELS: Record<Reminder['priority'], string> = {
  low: 'Niedrig',
  medium: 'Mittel',
  high: 'Hoch',
};

export const RECURRENCE_LABELS: Record<NonNullable<Reminder['recurrencePattern']>, string> = {
  daily: 'Täglich',
  weekly: 'Wöchentlich',
  monthly: 'Monatlich',
  yearly: 'Jährlich',
};
