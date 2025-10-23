import { create } from 'zustand';
import { Reminder, CreateReminderData, UpdateReminderData } from '../types/reminder.types';
import { remindersApi } from '../services/api/remindersApi';

interface ReminderState {
  reminders: Reminder[];
  isLoading: boolean;
  error: string | null;

  fetchReminders: () => Promise<void>;
  createReminder: (data: CreateReminderData) => Promise<Reminder>;
  updateReminder: (id: string, data: UpdateReminderData) => Promise<Reminder>;
  deleteReminder: (id: string) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
}

export const useReminderStore = create<ReminderState>((set, get) => ({
  reminders: [],
  isLoading: false,
  error: null,

  fetchReminders: async () => {
    set({ isLoading: true, error: null });
    try {
      const reminders = await remindersApi.getAll();
      set({ reminders, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Fehler beim Laden der Erinnerungen', isLoading: false });
      throw error;
    }
  },

  createReminder: async (data: CreateReminderData) => {
    set({ isLoading: true, error: null });
    try {
      const reminder = await remindersApi.create(data);
      set((state) => ({
        reminders: [... state.reminders, reminder],
        isLoading: false,
      }));
      return reminder;
    } catch (error: any) {
      set({ error: error.message || 'Fehler beim Erstellen der Erinnerung', isLoading: false });
      throw error;
    }
  },

  updateReminder: async (id: string, data: UpdateReminderData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedReminder = await remindersApi.update(id, data);
      set((state) => ({
        reminders: state.reminders.map((r) => (r.id === id ? updatedReminder : r)),
        isLoading: false,
      }));
      return updatedReminder;
    } catch (error: any) {
      set({ error: error.message || 'Fehler beim Aktualisieren der Erinnerung', isLoading: false });
      throw error;
    }
  },

  deleteReminder: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await remindersApi.delete(id);
      set((state) => ({
        reminders: state.reminders.filter((r) => r.id !== id),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message || 'Fehler beim Löschen der Erinnerung', isLoading: false });
      throw error;
    }
  },

  toggleComplete: async (id: string) => {
    try {
      await remindersApi.toggleComplete(id);
      set((state) => ({
        reminders: state.reminders.map((r) =>
          r.id === id
            ? {
                ...r,
                isCompleted: !r.isCompleted,
                completedAt: !r.isCompleted ? new Date().toISOString() : undefined,
              }
            : r
        ),
      }));
    } catch (error: any) {
      set({ error: error.message || 'Fehler beim Ändern des Status' });
      throw error;
    }
  },
}));
