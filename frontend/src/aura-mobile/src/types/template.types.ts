import { ContractType } from './contractType';

export interface Template {
  id: string;
  provider: string;
  category: string;
  contractType: ContractType;
  logoUrl?: string;
  defaultBillingCycle?: string;
  estimatedCost?: number;
  defaultNoticePeriodDays?: number;
  commonFields?: string;
  isActive: boolean;
}

export interface TemplateCategory {
  name: string;
  icon: string;
  templates: Template[];
}
