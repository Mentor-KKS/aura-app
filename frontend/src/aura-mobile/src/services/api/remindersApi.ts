import apiClient from './apiClient';
import { Reminder, CreateReminderData, UpdateReminderData } from '../../types/reminder.types';

export const remindersApi = {
  getAll: async (): Promise<Reminder[]> => {
    const response = await apiClient.get('/reminders');
    return response.data;
  },

  getById: async (id: string): Promise<Reminder> => {
    const response = await apiClient.get(`/reminders/${id}`);
    return response.data;
  },

  create: async (data: CreateReminderData): Promise<Reminder> => {
    const response = await apiClient.post('/reminders', data);
    return response.data;
  },

  update: async (id: string, data: UpdateReminderData): Promise<Reminder> => {
    const response = await apiClient.put(`/reminders/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/reminders/${id}`);
  },

  toggleComplete: async (id: string): Promise<void> => {
    await apiClient.post(`/reminders/${id}/toggle`);
  },
};
