import { ContractType } from './contractType';

export interface Contract {
  id: string;
  userId: string;
  provider: string;
  category: string;
  contractType: ContractType;
  costPerCycle: number;
  billingCycle: 'monthly' | 'yearly' | 'quarterly' | 'weekly';
  startDate: string;
  endDate?: string;
  cancellationNoticeDeadline?: string;
  nextRenewalDate?: string;
  status: 'active' | 'cancelled' | 'paused' | 'expired';
  notes?: string;
  customFields?: string;
  encryptedData?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContractData {
  provider: string;
  category: string;
  contractType?: ContractType;
  costPerCycle: number;
  billingCycle: 'monthly' | 'yearly' | 'quarterly' | 'weekly';
  startDate: string;
  endDate?: string;
  notes?: string;
  customFields?: string;
}

export interface UpdateContractData {
  provider?: string;
  category?: string;
  costPerCycle?: number;
  billingCycle?: 'monthly' | 'yearly' | 'quarterly' | 'weekly';
  startDate?: string;
  endDate?: string;
  status?: 'active' | 'cancelled' | 'paused' | 'expired';
  notes?: string;
  customFields?: string;
}

export interface ContractStats {
  totalContracts: number;
  activeContracts: number;
  totalMonthlyCost: number;
  totalYearlyCost: number;
}
