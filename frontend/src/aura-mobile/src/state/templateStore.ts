import { create } from 'zustand';
import { Template } from '../types/template.types';
import { templatesApi } from '../services/api/templatesApi';

interface TemplateState {
  templates: Template[];
  selectedTemplate: Template | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchTemplates: () => Promise<void>;
  selectTemplate: (template: Template | null) => void;
  clearError: () => void;
}

export const useTemplateStore = create<TemplateState>((set) => ({
  templates: [],
  selectedTemplate: null,
  loading: false,
  error: null,

  fetchTemplates: async () => {
    set({ loading: true, error: null });
    try {
      const templates = await templatesApi.getAll();
      set({ templates, loading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Fehler beim Laden der Vorlagen',
        loading: false,
      });
    }
  },

  selectTemplate: (template) => {
    set({ selectedTemplate: template });
  },

  clearError: () => {
    set({ error: null });
  },
}));
