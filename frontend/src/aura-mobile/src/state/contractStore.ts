import { create } from 'zustand';
import { Contract, CreateContractData, UpdateContractData, ContractStats } from '../types/contract.types';
import { contractsApi } from '../services/api/contractsApi';

interface ContractState {
  contracts: Contract[];
  selectedContract: Contract | null;
  stats: ContractStats | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchContracts: () => Promise<void>;
  fetchContractById: (id: string) => Promise<void>;
  createContract: (data: CreateContractData) => Promise<void>;
  updateContract: (id: string, data: UpdateContractData) => Promise<void>;
  deleteContract: (id: string) => Promise<void>;
  calculateStats: () => void;
  clearError: () => void;
  setSelectedContract: (contract: Contract | null) => void;
}

export const useContractStore = create<ContractState>((set, get) => ({
  contracts: [],
  selectedContract: null,
  stats: null,
  isLoading: false,
  error: null,

  fetchContracts: async () => {
    set({ isLoading: true, error: null });

    try {
      const contracts = await contractsApi.getAll();
      set({ contracts, isLoading: false });

      // Automatically calculate stats after fetching
      get().calculateStats();
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Fehler beim Laden der Verträge',
        isLoading: false,
      });
    }
  },

  fetchContractById: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const contract = await contractsApi.getById(id);
      set({ selectedContract: contract, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Fehler beim Laden des Vertrags',
        isLoading: false,
      });
    }
  },

  createContract: async (data: CreateContractData) => {
    set({ isLoading: true, error: null });

    try {
      const newContract = await contractsApi.create(data);
      set((state) => ({
        contracts: [...state.contracts, newContract],
        isLoading: false,
      }));

      get().calculateStats();
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Fehler beim Erstellen des Vertrags',
        isLoading: false,
      });
      throw err;
    }
  },

  updateContract: async (id: string, data: UpdateContractData) => {
    set({ isLoading: true, error: null });

    try {
      const updatedContract = await contractsApi.update(id, data);
      set((state) => ({
        contracts: state.contracts.map((c) => (c.id === id ? updatedContract : c)),
        selectedContract: state.selectedContract?.id === id ? updatedContract : state.selectedContract,
        isLoading: false,
      }));

      get().calculateStats();
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Fehler beim Aktualisieren des Vertrags',
        isLoading: false,
      });
      throw err;
    }
  },

  deleteContract: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      await contractsApi.delete(id);
      set((state) => ({
        contracts: state.contracts.filter((c) => c.id !== id),
        selectedContract: state.selectedContract?.id === id ? null : state.selectedContract,
        isLoading: false,
      }));

      get().calculateStats();
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Fehler beim Löschen des Vertrags',
        isLoading: false,
      });
      throw err;
    }
  },

  calculateStats: () => {
    const { contracts } = get();
    const activeContracts = contracts.filter((c) => c.status === 'active');

    const totalMonthlyCost = activeContracts.reduce((sum, contract) => {
      const monthlyCost =
        contract.billingCycle === 'monthly' ? contract.costPerCycle :
        contract.billingCycle === 'yearly' ? contract.costPerCycle / 12 :
        contract.billingCycle === 'quarterly' ? contract.costPerCycle / 3 :
        contract.billingCycle === 'weekly' ? contract.costPerCycle * 4 :
        0;
      return sum + monthlyCost;
    }, 0);

    const stats: ContractStats = {
      totalContracts: contracts.length,
      activeContracts: activeContracts.length,
      totalMonthlyCost: Math.round(totalMonthlyCost * 100) / 100,
      totalYearlyCost: Math.round(totalMonthlyCost * 12 * 100) / 100,
    };

    set({ stats });
  },

  clearError: () => set({ error: null }),

  setSelectedContract: (contract: Contract | null) => set({ selectedContract: contract }),
}));
