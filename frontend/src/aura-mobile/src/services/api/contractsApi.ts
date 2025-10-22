import { apiClient } from './apiClient';
import { Contract, CreateContractData, UpdateContractData } from '../../types/contract.types';

export const contractsApi = {
  async getAll(): Promise<Contract[]> {
    const response = await apiClient.get<Contract[]>('/contracts');
    return response.data;
  },

  async getById(id: string): Promise<Contract> {
    const response = await apiClient.get<Contract>(`/contracts/${id}`);
    return response.data;
  },

  async create(data: CreateContractData): Promise<Contract> {
    const response = await apiClient.post<Contract>('/contracts', data);
    return response.data;
  },

  async update(id: string, data: UpdateContractData): Promise<Contract> {
    const response = await apiClient.put<Contract>(`/contracts/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/contracts/${id}`);
  },
};
