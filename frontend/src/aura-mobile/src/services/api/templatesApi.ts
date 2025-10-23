import { apiClient } from './apiClient';
import { Template } from '../../types/template.types';

export const templatesApi = {
  /**
   * Get all active templates
   */
  getAll: async (): Promise<Template[]> => {
    const response = await apiClient.get<Template[]>('/templates');
    return response.data;
  },

  /**
   * Get template by ID
   */
  getById: async (id: string): Promise<Template> => {
    const response = await apiClient.get<Template>(`/templates/${id}`);
    return response.data;
  },

  /**
   * Get templates by category
   */
  getByCategory: async (category: string): Promise<Template[]> => {
    const response = await apiClient.get<Template[]>(`/templates/category/${category}`);
    return response.data;
  },
};
